//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { refs } from './refs';
const {
  modal,
  cartBtnModal,
  wishlistBtnModal,
  cartSpan,
  cartProducts,
  cartItems,
  cartTotal,
  wishlistSpan,

} = refs;
import { handleModalClick, handleKeyDown } from './handlers';
import { STORAGE_KEYS } from './constants';
import { updateLocalStorage, getFromLocalStorage } from './storage';
import { showInfoMessage } from './helpers';
import {
  renderProductsInContainer,
  renderProductsInWishlist,
} from './render-function';
import { updateCartIndicator, updateCartSum } from './helpers';

const { cart, wishlist } = STORAGE_KEYS;
// відкриття модалки
export function openModal() {
  modal.classList.add('modal--is-open');
  const productId = Number(wishlistBtnModal.dataset.id);

  const idAllProducts = getFromLocalStorage(wishlist);

  const index = idAllProducts.findIndex(({ id }) => id === productId);
  if (index !== -1) {
    wishlistBtnModal.textContent = 'Remove from Wishlist';
  } else {
    wishlistBtnModal.textContent = 'Add to Wishlist';
  }
  modal.addEventListener('click', handleModalClick);
  window.addEventListener('keydown', handleKeyDown);
}

// закриття модалки
export function closeModal() {
  modal.classList.remove('modal--is-open');
  modal.removeEventListener('click', handleModalClick);
  window.removeEventListener('keydown', handleKeyDown);
}

// додавання товару до кошику
export function addToCart() {
  const productId = Number(cartBtnModal.dataset.id);

  const idAllProducts = getFromLocalStorage(cart);

  const index = idAllProducts.findIndex(({ id }) => id === productId);

  if (index === -1) {
    idAllProducts.push({ id: productId, qty: 1 });

  } else {
    idAllProducts[index].qty++;
  }
  updateLocalStorage(cart, idAllProducts);
  const totalQty = idAllProducts.reduce((count, { qty }) => count + qty, 0);
  cartSpan.textContent = totalQty;
  showInfoMessage('Product added to cart.');
  closeModal();
}
// віднімання або видалення товару з кошику
export function removeFromCart() {
  const products = getFromLocalStorage(cart);

  const currentId = Number(cartBtnModal.dataset.id);
  if (!Array.isArray(products) || !currentId) return;

  const index = products.findIndex(({ id }) => id === currentId);
  if (index !== -1 && products[index].qty > 1) {
    products[index].qty--;
    updateLocalStorage(cart, products);
    showInfoMessage('Product quantity decreased!');
  } else {
    const newProducts = products.filter(({ id }) => id !== currentId);
    updateLocalStorage(cart, newProducts);
    showInfoMessage('Product removed from cart!');
  }
  renderProductsInContainer(cartProducts, cart);
  closeModal();
  updateCartIndicator(cartSpan, cart);
  updateCartIndicator(cartItems, cart);
  updateCartSum(cartTotal, cart);
}
// додавання товару до списку бажань
export function addToWishList() {
  const productId = Number(wishlistBtnModal.dataset.id);

  const idAllProducts = getFromLocalStorage(wishlist);

  const index = idAllProducts.findIndex(({ id }) => id === productId);
  if (index !== -1) {
    showInfoMessage('Product is already in wishlist.');
    closeModal();
    return;
  } else {
    idAllProducts.push({ id: productId, qty: 1 });
    updateLocalStorage(wishlist, idAllProducts);
    const totalQty = idAllProducts.reduce((count, { qty }) => count + qty, 0);
    wishlistSpan.textContent = totalQty;
    showInfoMessage('Product added to wishList.');
    closeModal();
  }
}
// видалення товару зі списку бажань
export function removeFromWishList() {
  const products = getFromLocalStorage(wishlist);
  const currentId = Number(wishlistBtnModal.dataset.id);
  const index = products.findIndex(({ id }) => id === currentId);

  if (index !== -1) {
    const newProducts = products.filter(({ id }) => id !== currentId);
    updateLocalStorage(wishlist, newProducts);
    showInfoMessage('Product removed from wishlist!');
  }
  closeModal();
  updateCartIndicator(wishlistSpan, wishlist);
  renderProductsInWishlist();
}

export function buyProducts() {

}
