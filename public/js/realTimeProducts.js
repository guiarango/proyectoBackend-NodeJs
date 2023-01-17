const socket = io();

// Form elements
const productTitle = document.querySelector("#productTitle");
const productDescription = document.querySelector("#productDescription");
const productPrice = document.querySelector("#productPrice");
const productCode = document.querySelector("#productCode");
const productStock = document.querySelector("#productStock");
const productStatus = document.querySelector("#productStatus");
const productCategory = document.querySelector("#productCategory");
const productThumbnail = document.querySelector("#productThumbnail");
const submitFormButton = document.querySelector("#submitForm");

//ul
const ul = document.querySelector("ul");

socket.on("productoCreado", (nombreProducto) => {
  //Se crea el elemento li
  const liItem = document.createElement("li");
  liItem.innerText = nombreProducto;

  //Se pega a la lista
  ul.insertAdjacentElement("beforeend", liItem);
});

//Eventlistener
submitFormButton.addEventListener("click", (event) => {
  event.preventDefault();

  const data = {
    title: productTitle.value,
    description: productDescription.value,
    price: Number(productPrice.value),
    code: Number(productCode.value),
    stock: Number(productStock.value),
    status: productStatus == "true" ? true : false,
    category: productCategory.value,
    thumbnail: productThumbnail.value,
  };

  socket.emit("crearProducto", data);
});
