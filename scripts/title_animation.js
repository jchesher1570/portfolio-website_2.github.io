const h1 = document.querySelector("#hero h1");
const text = h1.textContent;

h1.innerHTML = text
  .split("")
  .map(letter => `<span class="letter">${letter === " " ? "&nbsp;" : letter}</span>`)
  .join("");


const letters = document.querySelectorAll(".letter");

letters.forEach((letter, index) => {
  letter.style.animationDelay = `${index * 0.05}s`;
});
