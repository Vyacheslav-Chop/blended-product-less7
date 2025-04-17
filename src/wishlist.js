import { refs } from './js/refs';
const { cartSpan, wishlistBtnModal, wishlistProducts, wishlistSpan } = refs;
import { updateCartIndicator } from './js/helpers';
import { STORAGE_KEYS } from './js/constants';
import { renderProductsInWishlist } from './js/render-function';
import { openProductModal } from './js/modal';
const { cart, wishlist } = STORAGE_KEYS;
updateCartIndicator(cartSpan, cart);
updateCartIndicator(wishlistSpan, wishlist);
wishlistBtnModal.textContent = 'Remove from Wishlist';
renderProductsInWishlist();
wishlistProducts.addEventListener('click', openProductModal);