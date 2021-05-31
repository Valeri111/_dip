const {Router} = require('express')
const {validationResult} = require('express-validator')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const {courseValidators} = require('../utils/validators')
const router = Router()

function isOwner(course, req) {
  return course.userId.toString() === req.user._id.toString()
}

router.get('/', async (req, res) => {
  const courses = await Course.find()
  .populate('userId', 'email name')
  .select('price title img titlehref')
 
  res.render('courses.hbs', {
    title: 'Курсы',
    isCourses: true,
    user: req.user.toObject(),
    userId: req.user ? req.user._id.toString() : null,
    courses
  })
})

router.get('/:id/edit', auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
  try {
    const course = await Course.findById(req.params.id)
    if (!isOwner(course, req)) {
      return res.redirect('/courses')
    }
    res.render('course-edit.hbs', {
      title: `Редактировать ${course.title}`,
      course,
      user: req.user.toObject()
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/edit',courseValidators, auth, async (req, res) => {
  const errors = validationResult(req)
  const {id} = req.body

  if (!errors.isEmpty()) {
    return res.status(422).redirect(`/courses/${id}/edit?allow=true`)
  }

  try {
    delete req.body.id
    const course = await Course.findById(id)
    if (!isOwner(course, req)) {
      return res.redirect('/courses')
    }
    Object.assign(course, req.body)
    await course.save()
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    await Course.deleteOne({
      _id: req.body.id,
      user: req.user.toObject()
    })
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)
  res.render('course.hbs', {
    layout: 'empty',
    title: `Курс ${course.title}`,
    course,
    user: req.user.toObject()
  })
})

module.exports = router