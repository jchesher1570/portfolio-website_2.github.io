const topBar = document.querySelector("#theme-switcher_wrapper");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    topBar.classList.add("visible");
  } else {
    topBar.classList.remove("visible");
  }
});
