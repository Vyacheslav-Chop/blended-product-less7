import { refs } from './js/refs';
const { cartSpan, wishlistProducts, wishlistSpan } = refs;
import { updateCartIndicator } from './js/helpers';
import { STORAGE_KEYS } from './js/constants';
import { renderProductsInWishlist } from './js/render-function';
import { openProductModal } from './js/handlers'; 
import { applySavedTheme } from './js/theme';
const { cart, wishlist } = STORAGE_KEYS;

applySavedTheme();
updateCartIndicator(cartSpan, cart);
updateCartIndicator(wishlistSpan, wishlist);
renderProductsInWishlist();
wishlistProducts.addEventListener('click', openProductModal);