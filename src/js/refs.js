//Обʼєкт з посиланнями на ДОМ елементи
export const refs = {
  homeProducts: document.querySelector('.products[data-page="home"]'),
  wishListProducts: document.querySelector('.products[data-page="wishlist"]'),
  homeCategories: document.querySelector('.categories'),
  notFoundDiv: document.querySelector('.not-found'),
  form: document.querySelector('.search-form'),
  modalProduct: document.querySelector('.modal-product'),
  modal: document.querySelector('.modal'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  addToCartBtn: document.querySelector('.modal-product__btn--cart'),
  addToWishListBtn: document.querySelector('.modal-product__btn--wishlist'),
  cartProducts: document.querySelector('.products[data-page="cart"]'),
};
