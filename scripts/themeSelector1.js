// Switch function
// const switchTheme = () => {
//   // Get root element and data-theme value
//   const rootElem = document.documentElement
//   let dataTheme = rootElem.getAttribute('data-theme'),
//     newTheme
// 
//   newTheme = (dataTheme == 'light') ? 'dark' : 'light'
// 
//   // Set new HTML attribute
//   rootElem.setAttribute('data-theme', newTheme)
// 
//   // Set new local storage item
//   localStorage.setItem('theme', newTheme)
// }
// 
// if (window.matchMedia('(max-width: 830px)').matches) {
//   // Add event listener for the theme colour switcher
//   document.querySelector('#theme-switcher').addEventListener('click', switchTheme)
// } else {
//   document.querySelector('#theme__item').addEventListener('click', switchTheme)
// }


const toggleBtn = document.getElementById("theme-toggle");

// Apply theme
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
}

// 1. Initial load
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

// 2. Toggle click
toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";

  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// 3. 🔄 Sync across tabs
window.addEventListener("storage", (event) => {
  if (event.key === "theme") {
    applyTheme(event.newValue);
  }
});
