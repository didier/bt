// Packages
const express = require('express')
const app = express()

// Use node's process port or fall back to port 3000
const port = process.env.PORT || 3000

// Use static as middleware
app.use(express.static('public'))

// Route static pages
const routes = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact': 'contact.html',
  '/sound': 'assets/sound.mp3',
  '/image': 'assets/image.png',
  '*': '404.html'
}

// Loop over and destructure the routes object, keepin' it DRY
for (let [route, source] of Object.entries(routes)) {
  app.get(route, (req, res) => {
    res.sendFile(`${__dirname}/public/${source}`)
  })
}

// Application running on port...
app.listen(port, () => console.log(`App is running on http://localhost:${port}`))