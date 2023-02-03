const { productsModel } = require("../models/ecommerceModels");

function requiredParameter(parameterName) {
  throw new Error(`El Parametro ${parameterName} no fue ingresado`);
}

class ProductManager {
  constructor() {}

  async getProducts(limit) {
    try {
      let data;
      if (limit && !isNaN(limit)) {
        data = await productsModel.find({}).limit(limit);
      } else {
        data = await productsModel.find({});
      }

      return data;
    } catch (error) {
      throw new Error("No se pudo conectar al servidor");
    }
  }

  async addProduct(
    title = requiredParameter("title"),
    description = requiredParameter("description"),
    price = requiredParameter("price"),
    code = requiredParameter("code"),
    stock = requiredParameter("stock"),
    status = requiredParameter("status"),
    category = requiredParameter("category"),
    thumbnail = "Valor por defecto"
  ) {
    //Se crea el objeto productos
    const product = {
      title,
      description,
      price,
      code,
      stock,
      status,
      category,
      thumbnail,
    };

    //Se agrega el producto a la DB
    try {
      const newProduct = await productsModel.create(product);
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(pid) {
    try {
      const productFound = await productsModel.findOne({ _id: pid });
      return productFound;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(pid, dataToUpdate) {
    try {
      const productDeleted = await productsModel.updateOne(
        { _id: pid },
        dataToUpdate
      );
      return productDeleted;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(pid) {
    try {
      const productDeleted = await productsModel.deleteOne({ _id: pid });
      return productDeleted;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const productManager = new ProductManager();

module.exports = { productManager };
