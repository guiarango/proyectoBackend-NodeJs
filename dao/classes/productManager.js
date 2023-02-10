const { productsModel } = require("../models/ecommerceModels");

function requiredParameter(parameterName) {
  throw new Error(`El Parametro ${parameterName} no fue ingresado`);
}

// function validateSort(sort) {
//   if (sort === "asc") {
//     return { $sort: { price: 1 } };
//   }

//   if (sort === "desc") {
//     return { $sort: { price: -1 } };
//   }

//   return null;
// }

// function validateQuery(query) {
//   if (query === null) {
//     return {};
//   }

//   if (query === "false") {
//     return {
//       $match: {
//         stock: 0,
//       },
//     };
//   }

//   if (query === "true") {
//     return {
//       $match: {
//         stock: { $gte: 1, $to },
//       },
//     };
//   }

//   return {
//     $match: {
//       category: query,
//     },
//   };
// }

function validateSort(sort) {
  if (sort === "asc") {
    return { sort: { date: 1 } };
  }
  if (sort === "desc") {
    return { sort: { date: -1 } };
  }
  return null;
}

function validateQuery(query) {
  if (query === null) {
    return {};
  }

  if (query === "false") {
    return {
      stock: 0,
    };
  }

  if (query === "true") {
    return {
      stock: { $gte: 1 },
    };
  }

  return {
    category: query,
  };
}

class ProductManager {
  constructor() {}

  async getProducts(query, sort, limit, page) {
    try {
      let data;
      const sortObject = validateSort(sort);
      const queryParam = validateQuery(query);

      if (sortObject == null) {
        data = await productsModel.paginate(
          { ...queryParam },
          { page: page, limit: limit }
        );
      } else {
        data = await productsModel.paginate(
          { ...queryParam },
          { page: page, limit: limit, ...validateSort(sort) }
        );
      }

      // let data;
      // const regularPipe = [{ $limit: limit }];
      // const sortObject = validateSort(sort);

      // if (sortObject == null) {
      //   data = await productsModel.aggregate([
      //     validateQuery(query),
      //     ...regularPipe,
      //   ]);
      // } else {
      //   data = await productsModel.aggregate([
      //     validateQuery(query),
      //     ...regularPipe,
      //     sortObject,
      //   ]);
      // }

      data;

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
      title: title.toLowerCase(),
      description: description.toLowerCase(),
      price,
      code,
      stock,
      status,
      category: category.toLowerCase(),
      thumbnail: thumbnail.toLowerCase(),
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
