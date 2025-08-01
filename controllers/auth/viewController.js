exports.signUp = (req, res) => {
  res.render('auth/SignUp')
}

exports.signIn = (req, res) => {
  res.render('auth/SignIn')
}

exports.redirectToLogin = (req, res) => {
  res.redirect('/authors/login')
}
