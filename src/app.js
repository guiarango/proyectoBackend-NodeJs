//Importar librería
const express = require("express");

//Import
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./config/passport.config");

//Variables de entorno
require("dotenv").config({ path: "./.env" });
const userMongo = process.env.USER_MONGO;
const passwordMongo = process.env.PASSWORD_MONGO;
const dbMongo = process.env.DB_MONGO;

//Instanciar servidor
const app = express();

//Importar motor de plantillas
const handlebars = require("express-handlebars");

//Importar productManager
const { productManager } = require("../dao/classes/productManager");

//Importar socket server
const { Server } = require("socket.io");

// Importar Endpoints
const homeRoutes = require("../routes/home");
const productRoutes = require("../routes/products");
const cartRoutes = require("../routes/carts");
const loginRoutes = require("../routes/login");
const signUpRoutes = require("../routes/signUp");
const realTimeProducts = require("../routes/realTimeProducts");
const realTimeChat = require("../routes/realTimeChat");

//configurar motor de plantillas
const templateDir = path.resolve(__dirname, "../views");
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", templateDir);

//Middlewares
const {
  middlewareApp,
  errorHandler,
} = require("../middlewares/customMiddleware");

//Crear session
app.use(
  session({
    secret: "Secreto",
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Importar controllers
const chatController = require("../controllers/chatController");

//Puerto en el cuál trabajar
const port = 8080;

//Static Path
const staticFilesPath = path.resolve(__dirname, "../public");

//--------------------MIDDLEWARES DE APP--------------------
app.use(middlewareApp);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(express.static(staticFilesPath));

//--------------------MIDDLEWARES DE TERCEROS--------------------

//--------------------LEVANTAR SERVIDOR--------------------
const httpServer = app.listen(port, function () {
  console.log(`app running on port ${port}`);
  console.log(templateDir);
});

//--------------------LEVANTAR SERVIDOR SOCKET--------------------
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("crearProducto", (data) => {
    const jsonProductos = Array(data);

    if (jsonProductos.length) {
      const resultado = jsonProductos.map((producto) => {
        //Se extraen los valores de cada objeto y luego se distribuyen dentro del metodo addproduct
        let valores = Object.values(producto);
        try {
          productManager.addProduct(...valores);
          socketServer.emit("productoCreado", data.title);
        } catch (error) {
          console.log(error.message);
          return;
        }
      });

      //Validar que no haya productos con novedades
      if (resultado.some((element) => element == undefined)) {
        console.log("Revisar productos con novedades");
      } else {
        console.log("Nuevo productos agregados");
      }
      return;
    }
    console.log("Información de producto vacía");
  });

  socket.on("crearMensaje", (data) => {
    try {
      chatController.saveMessage(data, socketServer, "mensajeCreado");
    } catch (error) {
      return error.message;
    }
  });
});

mongoose.connect(
  `mongodb+srv://${userMongo}:${passwordMongo}@ecommerce.ff5ghqj.mongodb.net/${dbMongo}?retryWrites=true&w=majority`,
  async (error) => {
    if (error) {
      console.log("Cannot connect to database: ", error);
      process.exit();
    } else {
      console.log("Connected to the database");
    }
  }
);
//--------------------ENDPOINTS--------------------
app.use("/", homeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/realTimeProducts", realTimeProducts);
app.use("/api/realTimeChat", realTimeChat);
app.use("/api/login", loginRoutes);
app.use("/api/signUp", signUpRoutes);
