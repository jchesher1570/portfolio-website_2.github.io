const videos = document.querySelectorAll(".gallery-video");
const gallery = document.getElementById("project_videos");

let currentIndex = 0;
let scrolling = false;

function showVideo(index) {

  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
    video.classList.remove("active");
  });

  const activeVideo = videos[index];

  activeVideo.classList.add("active");

  activeVideo.play().catch(err => {
    console.log(err);
  });

  currentIndex = index;
}

// Start first video
showVideo(0);

gallery.addEventListener("wheel", (e) => {

  e.preventDefault();

  if (scrolling) return;

  scrolling = true;

  if (e.deltaY > 0) {
    currentIndex = (currentIndex + 1) % videos.length;
  } else {
    currentIndex =
      (currentIndex - 1 + videos.length) % videos.length;
  }

  showVideo(currentIndex);

  setTimeout(() => {
    scrolling = false;
  }, 500);

}, { passive: false });
