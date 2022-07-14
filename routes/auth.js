const Router = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

const router = Router()

router.get('/login', (req, res) => {
    res.render('auth/login', {
        isActiveAuth: true,
        title: "Authorisation",
        error: req.flash('err')
    })
})

router.post('/login', async (req, res) => {

    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        if(user && await bcrypt.compare(password, user.password)) {
            req.session.user = user
            req.session.isAuthenticated = true
            req.session.save( err => {
                if(err) throw new Error(err)
                res.redirect('/courses')
            })
           
        } else {
            req.flash('err', 'Wrong email or password')
            res.redirect('/auth/login')
        }
    } catch(e) {
        console.log(e);
    }
})

router.post('/registration', async (req, res) => {

    const {name, email, password} = req.body

    const existingUser = await User.findOne({email})
    if(existingUser) {
        req.flash('err', 'User is exist')
        res.redirect('/auth/login#registration')
    } else {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({name, email, password: hashPassword})
        user.save( err => {
            if(err) throw new Error(err)
            console.log(user);
            req.session.user = user
            req.session.isAuthenticated = true
            req.session.save( err => {
                if(err) throw new Error(err)
                res.redirect('/courses')
            })
        }) 
    }
    
    
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
})

module.exports = router