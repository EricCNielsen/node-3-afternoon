const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv').config()
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require ('./controllers/swag_controller')
const authCtrl = require(`./controllers/auth_controller`)
const cartCtrl = require(`./controllers/cart_controller`)
const searchCtrl = require(`./controllers/search_controller`)

const { SERVER_PORT, SESSION_SECRET} = process.env

const app = express()
app.use(bodyParser.json())
app.use( session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.get(`/api/swag`, swagCtrl.read)

app.post(`/api/login`, authCtrl.login)
app.post(`/api/register`, authCtrl.register)
app.post(`/api/signout`, authCtrl.signout)
app.get(`/api/user`, authCtrl.getUser)

app.post(`/api/cart`, cartCtrl.add)
app.post(`/api/cart/checkout`, cartCtrl.checkout)
app.delete(`/api/cart`, cartCtrl.delete)

app.get(`/api/search`, searchCtrl.search)

const PORT = SERVER_PORT || 3003
app.listen(PORT, () => {console.log(`I'm looking at you... from port ${PORT}`)})