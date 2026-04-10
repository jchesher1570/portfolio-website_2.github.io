// Switch function
const switchTheme = () => {
    // Get root element and data-theme value
    const rootElem = document.documentElement
    let dataTheme = rootElem.getAttribute('data-theme'),
        newTheme
    newTheme = (dataTheme == 'dark') ? 'light' : 'dark'
 
   // Set new HTML attribute
   rootElem.setAttribute('data-theme', newTheme)
 
}
 
// Add event listenr for the theme switcher
document.querySelector('#theme-switcher').addEventListener('click',switchTheme)


