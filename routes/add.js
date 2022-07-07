const {Router} = require('express')

const Course = require('../models/course')

const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add',
        isActiveAdd: true
    })
})

router.post('/', (req, res) => {
    const {course_name, author} = req.body

    const course = new Course(course_name, author)
    course.save()
    res.render('added', {
        title: 'Course added',
        course_name,
        author
    })
})

module.exports = router