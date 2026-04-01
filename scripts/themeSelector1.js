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

// 1. Load saved theme OR system preference
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.body.classList.toggle("dark", savedTheme === "dark");
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark", prefersDark);
}

// 2. Toggle on click
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
