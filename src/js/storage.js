//Робота з loacalStorage
import { STORAGE_KEYS } from "./constants";
const { theme } = STORAGE_KEYS;
// оновлення хранилища
export function updateLocalStorage(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}
// отримання даних з локального хранилища
export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? [];
}

export function saveThemeToLocalStorage(themeValue) {
  localStorage.setItem(theme, themeValue);
}

export function loadThemeFromLocalStorage() {
  const savedTheme = localStorage.getItem(theme);
  return savedTheme ? savedTheme : 'theme-light';
}