const mongoose = require("mongoose");

const cartCollection = "carts";
const messageCollection = "messages";
const productCollection = "products";

const cartSchema = new mongoose.Schema({
  products: Array,
});

const messageSchema = new mongoose.Schema({
  user: String,
  email: { type: String, unique: true },
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  code: Number,
  stock: Number,
  status: Boolean,
  category: String,
  thumbnail: String,
});

const cartModel = mongoose.model(cartCollection, cartSchema);
const messagesModel = mongoose.model(messageCollection, messageSchema);
const productsModel = mongoose.model(productCollection, productSchema);

module.exports = { cartModel, messagesModel, productsModel };