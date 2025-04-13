// Функції, які передаються колбеками в addEventListners
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
  showLoadMoreBtn,
} from './helpers';
import { renderProducts } from './render-function';
import { closeModal, addToCard } from './modal';

const { homeCategories, homeProducts, notFoundDiv, form } = refs;
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
    appendProducts(homeProducts, products);
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
// закриття модалки кнопкою
export function handleModalClick(ev) {
  const closeBtn = ev.target.closest('.modal__close-btn');
  const addToCartBtn = ev.target.closest('.modal-product__btn--cart');
  const addToWishList = ev.target.closest('modal-product__btn--wishlist');
  if (closeBtn) {
    closeModal();
  } else if (addToCartBtn) {
    addToCard();
  } else {
    addToWish();
  }
}
// показати більше
export async function handleLoadMore(ev) {
  currentPage++;
  hideLoadMoreBtn();
  try {
    let data;
    if (query) {
      data = await fetchSearchResults(query, currentPage);
    } else if (category) {
      data = await fetchCategoryProducts(category, currentPage);
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
    }
  } catch (error) {
    showErrorMessage('Oops! Something went wrong. Please try again later.');
  }
}
