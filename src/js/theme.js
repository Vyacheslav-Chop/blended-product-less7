import { loadThemeFromLocalStorage } from "./storage";
import { refs } from "./refs";
const { body, changeThemeBtn } = refs;
import { handleChangeTheme } from "./handlers";


export function applySavedTheme() {
  const savedTheme = loadThemeFromLocalStorage();
  if (savedTheme) {
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(savedTheme);
  } else {
    body.classList.add('theme-light');
  }
}

changeThemeBtn.addEventListener('click', handleChangeTheme);
