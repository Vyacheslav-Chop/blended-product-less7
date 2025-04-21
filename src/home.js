//Логіка сторінки Home
import { renderProducts, renderCategories } from './js/render-function';
import { refs } from './js/refs';
import { showProducts, searchProduct, handleLoadMore } from './js/handlers';
import { updateCartIndicator } from './js/helpers';
import { STORAGE_KEYS } from './js/constants';
const { cart, wishlist } = STORAGE_KEYS;
import { openProductModal, goTop, trackScroll } from './js/handlers';
import { applySavedTheme } from './js/theme';

const {
  homeCategories,
  form,
  homeProducts,
  loadMoreBtn,
  cartSpan,
  wishlistSpan,
  goTopBtn,
} = refs;
// логіка для початкової сторінки
applySavedTheme();
updateCartIndicator(cartSpan, cart);
updateCartIndicator(wishlistSpan, wishlist);
renderProducts();
renderCategories();

homeCategories.addEventListener('click', showProducts);
form.addEventListener('submit', searchProduct);
homeProducts.addEventListener('click', openProductModal);
loadMoreBtn.addEventListener('click', handleLoadMore);

goTopBtn.addEventListener('click', goTop);
window.addEventListener('scroll', trackScroll);
