const {Router} = require('express')
const {validationResult} = require('express-validator')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const {courseValidators} = require('../utils/validators')
const router = Router()

router.get('/', auth, (req, res) => {
  res.render('add.hbs', {
    title: 'Добавить курс',
    isAdd: true,
    user: req.user.toObject()
  })
})
router.post('/', auth, courseValidators, async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('add.hbs', {
      title: 'Добавить курс',
      isAdd: true,
      user: req.user.toObject(),
      error: errors.array()[0].msg,
      data: {
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        titlehref: req.body.title
      }
    })
  }
  
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user,
    titlehref: req.body.title
  })

  try {
  await course.save()
  res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
  
})

module.exports = router