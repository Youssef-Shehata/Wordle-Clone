const express = require('express')
const cors = require('cors')
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
// const connectDB = require('../db/connect')
const wordsRouter = require('./addWord')



const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use('/words', wordsRouter);











const start = () => {
    try {
        app.listen(8080)
        console.log("server listening on port 8080")
    } catch (error) {
        console.log(error)
    }
}

start()