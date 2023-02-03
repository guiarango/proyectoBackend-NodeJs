const { messagesModel } = require("../models/ecommerceModels");
class chat {
  constructor() {}
  async getMessages() {
    try {
      const data = await messagesModel.find({}, { _id: 0 });
      return data;
    } catch (error) {
      throw new Error("No se pudo conectar al servidor");
    }
  }

  async createMessage(data) {
    try {
      const result = await messagesModel.create(data);
      return result;
    } catch (error) {
      throw new Error("No se pudo conectar al servidor");
    }
  }
}

const chatManager = new chat();

module.exports = { chatManager };
