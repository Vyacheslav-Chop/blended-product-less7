//Логіка сторінки Home
import {
  renderProducts,
  renderCategories,
} from './js/render-function';
import { refs } from './js/refs';
import {
  showProducts,
  searchProduct,
  handleLoadMore,
} from './js/handlers';

import { openProductModal } from './js/modal';

const { homeCategories, form, homeProducts, loadMoreBtn } = refs;
// логіка для початкової сторінки
renderProducts();
renderCategories();

homeCategories.addEventListener('click', showProducts);
form.addEventListener('submit', searchProduct);
homeProducts.addEventListener('click', openProductModal);
loadMoreBtn.addEventListener('click', handleLoadMore);