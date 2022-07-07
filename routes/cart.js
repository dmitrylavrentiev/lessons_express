const {Router} = require('express')

const Cart = require('../models/cart')

const router = Router()

router.get('/', async (req, res) => {
    const cart = await Cart.getAll()
    res.render('cart', {
        title: 'Cart',
        isActiveCart: true,
        cart
    })
})

router.get('/:id', async (req, res) => {
    const courseId = req.params.id
    await Cart.addToCart(courseId)
    const cart = await Cart.getAll()
    res.json(cart)
})

module.exports = router