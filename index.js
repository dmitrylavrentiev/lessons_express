const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoos = require('mongoose')

const homeRoutes = require('./routes/home')
const aboutRoutes = require('./routes/about')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views') // 'views' - folder name

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/about', aboutRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/cart', cartRoutes)

async function start() {
    try {
        const url = 'mongodb+srv://dlavrentiev:sqPNuNKhgbxSkjGF@cluster0.n1mrj.mongodb.net/shop'
        const a = await mongoos.connect(url, {useNewUrlParser: true})
        //console.log(a);
    } catch (e) {
        console.log(e);
    }
    
}

start()




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server...');
}) 