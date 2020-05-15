/**
 * NOTE: I intend on using JSDoc to document my code and reference it later.
 * @author Didier Catz <info@didiercatz.com>
 */

// Packages
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
// const // livereload = require("livereload")
// const // connectLivereload = require("connect-livereload")
// const compileSass = require('express-compile-sass')
// const Bundler = require('parcel-bundler')

/**
 * Defines the port on which the server is hosted.
 * Default is `process.env.PORT`. Otherwise, it falls back to port 3000.
 * @constant
 */
const port = process.env.PORT || 3000;

/** The files that will be watched by Parcel */
// const files = ['src/styles/**/*']

/** The options for Parcel */
// const options = {
// hmr: true,
// outDir: 'public'
// }

// const parcel = new Bundler(files, options)

app
  // Register `hbs.engine` with the Express app.
  .use(express.static('public'))
  .engine('hbs', hbs({ extname: 'hbs' }))
  .set('view engine', 'hbs')
  .set('views', 'src/views')
// .use(parcel.middleware())


/** Defines the routes that will be served up by the server. */
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
