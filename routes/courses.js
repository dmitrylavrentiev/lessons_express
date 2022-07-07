const {Router} = require('express')

const Courses = require('../models/course')

const router = Router()

router.get('/', async (req, res) => {
    const courses = await Courses.getAll()

    res.render('courses', {
        title: 'Courses',
        isActiveC: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const courseId = req.params.id
    const course = await Courses.getCourse(courseId)
    
    res.render('course', {
        course,
        title: course?.title
    })
})

router.get('/:id/edit', async (req, res) => {
    const courseId = req.params.id
    const course = await Courses.getCourse(courseId)
    
    res.render('course-edit', {
        course,
        title: course?.title
    })
})

router.post('/edit', async (req, res) => {
    console.log(req.body);
    const {course_name, author, id} = req.body

    await Courses.update(course_name, author, id)
    res.redirect('/courses')
})

router.get('/:id/remove', async (req, res) => {
    const courseId = req.params.id

    try {
        await Courses.removeCourse(courseId)
        res.redirect('/courses')
    } catch (error) {
        res.render('error', {
        courseId,
        title: 'Error'
    })
    }
    
    
    
})

module.exports = router