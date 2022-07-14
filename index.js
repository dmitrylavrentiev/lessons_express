const express = require('express')
const exphbs = require('express-handlebars')
const csurf = require('csurf')
const flash = require('connect-flash')
const mongoos = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const homeRoutes = require('./routes/home')
const aboutRoutes = require('./routes/about')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')
const authRouters = require('./routes/auth')

const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

const MONGO_URL = 'mongodb+srv://dlavrentiev:sqPNuNKhgbxSkjGF@cluster0.n1mrj.mongodb.net/shop'

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGO_URL
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views') // 'views' - folder name

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'Hello',
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(csurf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/about', aboutRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/cart', cartRoutes)
app.use('/auth', authRouters)
 
async function start() {
    try {
        const url = MONGO_URL
        const a = await mongoos.connect(url, {useNewUrlParser: true})
        //console.log(a);
    } catch (e) {
        console.log(e);
    }
    
}

start()




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server... port = ', PORT);
}) 