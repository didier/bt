const index = (req, res) => {
	req.session === {}
	res.status(200).render('index.hbs')
}

module.exports = index
