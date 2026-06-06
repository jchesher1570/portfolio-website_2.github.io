// Check local storage
let themeToSet = localStorage.getItem('theme');

// If nothing stored, use OS preference
if (!themeToSet) {
    themeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

// Apply theme
document.documentElement.setAttribute('data-theme', themeToSet);
