function middlewareApp(req, res, next) {
  console.log("Middleware de App");
  next();
}

function middlewareProducts(req, res, next) {
  console.log("Middleware de products");
  next();
}

function middlewareCarts(req, res, next) {
  console.log("Middleware de carts");
  next();
}

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).send("Error en el servidor");
}

module.exports = {
  middlewareApp,
  middlewareProducts,
  middlewareCarts,
  errorHandler,
};
