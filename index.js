// Packages
const express = require('express')
const app = express()

// Use node's process port or fall back to port 3000
const port = process.env.PORT || 3000

// Use static as middleware
app.use(express.static('public'))

// Route static pages
const routes = {
  '/': 'index',
  '/about': 'about',
  '/contact': 'contact',
  '*': '404'
}

for (let [route, source] of Object.entries(routes)) {
  app.get(route, (req, res) => {
    res.sendFile(`${__dirname}/public/${source}.html`)
  })
}

// Application running on port...
app.listen(port, () => console.log(`App is running on http://localhost:${port}`))