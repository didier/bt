const logout = (req, res) => {
	req.session.destroy()
	res.redirect('/login')
}

module.exports = { logout }
