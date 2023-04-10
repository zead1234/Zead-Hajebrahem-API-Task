const btn = document.querySelector(".input-area button");
const product = document.querySelector(".product-area");

function appendNewItemIntoproduct(value,image1,dsicrip){
  
  const p = document.createElement("p");
  p.innerText =value;
  p.classList ="title";
  const image = document.createElement("img");
  image.src=image1;
  image.className="im";
  image.alt="there is some thing lost"
  const disc = document.createElement("p");
  disc.innerText=dsicrip;
  disc.className="disc";
  const div = document.createElement("div");
 
  const button = document.createElement("button");
  button.classList.add("order");
  button.innerText = "Order";
  div.appendChild(p);
  div.appendChild(image);
  div.appendChild(disc);
  div.appendChild(button);

  product.appendChild(div);
}
let currentPage=1;
async function firstItems(){
let data=[];
await fetch(`https://dummyjson.com/products?page=${currentPage}&limit=10`)
.then(res => res.json())
.then(res => data=res.products);

data.forEach((item) => {
    appendNewItemIntoproduct(item.title,item.images[1],item.description);
  });
}
firstItems();



async function nextItems(){
 let newData=[];
  currentPage++;
  await fetch(`https://dummyjson.com/products?page=${currentPage}&limit=10`)
.then(res => res.json())
.then(res => newData=res.products);
  newData.forEach((item) => {
    if(currentPage>=5){currentPage=1}
    appendNewItemIntoproduct(item.title,item.images[currentPage],item.description);
  });
}


async function prevItems() {
  if (currentPage > 1) {
    currentPage--;
    const data = await fetch(`https://dummyjson.com/products?page=${currentPage}&limit=10`)
      .then(res => res.json())
      .then(res => res.products);
    product.innerHTML = '';
    data.forEach((item) => {
      appendNewItemIntoproduct(item.title,item.images[1],item.description);
    });
  }
}