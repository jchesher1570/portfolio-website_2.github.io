const gallery = document.getElementById("project_videos");
const track = document.querySelector(".video_track");
const videos = document.querySelectorAll(".gallery-video");

let currentIndex = 0;
let scrolling = false;

videos.forEach(video => video.play());

function moveTo(index) {

    const videoHeight = gallery.offsetHeight;

    track.style.transform =
        `translateY(-${index * videoHeight}px)`;

    currentIndex = index;
}

gallery.addEventListener("wheel", (e) => {

    e.preventDefault();

    if (scrolling) return;

    scrolling = true;

    if (e.deltaY > 0 && currentIndex < videos.length - 1) {
        moveTo(currentIndex + 1);
    }

    if (e.deltaY < 0 && currentIndex > 0) {
        moveTo(currentIndex - 1);
    }

    setTimeout(() => {
        scrolling = false;
    }, 800);

}, { passive: false });
