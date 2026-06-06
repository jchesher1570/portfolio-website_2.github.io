const switchTheme = () => {

    const rootElem = document.documentElement;

    const currentTheme = rootElem.getAttribute('data-theme');

    const newTheme = currentTheme === 'dark'
        ? 'light'
        : 'dark';

    rootElem.setAttribute('data-theme', newTheme);

    // Save selection
    localStorage.setItem('theme', newTheme);
};

document
    .querySelector('#theme-switcher')
    .addEventListener('click', switchTheme);
