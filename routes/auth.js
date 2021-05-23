const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const User = require('../models/user')
const {registerValidators} = require('../utils/validators')
const router = Router()
const mailer = require('../nodemalier')

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError')
  })
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password)

      if (areSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        req.session.save(err => {
          if (err) {
            throw err
          }
          res.redirect('/')
        })
      } else {
        req.flash('loginError', 'Неверный пароль')
        res.redirect('/auth/login#login')
      }
    } else {
      req.flash('loginError', 'Такого пользователя не существует')
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/register', registerValidators, async (req, res) => {
  try {
    const {email, password, name} = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.flash('registerError', errors.array()[0].msg)
      return res.status(422).redirect('/auth/login#register')
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
      email, name, isAdmin: 'false',
      password: hashPassword, cart: {items: []}
    })
    const message = {        
      to: req.body.email,
      subject: 'Congratulations! You are successfully registred on our site',
      html: `
        <h2>Поздравляем, Вы успешно зарегистрировались на нашем сайте!</h2>
        
        <i>данные вашей учетной записи:</i>
        <ul>
            <li>login: ${req.body.email}</li>
            <li>password: ${req.body.password}</li>
        </ul>
        ${req.body.promo ? `Вы подписаны на рассылку наших предложений,
        чтобы отписаться от рассылки перейдите по ссылке
        <a href="http://localhost:3001/unsubscribe/${req.body.email}">отписаться от рассылки</a>` : ''}
        <p>Данное письмо не требует ответа.<p>`
  }
  mailer(message) 
    await user.save()
    res.redirect('/auth/login#login')
  } catch (e) {
    console.log(e)
  }
})

router.get('/unsubscribe/:email', (req, res) => {
  res.send(`Ваш email: ${req.params.email} удален из списка рассылки!`)
})

module.exports = router