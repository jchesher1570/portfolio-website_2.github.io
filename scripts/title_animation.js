const h1 = document.querySelector("#hero h1");

const [firstName, lastName] = h1.textContent.trim().split(" ");

h1.innerHTML = `
  <div class="name-line first">
    ${firstName.split("").map((l, i) => 
      `<span class="letter-wrap">
         <span class="letter" style="animation-delay:${i * 0.06}s">${l}</span>
       </span>`
    ).join("")}
  </div>
  <div class="name-line last">
    ${lastName.split("").map((l, i) => 
      `<span class="letter-wrap">
         <span class="letter" style="animation-delay:${(i + firstName.length) * 0.06}s">${l}</span>
       </span>`
    ).join("")}
  </div>
`;
