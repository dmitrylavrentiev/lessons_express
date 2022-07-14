const {Router} = require('express')

const Cart = require('../models/cart')
const Course = require('../models/course')
const auth = require('../middleware/auth')

const router = Router()

router.get('/', auth, async (req, res) => {
    const cart = await Cart.find().lean()
    res.render('cart', {
        title: 'Cart',
        isActiveCart: true,
        cart
    })
})

router.get('/:id', auth, async (req, res) => {
    const course = await Course.findById(req.params.id)
    if(course) {
        const cart = new Cart({id: course._id.toString()})
        await  cart.save()
        res.json(cart)
    }
    
})

module.exports = router