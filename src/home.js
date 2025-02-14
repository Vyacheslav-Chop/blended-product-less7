import { refs } from './js/refs';

const currentPage = 1;
const url = `https://dummyjson.com/products?limit=12&skip=${
  (currentPage - 1) * 12
}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    renderProductsList(data.products);
  });

function renderProductsList(products) {
  const markup = products
    .map(
      ({
        thumbnail,
        title,
        brand,
        category,
        price,
      }) => `<li class="products__item">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
    </li>`
    )
    .join('');
  refs.productsList.insertAdjacentHTML('beforeend', markup);
}

// fetch('https://dummyjson.com/products/search?q=nail')
//   .then(res => res.json())
//   .then(console.log);

// fetch('https://dummyjson.com/products/categories')
//   .then(res => res.json())
//   .then(console.log);

// fetch('https://dummyjson.com/products/category-list')
//   .then(res => res.json())
//   .then(console.log);
