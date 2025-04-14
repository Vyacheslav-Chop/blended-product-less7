//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { renderProductById } from './render-function';
import { refs } from './refs';
const { modal } = refs;
import { handleModalClick } from './handlers';
import { STORAGE_KEYS } from './constants';
import { updateLocalStorage } from './storage';

const { cart, wishlist } = STORAGE_KEYS;

// відкриття модалки
export function openModal() {
  modal.classList.add('modal--is-open');
  modal.addEventListener('click', handleModalClick);
}
// закриття модалки
export function closeModal() {
  modal.classList.remove('modal--is-open');
  modal.removeEventListener('click', handleModalClick);
}

// відкриття модалки за обраним товаром
export function openProductModal(event) {
  const liElement = event.target.closest('.products__item');
  if (!liElement) return;

  const currentId = Number(liElement.dataset.id);

  if (!currentId) return;

  renderProductById(currentId);
  openModal();
}

export function handleAddToCart(ev) {
  const productId = Number(ev.target.dataset.id);
  console.log(productId);

  const idAllProducts = JSON.parse(localStorage.getItem(cart)) ?? [];
  console.log(idAllProducts);
  const index = idAllProducts.findIndex(id => id === productId);

  if (index === -1) {
    idAllProducts.push(productId);
    
    console.log(idAllProducts);
    
  }
  updateLocalStorage(cart, idAllProducts);
  
}