const {Router} = require('express')

const Course = require('../models/course')

const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add',
        isActiveAdd: true
    })
})

router.post('/', async (req, res) => {
    const {course_name, author} = req.body

    const course = new Course({
        title: course_name, 
        author
    })
    try {
        await course.save()
        res.render('added', {
            title: 'Course added',
            course_name,
            author
        })

    } catch (e) {
        console.log(e);
    }
    
    
})

module.exports = router