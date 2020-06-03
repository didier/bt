const index = (req, res) => {
	res.status(200).render('index.hbs', {
		title: 'Miit — Modern Dating',
	})
}

module.exports = index
