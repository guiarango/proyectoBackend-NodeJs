function userIsLoggedInMiddleware(req, res, next) {
  const userIsLogged = req.session.userLoggedIn;
  if (userIsLogged) {
    return res.redirect("/api/products");
  }
  next();
}

module.exports = userIsLoggedInMiddleware;
