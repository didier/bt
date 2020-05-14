/**
 * NOTE: I intend on using JSDoc to document my code and reference it later.
 * @author Didier Catz <info@didiercatz.com>
 */

// Packages
const express = require('express')
const app = express()

/**
 * Defines the port on which the server is hosted. 
 * Default is `process.env.PORT`. Otherwise, it falls back to port 3000.
 * @constant
 */
const port = process.env.PORT || 3000

// Statically serve files in the `public` folder.
app.use(express.static('public'))
app.set('view engine', 'ejs');

/** Defines the routes that will be served up by the server. */
const routes = {
  '/': 'index.ejs',
  '/about': 'about.ejs',
  '/contact': 'contact.ejs',
  '*': '404.ejs',
}

// Loop over and destructure the routes object, keepin' it DRY
for (let [route, source] of Object.entries(routes)) {
  app.get(route, (req, res) => {
    res.render(source)
  })
}

// Application running on port...
app.listen(port, () => console.log(`App is running on http://localhost:${port}`))