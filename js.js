const btn = document.querySelector(".input-area .next");
const btn2 = document.querySelector(".input-area .prev");
const product = document.querySelector(".product-area");
const container = document.querySelector(".container");
const showCart =document.querySelector(".show-cart");
const cart = document.createElement("div");

let total =document.createElement("p");
total.innerText="Total : "

  cart.classList="cart";
  container.appendChild(cart);
  cart.appendChild(total);


let data = [];
let startIndex = 0;
let endIndex = 9;
let allProducts = [];

async function fetchProducts() {
  await fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(res => data = res.products);
}

function appendProducts(start, end) {
  for (let i = start; i <= end; i++) {
    const item = data[i];
    appendNewItemIntoproduct(item.title, item.images, item.description,item.price);
    allProducts.push(item); 

  }
}

function appendNewItemIntoproduct(value, images, dsicrip,price) {
  const pr=document.createElement("span");
  const dollar = document.createElement("span");
  dollar.innerText="$"
  pr.innerText=price;
  pr.appendChild(dollar);
  pr.className="price";

  const p = document.createElement("p");
  p.innerText = value;
  p.classList = "title";
  const image = document.createElement("img");
  image.src = images[0];
  image.className = "im";
  image.alt = "there is some thing lost";
 image.addEventListener('click', () => {
  const gallery = images.map(img => `<img class="pop" src="${img}" class="gallery-img"/>`).join('');
  const popup = document.createElement("div");
  popup.classList="gallery-img";
  popup.innerHTML=gallery;
  const exit =document.createElement("button");
  exit.classList="exit";
  exit.innerText="Exit";
  exit.addEventListener("click",()=>{
    exit.parentElement.remove();

  })

  popup.appendChild(exit);

  product.appendChild(popup);
 
});


  const disc = document.createElement("p");
  disc.innerText = dsicrip;
  disc.className = "disc";
  const div = document.createElement("div");
  div.className="card"
  const button = document.createElement("button");
  button.classList.add("order");
  button.innerText = "Order";
  const cartItem =document.createElement("div");
cartItem.className="cart-item";
  const cartBtn=document.createElement("button");
  cartBtn.innerText="Delete"
  cartBtn.addEventListener("click",()=>{
    cartBtn.parentElement.remove();

    refreshTotal();
  


  })

  button.addEventListener('click',()=>{
  cartItem.appendChild(p);
  cartItem.appendChild(pr);
  cartItem.appendChild(cartBtn);

  cart.appendChild(cartItem);
  refreshTotal();
  if(cart.lastChild){
    cart.insertBefore(total,total.lastChild.nextSibling)}
});

  div.appendChild(p);
  div.appendChild(image);
  div.appendChild(disc);
  div.appendChild(button);
  product.appendChild(div);
}

async function firstItems() {
  await fetchProducts();
  appendProducts(startIndex, endIndex);
}

firstItems();



function refreshTotal(){
  
  const decPrices=document.querySelectorAll(".price");
  let itemsPriceTotal = 0;
   for (let index = 0; index < decPrices.length; index++) {

  const sum = parseInt(decPrices[index].innerText);
  itemsPriceTotal += sum;
}

console.log(itemsPriceTotal);
total.innerText ="Total = "+itemsPriceTotal+" $";
}
btn.addEventListener("click", () => {
  product.innerHTML = "";
  if (startIndex<20) {
    startIndex+= 10;
  }else{startIndex=0;}
  if (endIndex<29) {
    endIndex += 10;
  }else{endIndex=9;}
  appendProducts(startIndex, endIndex);
  
});
btn2.addEventListener("click", () => {
  product.innerHTML = "";
  if (startIndex > 0) {
    startIndex -= 10;
  }else{
    startIndex=20;
  }

  if (endIndex > 9) {
    endIndex -= 10;
  }else{
    endIndex=29;
  }
  appendProducts(startIndex,endIndex);
});


const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
if(searchInput.value !==""){
  btn.style.display="none";
  btn2.style.display="none";
}
if (searchInput.value === "") {
  btn.style.display="block";
  btn2.style.display="block";
   
}

  product.innerHTML = ""; 
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
     
    
    if (title.includes(filter) || description.includes(filter)) {
      appendNewItemIntoproduct(item.title, item.images, item.description);
    }
  }
});
showCart.addEventListener("click", ()=>{
  if (cart.style.display === "flex") {
    cart.style.display = "none";
  } else {
    cart.style.display = "flex";
  }
});
