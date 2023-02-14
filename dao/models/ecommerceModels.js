const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const cartCollection = "carts";
const messageCollection = "messages";
const productCollection = "products";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        quantity: Number,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      },
    ],
    default: [],
  },
});

const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  code: { type: Number, unique: true },
  stock: Number,
  status: Boolean,
  category: String,
  thumbnail: String,
});

// cartSchema.pre("find", function () {
//   this.populate("products");
// });

productSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model(cartCollection, cartSchema);
const messagesModel = mongoose.model(messageCollection, messageSchema);
const productsModel = mongoose.model(productCollection, productSchema);

module.exports = { cartModel, messagesModel, productsModel };
