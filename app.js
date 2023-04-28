const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require("morgan")
// const fs = require('fs')

const user = require('./routes/user')
const blog = require('./routes/blog')

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

// To store Logs
// let accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' })
// app.use(morgan("combined", { stream: accessLogStream }))

const connect = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log(err))
}

// middlewares
app.use(express.json())
app.use(cors())

app.use(morgan("combined"))

app.get('/', (req, res) => {
    res.status(200).send("Welcome to My blog Application")
})

app.use('/user', user)
app.use('/blog', blog)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
    connect()
})
