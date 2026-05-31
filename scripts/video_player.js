<script>
  const video = document.getElementById("zombie_demo_video");

  // Show first frame when page loads
  video.addEventListener("loadeddata", () => {
    video.pause();
    video.currentTime = 0;
  });

  // Play on hover
  video.addEventListener("mouseenter", () => {
    video.play();
  });

  // Pause and reset when hover ends
  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
</script>
