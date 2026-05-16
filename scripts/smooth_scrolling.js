const lenis = new Lenis({
  duration: 1.8,
  smoothWheel: true,
  smoothTouch: true,
  touchMultiplier: 1.5,

  easing: (t) => {
    return 1 - Math.pow(1 - t, 4);
  },
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
