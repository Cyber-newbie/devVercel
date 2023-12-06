const express = require('express');
const passport = require('passport')
const env = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')
const router = require('./routes/api/users')
const profileRouter = require('./routes/api/profile')
const postRouter = require('./routes/api/posts')

const cors = require('cors');


//load dotenv variables
env.config({
    path: './config/.env'
})
//connect database
connectDB()

const app = express();
app.use(cors());
app.use(passport.initialize())
require('./middleware/passport')(passport)

//body parser
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

//use routes
app.use('/api/users', router)
app.use('/api/profile', profileRouter)
app.use('/api/posts', postRouter)
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});


if (process.env.NODE_ENV === 'production') {
    //set static file
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server running on ${port}`);
})