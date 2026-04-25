const h1 = document.querySelector("#hero h1");
const [firstName, lastName] = h1.textContent.trim().split(" ");
const baseDelay = 0.5; // delay before anything starts

h1.innerHTML = `
  <div class="name-line first">
    ${firstName.split("").map((l, i) => 
      `<span class="letter-wrap">
         <span class="letter" style="animation-delay:${baseDelay + i * 0.07}s">${l}</span>
       </span>`
    ).join("")}
  </div>
  <div class="name-line last">
    ${lastName.split("").map((l, i) => 
      `<span class="letter-wrap">
         <span class="letter" style="animation-delay:${baseDelay + (i + firstName.length) * 0.07}s">${l}</span>
       </span>`
    ).join("")}
  </div>
`;
