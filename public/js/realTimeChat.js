const socket = io();

// Form elements
const userName = document.querySelector("#userName");
const userMessage = document.querySelector("#userMessage");
const submitButton = document.querySelector("#submitForm");

//ul
const ul = document.querySelector("ul");

socket.on("mensajeCreado", async (data) => {
  const { user, message } = data;
  //Se crea el elemento li
  const liItem = document.createElement("li");
  liItem.innerText = `${user}: ${message}`;

  //Se pega a la lista
  ul.insertAdjacentElement("beforeend", liItem);
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const user = userName.value;
  const message = userMessage.value;
  const data = {
    user,
    message,
  };

  if (user !== null && user !== "" && message !== null && message !== "") {
    socket.emit("crearMensaje", data);
  }
});
