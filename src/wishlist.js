//Логіка сторінки Wishlist

import { appendProducts } from './js/helpers';
import { openProductModal } from './js/modal';
import { fetchProductById } from './js/products-api';
import { refs } from './js/refs';
// import { productsMarkUp } from './js/render-function';

const { wishListProducts } = refs;
const wishlist = JSON.parse(localStorage.getItem('wishlist-products')) ?? [];

// openProductModal();

async function renderWishlist() {
  if (!wishlist.length) {
    document.querySelector('.not-found').classList.add('not-found--visible');
    return;
  }

  const products = await Promise.all(
    wishlist.map(async id => await fetchProductById(id))
  );
  console.log(products);

  appendProducts(wishListProducts, products);
}
renderWishlist();

//  const wishlistItems = JSON.parse(localStorage.getItem(wishlist)) ?? [];

// if (wishlistItems.includes(product.id)) {
//   addToWishListBtn.textContent = 'Remove from Wishlist';
// } else {
//   addToWishListBtn.textContent = 'Add to Wishlist';
// }
