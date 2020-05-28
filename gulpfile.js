/**
 * @author Didier Catz <info@didiercatz.com>
 */

const gulp = require('gulp')
const { watch, series, parallel } = gulp

const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const livereload = require('gulp-livereload')

const readdirp = require('readdirp')
const fs = require('fs')

const css = {
	input: './src/**/*.scss',
	output: './public/',
}
/** @param {Object} componentStyles - Array in which the matched `.scss` files will be stored */
const componentStyles = []

/** Gets all `.scss` component files in view/partials/components and outputs them to `_components.scss` */
async function getComponents() {
	/** Clear `_components.scss` */
	fs.writeFile('src/styles/base/_components.scss', '', (err) => {
		if (err) {
			throw err
		}
	})

	/** Append componenty styles to `_components.scss` */
	readdirp('src/views/partials/components', { fileFilter: '*.scss', alwaysStat: true })
		.on('data', ({ path }) => componentStyles.push(path))
		.on('warn', (error) => console.error('non-fatal error', error))
		.on('error', (error) => console.error('fatal error', error))
		.on('end', () => {
			componentStyles.sort().forEach((component) => {
				if (component.includes('.scss')) {
					const componentName = component.replace('.scss', '').replace('_', '')

					fs.appendFileSync(
						'src/styles/base/_components.scss',
						`@import '../../views/partials/components/${componentName}';\n`,
						(err) => {
							if (err) {
								throw err
							}
						}
					)
				}
			})
			// console.log('Appended all components to `_components.scss`')
		})
}

async function compileJS() {
	return gulp
		.src('src/client/*.js')
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(gulp.dest('public/js'))
		.pipe(livereload())
}

async function compileSCSS() {
	return gulp
		.src(css.input)
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest(css.output))
		.pipe(livereload())
}

async function compileCSS() {
	return gulp
		.src(css.output)
		.pipe(autoprefixer({ cascade: false }))
		.pipe(gulp.dest(css.output))
		.pipe(livereload())
}

async function live() {
	livereload.listen()
	return gulp.watch(css.input, parallel(compileSCSS, compileJS))
}

exports.default = series(getComponents, compileSCSS, parallel(compileCSS, compileJS))
exports.watch = live
