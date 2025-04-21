//Логіка сторінки Cart
import { refs } from './js/refs';
const {
  cartProducts,
  cartBtnModal,
  cartItems,
  cartSpan,
  cartTotal,
  wishlistSpan,
} = refs;
import { STORAGE_KEYS } from './js/constants';
import { renderProductsInContainer } from './js/render-function';
import { updateCartIndicator, updateCartSum } from './js/helpers';
import { openProductModal } from './js/handlers';
import { applySavedTheme } from './js/theme';
const { cart, wishlist } = STORAGE_KEYS;

applySavedTheme();
updateCartIndicator(cartSpan, cart);
updateCartIndicator(cartItems, cart);
updateCartSum(cartTotal, cart);
updateCartIndicator(wishlistSpan, wishlist);

cartBtnModal.textContent = 'Remove from Cart';

renderProductsInContainer(cartProducts, cart);

cartProducts.addEventListener('click', openProductModal);
