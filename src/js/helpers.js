import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { refs } from './refs';
import { productsMarkUp } from './render-function';
const { loadMoreBtn, notFoundDiv } = refs;
import { getFromLocalStorage } from './storage';
import { fetchProductById } from './products-api';
import { STORAGE_KEYS } from './constants';
const { cart } = STORAGE_KEYS;
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
    position: 'center',
    maxWidth: '400',
    timeout: 1500,
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
// оновлення індикатору корзини чи бажань
export function updateCartIndicator(box, key) {
  if (!box || !key) return;

  const idAllProducts = getFromLocalStorage(key) || [];
  const totalQty = idAllProducts.reduce((count, { qty }) => count + qty, 0);
  box.textContent = totalQty;
}
// функція для отримання списку продуктів в корзині чи бажаннях
export async function getProductsWithDetails(key) {
  try {
    const idAllProducts = getFromLocalStorage(key);
    const products = await Promise.all(
      idAllProducts.map(async ({ id, qty }) => {
        const product = await fetchProductById(id);
        return { ...product, qty };
      })
    );
    return products;
  } catch (error) {
    showErrorMessage('Failed to load products. Please try again later.');
    return [];
  }
}

export async function getProductsWithDetailsNoQty(key) {
  try {
    const idAllProducts = getFromLocalStorage(key);
    const products = await Promise.all(
      idAllProducts.map(async ({ id }) => {
        const product = await fetchProductById(id);
        return product;
      })
    );
    return products;
  } catch (error) {
    showErrorMessage('Failed to load products. Please try again later.');
    return [];
  }
}
// функція підрахунку вартості
export async function updateCartSum(box, key) {
  if (!box || !key) return;

  const products = await getProductsWithDetails(key);

  const totalCent = products.reduce(
    (total, { price, qty }) => total + price * 100 * qty,
    0
  );
 
  const totalPrice = (totalCent / 100).toFixed(2);
  box.textContent = `$${totalPrice}`;
}
// функція для контенту якщо нічого не знайдено
export function toggleNotFoundVisibility(isVisible) {
  if (isVisible) {
    notFoundDiv.classList.add('not-found--visible');
  } else {
    notFoundDiv.classList.remove('not-found--visible');
  }
}

const goTopBtn = document.querySelector(".go-top");

goTopBtn.addEventListener("click", goTop);
window.addEventListener("scroll", trackScroll);

function trackScroll() {
  const Offset = window.pageYOffset;
  // вичисляєм висоту вікна браузера
  const coords = document.documentElement.clientHeight;  
  if (Offset > coords) {
    goTopBtn.classList.add("go-top--show");
  } else {
    goTopBtn.classList.remove("go-top--show");
  }
}

function goTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -75);
    setTimeout(goTop, 0);
  }
}