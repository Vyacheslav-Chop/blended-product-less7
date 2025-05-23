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
  clearContent,
  toggleNotFoundVisibility,
  hideLoader,
  showLoader,
} from './helpers';
import { currentPage } from './constants';
import { getFromLocalStorage } from './storage';
import { getProductsWithDetails, getProductsWithDetailsNoQty } from './helpers';
import { STORAGE_KEYS } from './constants';
const { wishlist } = STORAGE_KEYS;
const {
  homeCategories,
  homeProducts,
  modalProduct,
  cartBtnModal,
  wishlistBtnModal,
  wishlistProducts,
} = refs;
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
  showLoader();
  try {
    const { products, total } = await fetchProducts(currentPage);
    appendProducts(homeProducts, products);
    checkEndOfCollection(total, currentPage);
  } catch (error) {
    showErrorMessage(
      'Something went wrong while loading products. Please try again later.'
    );
  } finally {
    hideLoader();
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

    if (allCategories.length === 0) {
      clearContent(homeCategories);
      toggleNotFoundVisibility(true);
      return;
    }
    homeCategories.innerHTML = categoriesMarkUp(allCategories);
    toggleNotFoundVisibility(false);
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
  showLoader();
  try {
    const product = await fetchProductById(id);
    if (!product) {
      clearContent(modalProduct);
      toggleNotFoundVisibility(true);
      return;
    }

    modalProduct.innerHTML = createProductById(product);
    const modalBuyBtn = modalProduct.querySelector('.modal-product__buy-btn');
    modalBuyBtn.dataset.id = product.id;
    console.log(modalBuyBtn);
    cartBtnModal.dataset.id = product.id;
    wishlistBtnModal.dataset.id = product.id;
    toggleNotFoundVisibility(false);
  } catch (error) {
    showErrorMessage(
      'Failed to load product information. Please try again later.'
    );
  } finally {
    hideLoader();
  }
}
// створення розмітки для карти чи бажань
export function productsMarkUpSavedItems(products) {
  return products
    .map(
      ({ id, title, brand, category, price, thumbnail, qty }) => `
  <li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${brand}</p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: $${price}</p>
    <p class="products__quantity">Quantity: ${qty}</p>
 </li>`
    )
    .join('');
}
// створення модалки в корзині чи в бажаннях
function createProductByIdSavedItems(product) {
  const {
    title,
    description,
    price,
    tags,
    images,
    shippingInformation,
    returnPolicy,
    qty,
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
        <p class="modal-product__quantity">Quantity: ${qty}</p>
      </div>`;
}
// рендер модалки (відмалювання)
export async function renderProductByIdSavedItems(id, key) {
  showLoader();
  try {
    const product = await fetchProductById(id);
    if (!product) {
      clearContent(modalProduct);
      toggleNotFoundVisibility(true);
      return;
    }
    const productsFromLocal = getFromLocalStorage(key);
    const itemInLocal = productsFromLocal.find(item => item.id === id);
    const qty = itemInLocal?.qty || 1;


    modalProduct.innerHTML = createProductByIdSavedItems({ ...product, qty });
     
    cartBtnModal.dataset.id = product.id;
    wishlistBtnModal.dataset.id = product.id;
    toggleNotFoundVisibility(false);
  } catch (error) {
    showErrorMessage(
      'Failed to load product information. Please try again later.'
    );
  } finally {
    hideLoader();
  }
}

// рендер (відмалювання) продуктів корзини чи бажання
export async function renderProductsInContainer(container, key) {
  try {
    const products = await getProductsWithDetails(key);
    if (products.length === 0) {
      clearContent(container);
      toggleNotFoundVisibility(true);
      return;
    }
    container.innerHTML = productsMarkUpSavedItems(products);
    toggleNotFoundVisibility(false);
  } catch (error) {
    showErrorMessage('Failed to render products. Please try again later.');
  }
}

export async function renderProductsInWishlist() {
  if (!wishlistProducts) return;
  showLoader();
  try {
    const products = await getProductsWithDetailsNoQty(wishlist);
    console.log(products);
    if (products.length === 0) {
      clearContent(wishlistProducts);
      toggleNotFoundVisibility(true);
      return;
    }

    wishlistProducts.innerHTML = productsMarkUp(products);
    toggleNotFoundVisibility(false);
  } catch (error) {
    showErrorMessage('Failed to render products. Please try again later.');
  } finally {
    hideLoader();
  }
}
