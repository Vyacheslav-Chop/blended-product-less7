//Функцію для створення, рендеру або видалення розмітки
import {
  fetchProducts,
  fetchCategories,
  fetchProductById,
} from './products-api';
import { refs } from './refs';
import {
  showErrorMessage,
  createTags,
  appendProducts,
  checkEndOfCollection,
} from './helpers';
import { currentPage } from './constants';

const { homeCategories, homeProducts, modalProduct, addToCartBtn } = refs;
// функції для рендеру товарів
export function productsMarkUp(products) {
  return products
    .map(
      ({ id, title, brand, category, price, thumbnail }) => `
  <li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${brand}</p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: $${price}</p>
 </li>`
    )
    .join('');
}

export async function renderProducts() {
  try {
    const { products, total } = await fetchProducts(currentPage);
    appendProducts(homeProducts, products);
    checkEndOfCollection(total, currentPage);
    
  } catch (error) {
    console.error('Error while fetching products:', error); // Додатковий дебаг
    showErrorMessage(
      'Something went wrong while loading products. Please try again later.'
    );
  }
}

// функції для рендеру кнопок категорій

export function categoriesMarkUp(arr) {
  return arr
    .map(
      category => `
    <li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
 </li>`
    )
    .join('');
}

export async function renderCategories() {
  try {
    const categories = await fetchCategories();
    const allCategories = ['All', ...categories];
    homeCategories.innerHTML = categoriesMarkUp(allCategories);
  } catch (error) {
    showErrorMessage(
      'Something went wrong while loading categories. Please try again later.'
    );
  }
}

// функції для створення модального вікна
function createProductById(product) {
  const {
    title,
    description,
    price,
    tags,
    images,
    shippingInformation,
    returnPolicy,
  } = product;
  return `<img class="modal-product__img" src="${
    images?.[0] || ''
  }" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${createTags(tags)}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: $${price}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;
}

export async function renderProductById(id) {
  try {
    const product = await fetchProductById(id);
    console.log(product);
    

    modalProduct.innerHTML = createProductById(product);
    addToCartBtn.dataset.id = product.id;    
  } catch (error) {
    showErrorMessage(
      'Failed to load product information. Please try again later.'
    );
  }
}
