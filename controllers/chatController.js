const { chatManager } = require("../dao/classes/chat");

const chatController = {
  saveMessage: async (data, socket, message) => {
    const result = await chatManager.createMessage(data);
    socket.emit(message, data);
    return result;
  },

  retrieveMessagesFromDB: async (req, res) => {
    const allMessages = await chatManager.getMessages();
    const messages = allMessages.map(
      (message) => `${message.user}: ${message.message}`
    );

    return res.render("realTimeChat", { messages });
  },
};

module.exports = chatController;
