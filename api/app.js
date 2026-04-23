require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const registerRoute = require('../src/routes/registerRoute')


app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.use(express.json())
app.use('/api/register', registerRoute)

app.listen(process.env.PORT, () => {
    console.log('Server is Running')
})