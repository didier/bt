/**
 * NOTE: I intend on using JSDoc to document my code and reference it later.
 * @author Didier Catz <info@didiercatz.com>
 * @description Serves compiled template files to localhost.
 */

// Packages
const express = require('express')
const app = express()
const hbs = require('express-handlebars')

/**
 * Defines the port on which the server is hosted.
 * Default is `process.env.PORT`. Otherwise, it falls back to port 3000.
 * @constant
 */
const port = process.env.PORT || 3000;

app
  // Serve static files in `/public`
  .use(express.static('public'))

  // Register `hbs.engine` with the Express app.
  .engine('hbs', hbs({ extname: 'hbs' }))

  // Set the Express view engine to handlebars
  .set('view engine', 'hbs')

  // Set the Views directory to `src/views`
  .set('views', 'src/views')

/** Defines the routes that will be served up by the server.*/
const routes = {
  '/': 'index.hbs',
  '*': '404.hbs',
};

// Loop over and destructure the routes object, keepin' it DRY
for (let [route, source] of Object.entries(routes)) {
  app.get(route, (req, res) => {
    res.render(`${source}`)
  })
}

// Application running on port...
app.listen(port, () => {
  console.log(`App is running in ${process.env.NODE_ENV} mode on http://localhost:${port}`)
  process.send && process.send('online')
})
