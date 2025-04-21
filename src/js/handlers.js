// Функції, які передаються колбеками в addEventListner
import { refs } from './refs';
import {
  fetchProducts,
  fetchCategoryProducts,
  fetchSearchResults,
} from './products-api';
import {
  updateActiveCategoryBtn,
  clearContent,
  showErrorMessage,
  showInfoMessage,
  smoothScroll,
  hideLoadMoreBtn,
  checkEndOfCollection,
  appendProducts,
} from './helpers';
import {
  renderProducts,
  productsMarkUp,
  renderProductById,
  renderProductByIdSavedItems,
} from './render-function';
import {
  closeModal,
  addToCart,
  addToWishList,
  removeFromWishList,
  removeFromCart,
  openModal,
} from './modal';

import { saveThemeToLocalStorage } from './storage';
import { STORAGE_KEYS } from './constants';
const { cart } = STORAGE_KEYS;

const {
  homeCategories,
  homeProducts,
  notFoundDiv,
  form,
  cartProducts,
  wishlistProducts,
  body,
  goTopBtn
} = refs;
let query = '';
let currentPage = 1;
let category = '';
// вивід списку продуктів за категорією
export async function showProducts(ev) {
  if (!ev.target.classList.contains('categories__btn')) return;
  category = ev.target.textContent.trim();

  updateActiveCategoryBtn(homeCategories, ev.target);
  currentPage = 1;
  clearContent(homeProducts);
  hideLoadMoreBtn();

  try {
    let data;
    if (category === 'All') {
      data = await fetchProducts(currentPage);
    } else {
      data = await fetchCategoryProducts(category, currentPage);
    }

    const { products, total } = data;

    if (products.length === 0) {
      notFoundDiv.classList.add('not-found--visible');
    } else {
      appendProducts(homeProducts, products);

      checkEndOfCollection(total, currentPage);
    }
  } catch (error) {
    console.error("Oops! Couldn't fetch products:", error);
    showErrorMessage(
      "Oops! Couldn't fetch products. Check your connection or try again."
    );
  }
}
// пошук продуктів форми пошуку
export async function searchProduct(event) {
  event.preventDefault();
  currentPage = 1;
  clearContent(homeProducts);
  hideLoadMoreBtn();

  query = form.elements['searchValue'].value.trim();
  if (!query) {
    showErrorMessage('Please fill in the search field!');
    return;
  }

  try {
    const { products, total } = await fetchSearchResults(query, currentPage);

    if (products.length === 0) {
      renderProducts();
      showErrorMessage('Unfortunately, no results were found for this query.');
      return;
    }
    homeProducts.innerHTML = productsMarkUp(products);
    checkEndOfCollection(total, currentPage);
  } catch (error) {
    console.error('An error occurred while searching for products:', error);
    showErrorMessage(
      'An error occurred while searching for products. Please try again later.'
    );
  } finally {
    form.reset();
  }
}

// відкриття модалки за обраним товаром
export async function openProductModal(event) {
  const liElement = event.target.closest('.products__item');

  if (!liElement) {
    return;
  }
  const currentId = Number(liElement.dataset.id);

  if (!currentId || !liElement) {
    return;
  }

  if (homeProducts) {
    await renderProductById(currentId);
  } else if (cartProducts) {
    await renderProductByIdSavedItems(currentId, cart);
  } else if (wishlistProducts) {
    await renderProductById(currentId);
  }

  openModal();
}

// слухач на модалку
export function handleModalClick(ev) {
  const closeBtn = ev.target.closest('.modal__close-btn');
  const cartBtnModal = ev.target.closest('.modal-product__btn--cart');
  const wishlistBtnModal = ev.target.closest('.modal-product__btn--wishlist');
  const modalBtnBuy = document.querySelector('.modal-product__buy-btn');

  if (closeBtn) {
    closeModal();
    return;
  } else if (cartBtnModal) {
    if (cartBtnModal.textContent.trim() === 'Add to Cart') {
      addToCart();
      return;
    } else if (cartBtnModal.textContent.trim() === 'Remove from Cart') {
      removeFromCart();
      return;
    }
  } else if (wishlistBtnModal) {
    if (wishlistBtnModal.textContent.trim() === 'Add to Wishlist') {
      addToWishList();
      return;
    } else if (wishlistBtnModal.textContent.trim() === 'Remove from Wishlist') {
      removeFromWishList();
      return;
    }
  } else if (modalBtnBuy) {
  }
}
// показати більше
export async function handleLoadMore(ev) {
  const loadMoreBtn = ev.currentTarget;
  if (!loadMoreBtn) return;

  currentPage++;
  loadMoreBtn.disabled = true;
  hideLoadMoreBtn();
  try {
    let data;
    if (query) {
      data = await fetchSearchResults(query, currentPage);
    } else if (category) {
      if (category === 'All') {
        data = await fetchProducts(currentPage);
      } else {
        data = await fetchCategoryProducts(category, currentPage);
      }
    } else {
      data = await fetchProducts(currentPage);
    }
    const { products, total } = data;

    if (products.length === 0) {
      showInfoMessage('No products found matching your search criteria.');
    } else {
      appendProducts(homeProducts, products);
      setTimeout(() => smoothScroll());
      checkEndOfCollection(total, currentPage);
      loadMoreBtn.disabled = false;
    }
  } catch (error) {
    showErrorMessage('Oops! Something went wrong. Please try again later.');
  }
}

export function handleChangeTheme() {
  if (body.classList.contains('theme-light')) {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    saveThemeToLocalStorage('theme-dark');
  } else {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    saveThemeToLocalStorage('theme-light');
}
}

export function trackScroll() {
  const Offset = window.pageYOffset;
  // вичисляєм висоту вікна браузера
  const coords = document.documentElement.clientHeight;
  if (Offset > coords) {
    goTopBtn.classList.add('go-top--show');
  } else {
    goTopBtn.classList.remove('go-top--show');
  }
}

export function goTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -75);
    setTimeout(goTop, 0);
  }
}
