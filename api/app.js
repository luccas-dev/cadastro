require('dotenv').config()
const express = require('express')
const path = require('path')
const registerRoute = require('../src/routes/registerRoute')

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use(express.json())
app.use('/api/register', registerRoute)

app.listen(port, () => {
    console.log('Server is Running')
})