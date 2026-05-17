  const navLinks = document.querySelectorAll(
    ".nav_link_home, .nav_link"
  );

  navLinks.forEach(link => {
    link.addEventListener("click", () => {

      /* Remove active class from all links */
      navLinks.forEach(item => {
        item.classList.remove("active");
      });

      /* Add active class to clicked link */
      link.classList.add("active");
    });
  });
