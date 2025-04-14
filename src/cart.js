//Логіка сторінки Cart
import { refs } from './js/refs';
const { cartProducts } = refs;
import { getFromLocalStorage } from './js/storage';
import { STORAGE_KEYS } from './js/constants';
import { fetchProductById } from './js/products-api';
import { productsMarkUp } from './js/render-function';
import { showErrorMessage } from './js/helpers';
const { cart } = STORAGE_KEYS;

const idAllProducts = getFromLocalStorage(cart);
console.log(idAllProducts);

async function render(idAllProducts) {
  const products = await Promise.all(
    idAllProducts.map(async ({ id, qty }) => {
      const product = await fetchProductById(id);
      return { ...product, qty };
    })
  );
  return products;
}
render(idAllProducts)
  .then(products => {
  console.log('Products after fetch:', products);
  cartProducts.innerHTML = productsMarkUp(products);
  }).catch(() => {
    showErrorMessage('Failed to load products. Please try again later.');
});
