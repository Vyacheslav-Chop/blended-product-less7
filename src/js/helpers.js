import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import { refs } from './refs';
import { productsMarkUp } from './render-function';

const { loadMoreBtn, homeProducts } = refs;

//Допоміжні функції
// функція для запиту через бібліотеку
export async function fetchData(url) {
  const { data } = await axios.get(url);
  return data;
}
// функція для виведення повідомлення про помилку через бібліотеку
export function showErrorMessage(message) {
  iziToast.error({
    message,
    position: 'bottomRight',
    backgroundColor: '#ef4040',
    messageColor: '#ffffff',
    maxWidth: '400',
  });
}
// функція очищення контенту
export function clearContent(container) {
  container.innerHTML = '';
}
// Функція для активності кнопки
export function updateActiveCategoryBtn(container, targetBtn) {
  const prevActive = container.querySelector('.categories__btn--active');
  if (prevActive) {
    prevActive.classList.remove('categories__btn--active');
  }
  targetBtn.classList.add('categories__btn--active');
}
// функція для повідомлень через бібліотеку
export function showInfoMessage(message) {
  iziToast.info({
    message,
    position: 'bottomCenter',
    maxWidth: '400',
  });
}
// плавний скрол при підвантажені товарів
export function smoothScroll() {
  const galleryItem = document.querySelector('.products__item');
  const rect = galleryItem.getBoundingClientRect();
  const heightItem = rect.height;

  window.scrollBy({
    top: heightItem * 1.5,
    behavior: 'smooth',
  });
}
// функція для роботи з тегами після запитів
export function createTags(tags) {
  return tags.map(tag => `<li>${tag}</li>`).join('');
}

// виводить кнопку для додаткового підвантаження товарів
export function showLoadMoreBtn() {
  loadMoreBtn.hidden = false;
}
// ховає кнопку для додаткового підвантаження товарів
export function hideLoadMoreBtn() {
  loadMoreBtn.hidden = true;
}
// перевірка чи лишився ще товар для підвантаження
export function checkEndOfCollection(total, currentPage) {
  console.log(`Current page: ${currentPage}, Total: ${total}`);

  if (currentPage * 12 >= total) {
    showInfoMessage('There are no more products to load at the moment.');
    hideLoadMoreBtn();
    console.log('No more products to load. Button hidden.');
  } else {
    showLoadMoreBtn();
    console.log('More products available. Button shown.');
  }
}
// додавання DOM елементів
export function appendProducts(element, products) {
  element.insertAdjacentHTML('beforeend', productsMarkUp(products));
}
