module.exports = {
	'/': 'index.hbs',
	'*': '404.hbs',
}

function index(req, res, next) {
	return 'index.hbs'
}
