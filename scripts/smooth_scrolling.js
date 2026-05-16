const lenis = new Lenis({
  duration: 1.1,

  smoothWheel: true,
  smoothTouch: true,

  wheelMultiplier: 1.8,
  touchMultiplier: 2,

  easing: (t) => {
    return 1 - Math.pow(1 - t, 4);
  },
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
