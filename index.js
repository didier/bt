// Packages
const express = require('express')
const app = express()

// Use node's process port or fall back to port 3000
const port = process.env.PORT || 3000

// Use static as middleware
app.use(express.static('public'))

// Route static pages
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

app.get('/about', (req, res) => {
  res.sendFile(`${__dirname}/public/about.html`)
})

app.get('/contact', (req, res) => {
  res.sendFile(`${__dirname}/public/contact.html`)
})

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/404.html`)
})

// Application running on port...
app.listen(port, () => console.log(`App is running on http://localhost:${port}`))