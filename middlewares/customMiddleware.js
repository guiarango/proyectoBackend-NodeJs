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

module.exports = {
  middlewareApp,
  middlewareProducts,
  middlewareCarts,
};
