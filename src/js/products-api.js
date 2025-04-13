// Функції для роботи з бекендом
import { limit } from './constants';
import { fetchData } from './helpers';
// пошук прайса
export async function fetchProducts(currentPage = 1) {
  const skip = (currentPage - 1) * limit;
  const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  return fetchData(url);
}
// пошук категорій
export async function fetchCategories() {
  const BASE_URL = 'https://dummyjson.com/products/category-list';
  return fetchData(BASE_URL);
}
// пошук за категорією
export async function fetchCategoryProducts(category, currentPage = 1) {
  const BASE_URL = 'https://dummyjson.com/products/category/';
  const skip = (currentPage - 1) * limit;
  const url = `${BASE_URL}${category}?limit=${limit}&skip=${skip}`;
  return fetchData(url);
}
// пошук за значенням з інпуту
export async function fetchSearchResults(query, currentPage = 1) {
  const BASE_URL = 'https://dummyjson.com/products/search';
  const skip = (currentPage - 1) * limit;
  const url = `${BASE_URL}?q=${query}&limit=${limit}&skip=${skip}`;
  return fetchData(url);
}
// пошук для модалки
export async function fetchProductById(id) {
  const BASE_URL = 'https://dummyjson.com/products/';
  const url = `${BASE_URL}${id}`;
  return fetchData(url);
}
