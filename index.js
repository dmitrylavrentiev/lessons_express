const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const aboutRoutes = require('./routes/about')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')

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



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server...');
}) 