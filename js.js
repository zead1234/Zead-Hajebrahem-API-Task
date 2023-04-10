const btn = document.querySelector(".input-area button");
const product = document.querySelector(".product-area");

function appendNewItemIntoproduct(value, images, dsicrip) {
  const p = document.createElement("p");
  p.innerText = value;
  p.classList = "title";
  const image = document.createElement("img");
  image.src = images[0];
  image.className = "im";
  image.alt = "there is some thing lost";
  image.addEventListener('click', () => {
    const imageUrls = images.map(img => `<img src="${img}"/>`).join('');
    window.open().document.write(imageUrls);
  });
  const disc = document.createElement("p");
  disc.innerText = dsicrip;
  disc.className = "disc";
  const div = document.createElement("div");
  div.className="card"
  const button = document.createElement("button");
  button.classList.add("order");
  button.innerText = "Order";
  div.appendChild(p);
  div.appendChild(image);
  div.appendChild(disc);
  div.appendChild(button);
  product.appendChild(div);
}
let currentPage = 1;
async function firstItems() {
  let data = [];
  await fetch(`https://dummyjson.com/products?page=${currentPage}&limit=10`)
    .then(res => res.json())
    .then(res => data = res.products);
  data.forEach((item) => {
    appendNewItemIntoproduct(item.title, item.images, item.description);
  });
}
firstItems();

async function nextItems() {
  data=[]
  let newData = [];
  currentPage++;
  await fetch(`https://dummyjson.com/products?page=${currentPage}&limit=10`)
    .then(res => res.json())
    .then(res => newData = res.products);
  newData.forEach((item) => {
    if (currentPage >= 5) { currentPage = 1 }
    appendNewItemIntoproduct(item.title, item.images, item.description);
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
      appendNewItemIntoproduct(item.title, item.images, item.description);
    });
  }
}

const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const products = document.querySelectorAll('.product-area > div');

  products.forEach(product => {
    const title = product.querySelector('.title').textContent.toLowerCase();
    const description = product.querySelector('.disc').textContent.toLowerCase();
    
    if (title.includes(filter) || description.includes(filter)) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });
});
