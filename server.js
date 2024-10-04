const express = require('express')
const path = require('path')

const app = express()

app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use('/templates', express.static(path.resolve(__dirname, 'templates')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'templates', 'index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'templates', 'login.html'))
})

const port = 3000
app.listen(port, () => console.log(`http://localhost:${port}, Server running...`))