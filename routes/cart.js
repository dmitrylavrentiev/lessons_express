const {Router} = require('express')

const Cart = require('../models/cart')

const router = Router()

router.get('/', async (req, res) => {
    const cart = await Cart.find().lean()
    res.render('cart', {
        title: 'Cart',
        isActiveCart: true,
        cart
    })
})

router.get('/:id', async (req, res) => {
    const cart = new Cart({id: req.params.id})
    await  cart.save()
    const carts = await Cart.find().lean()
    res.json(cart)
})

module.exports = router