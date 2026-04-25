const h1 = document.querySelector("#hero h1");
const [firstName, lastName] = h1.textContent.split(" ");
const text = h1.textContent;

h1.innerHTML = text
  <div class="name-line first">
    ${firstName.split("").map(l => `<span class="letter">${l}</span>`).join("")}
  </div>
  <div class="name-line last">
    ${lastName.split("").map(l => `<span class="letter">${l}</span>`).join("")}
  </div> `

  .split("")
  .map(letter => `<span class="letter">${letter === " " ? "&nbsp;" : letter}</span>`)
  .join("");


const letters = document.querySelectorAll(".letter");

letters.forEach((letter, index) => {
  letter.style.animationDelay = `${index * 0.05}s`;
});
