const btn = document.querySelector(".input-area .next");
const btn2 = document.querySelector(".input-area .prev");
const product = document.querySelector(".product-area");

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
    appendNewItemIntoproduct(item.title, item.images, item.description);
    allProducts.push(item); 
  }
}

function appendNewItemIntoproduct(value, images, dsicrip) {
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
  button.addEventListener('click',()=>{
    const conf=confirm("Are you sure you want to place this order?")
    if(conf){
      alert("Your package has been shipped.")
    }
  } )
  div.appendChild(p);
  div.appendChild(image);
  div.appendChild(disc);
  div.appendChild(button);
  product.appendChild(div);
}

async function firstItems() {
  await fetchProducts();
  appendProducts(startIndex, endIndex);
  console.log("fffffffffffff");
}

firstItems();

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
