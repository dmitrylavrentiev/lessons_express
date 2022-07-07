const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        isActiveH: true
    })
})

module.exports = router