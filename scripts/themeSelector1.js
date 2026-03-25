// Switch function
const switchTheme = () => {
  // Get root element and data-theme value
  const rootElem = document.documentElement
  let dataTheme = rootElem.getAttribute('data-theme'),
    newTheme

  newTheme = (dataTheme == 'light') ? 'dark' : 'light'

  // Set new HTML attribute
  rootElem.setAttribute('data-theme', newTheme)

  // Set new local storage item
  localStorage.setItem('theme', newTheme)
}

if (window.matchMedia('(max-width: 830px)').matches) {
  // Add event listener for the theme colour switcher
  document.querySelector('#theme-switcher').addEventListener('click', switchTheme)
} else {
  document.querySelector('#theme__item').addEventListener('click', switchTheme)
}