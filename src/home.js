//Логіка сторінки Home
import {
  renderProducts,
  renderCategories,
  renderLoadMoreBtn,
} from './js/render-function';
import { refs } from './js/refs';
import {
  showProducts,
  searchProduct,
  handleModalClick,
  handleLoadMore,
} from './js/handlers';

import { openProductModal } from './js/modal';

const { homeCategories, form, homeProducts, modal, loadMoreBtn } = refs;
// логіка для початкової сторінки
renderProducts();
renderCategories();
renderLoadMoreBtn();

homeCategories.addEventListener('click', showProducts);
form.addEventListener('submit', searchProduct);
homeProducts.addEventListener('click', openProductModal);
modal.addEventListener('click', handleModalClick);
loadMoreBtn.addEventListener('click', handleLoadMore);