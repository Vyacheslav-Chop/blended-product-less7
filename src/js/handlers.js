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
import { renderProducts, productsMarkUp } from './render-function';
import {
  closeModal,
  addToCart,
  addToWishList,
  removeFromWishList,
  removeFromCart,
} from './modal';

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
    homeProducts.innerHTML = productsMarkUp(products)
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
// слухач на модалку
export function handleModalClick(ev) {
  const closeBtn = ev.target.closest('.modal__close-btn');
  const cartBtnModal = ev.target.closest('.modal-product__btn--cart');
  const wishlistBtnModal = ev.target.closest('.modal-product__btn--wishlist');
  
  if (closeBtn) {
    closeModal();
    return;
  } else if (cartBtnModal) {
    if (cartBtnModal.textContent.trim() === 'Add to Cart') {
      addToCart();
      return
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
