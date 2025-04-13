//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { renderProductById } from "./render-function";
import { refs } from "./refs";
const { modal } = refs;
import { STORAGE_KEYS } from "./constants";
// відкриття модалки
export function openModal() {
  modal.classList.add('modal--is-open');
}
// закриття модалки
export function closeModal() {
  modal.classList.remove('modal--is-open');
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

export function addToCard() {

}