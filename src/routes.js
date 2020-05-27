module.exports = {
	'/': index(),
	'*': '404.hbs',
}

function index(req, res, next) {
	return 'index.hbs'
}
