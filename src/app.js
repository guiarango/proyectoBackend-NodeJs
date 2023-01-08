//Importar librería
const express = require("express");

//Instanciar servidor
const app = express();

// Importar Endpoints
const homeRoutes = require("../routes/home");
const productRoutes = require("../routes/products");
const cartRoutes = require("../routes/carts");

//Middlewares
const {
  middlewareApp,
  errorHandler,
} = require("../middlewares/customMiddleware");

//Puerto en el cuál trabajar
const port = 8080;

//Static Path
const staticFilesPath = __dirname + "public";

//--------------------MIDDLEWARES DE APP--------------------
app.use(middlewareApp);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use("static", express.static(staticFilesPath));

//--------------------MIDDLEWARES DE TERCEROS--------------------

//--------------------ENDPOINTS--------------------
app.use("/", homeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

//--------------------LEVANTAR SERVIDOR--------------------
app.listen(port, function () {
  console.log(`app running on port ${port}`);
});
