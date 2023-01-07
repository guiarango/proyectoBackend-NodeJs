//Importar librería
const express = require("express");

//Instanciar servidor
const app = express();

// Importar Endpoints
const homeRoutes = require("../routes/home");
const productRoutes = require("../routes/products");
const cartRoutes = require("../routes/carts");

//Middlewares
const { middlewareApp } = require("../middlewares/customMiddleware");

//Puerto en el cuál trabajar
const port = 8080;

//--------------------MIDDLEWARES--------------------
app.use(middlewareApp);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--------------------ENDPOINTS--------------------
app.use("/", homeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

//--------------------LEVANTAR SERVIDOR--------------------
app.listen(port, function () {
  console.log(`app running on port ${port}`);
});
