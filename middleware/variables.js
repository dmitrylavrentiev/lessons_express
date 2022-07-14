module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated
    res.locals.currentUser = req.session.user
    res.locals.csurf = req.csrfToken()

    next()
}