const {Router} = require('express')

const Courses = require('../models/course')

const router = Router()

router.get('/', async (req, res) => {
    const courses = await Courses.find().lean()
console.log(courses);
    res.render('courses', {
        title: 'Courses',
        isActiveC: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const courseId = req.params.id
    const course = await Courses.findById(courseId).lean()
    
    res.render('course', { 
        course,
        title: course?.title
    })
})

router.get('/:id/edit', async (req, res) => {
    const courseId = req.params.id
    const course = await Courses.findById(courseId).lean()
    
    res.render('course-edit', {
        course,
        title: course?.title
    })
})

router.post('/edit', async (req, res) => {

    const {course_name, author, id} = req.body

    await Courses.findByIdAndUpdate(id, {title: course_name, author}).lean()
    res.redirect('/courses')
})

router.get('/:id/remove', async (req, res) => {
    const courseId = req.params.id

    try {
        await Courses.findOneAndDelete(courseId).lean()
        res.redirect('/courses')
    } catch (error) {
        res.render('error', {
        courseId,
        title: 'Error'
    })
    }
    
    
    
})

module.exports = router