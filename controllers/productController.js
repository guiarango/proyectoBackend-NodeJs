//Importar clase de productos
const { productManager } = require("../dao/classes/productManager");

const productController = {
  listProducts: async function (req, res) {
    //Se guarda el query string de limit,page,query y sort
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const query = req.query.categoria.toLowerCase() || req.query.stock;
    const sort = req.query.sort;

    //Se evaluan los valores que se pasaran por parametro para retornar los productos
    const lim = (limit && !isNaN(limit) && limit) || 10;
    const pag = (page && !isNaN(page) && page) || 1;
    const que = !query ? null : query;
    const sor =
      ((sort.toLowerCase() === "asc" || sort.toLowerCase() === "desc") &&
        sort) ||
      null;

    //Se consultan los productos
    const products = await productManager.getProducts(que, sor, lim, pag);

    return res.status(200).send({ result: "sucess", payload: products });
  },
  createProduct: async (req, res) => {
    const {
      title,
      description,
      price,
      code,
      stock,
      status,
      category,
      thumbnail,
    } = req.body;

    //Validar que los objetos no vengan vacios
    if (
      title &&
      description &&
      price &&
      code &&
      stock &&
      status !== null &&
      category
    ) {
      try {
        const result = await productManager.addProduct(
          title,
          description,
          price,
          code,
          stock,
          status,
          category,
          thumbnail
        );
        return res.status(200).send({ result: "sucess", payload: result });
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      return res.status(404).send("Información de producto vacía");
    }
  },

  findProductById: async function (req, res) {
    //Se guarda el param de pid
    const pid = req.params.pid;

    //Se valida que el resultado de product exista
    try {
      const product = await productManager.getProductById(pid);
      return res.status(200).send(product);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
  updateProductById: async function (req, res) {
    //Se guarda el param de pid
    const pid = req.params.pid;
    const data = req.body;

    try {
      const result = await productManager.updateProduct(pid, data);
      return res.status(200).send({ result: "sucess", payload: result });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  deleteProductById: async function (req, res) {
    //Se guarda el param de pid
    const pid = req.params.pid;

    try {
      const product = await productManager.deleteProduct(pid);
      return res.status(200).send(product);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
};

module.exports = productController;
