const gallery = document.getElementById("project_videos");
const videoTrack = document.querySelector(".video_track");
const infoTrack = document.querySelector(".project_info_track");
const videos = document.querySelectorAll(".gallery-video");

let currentIndex = 0;
let scrolling = false;

videos.forEach(video => video.play());

function moveTo(index) {

    const videoHeight = gallery.offsetHeight;
    const gap = 60; // Match your CSS gap

    const offset = index * (videoHeight + gap);

    videoTrack.style.transform =
        `translateY(-${offset}px)`;

    infoTrack.style.transform =
        `translateY(-${offset}px)`;

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
