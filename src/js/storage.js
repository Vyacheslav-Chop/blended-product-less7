//Робота з loacalStorage
// оновлення хранилища
export function updateLocalStorage(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}
// отримання даних з локального хранилища
export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? [];
}
