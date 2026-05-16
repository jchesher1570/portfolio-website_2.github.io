const lenis = new Lenis({
  duration: 0.5,

  smoothWheel: true,
  smoothTouch: true,

  wheelMultiplier: 1.5,
  touchMultiplier: 1.8,

  easing: (t) => {
    return 1 - Math.pow(1 - t, 4);
  },
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
