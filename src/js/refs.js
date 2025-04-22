//Обʼєкт з посиланнями на ДОМ елементи
export const refs = {
  body: document.body,
  homeProducts: document.querySelector('.products[data-page="home"]'),
  wishlistProducts: document.querySelector('.products[data-page="wishlist"]'),
  homeCategories: document.querySelector('.categories'),
  notFoundDiv: document.querySelector('.not-found'),
  form: document.querySelector('.search-form'),
  modalProduct: document.querySelector('.modal-product'),
  modal: document.querySelector('.modal'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  cartBtnModal: document.querySelector('.modal-product__btn--cart'),
  wishlistBtnModal: document.querySelector('.modal-product__btn--wishlist'),
  cartProducts: document.querySelector('.products[data-page="cart"]'),
  cartSpan: document.querySelector('[data-cart-count]'),
  cartItems: document.querySelector('[data-count]'),
  cartTotal: document.querySelector('[data-price]'),
  wishlistSpan: document.querySelector('[data-wishlist-count]'),
  changeThemeBtn: document.querySelector('#themeToggle'),
  goTopBtn: document.querySelector('.go-top'),
  loader: document.querySelector('.loader'),
};

 