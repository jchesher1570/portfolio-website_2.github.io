// ===============================
// PROJECT DATA (single source of truth)
// ===============================
const projects = [
    {
        tally: "[ 01 / 02 ]",
        title: "Zombified",
        category: "Personal Project / Full Stack",
        description: "A Pac-Man based JavaScript game, centred around zombies."
    },
    {
        tally: "[ 02 / 02 ]",
        title: "2D Platformer",
        category: "Personal Project / Game Development",
        description: "A side-scrolling platform game featuring custom physics and AI."
    }
];


// ===============================
// DOM ELEMENTS
// ===============================
const gallery = document.getElementById("project_videos");
const track = document.querySelector(".video_track");
const videos = document.querySelectorAll(".gallery-video");

const counter = document.getElementById("project_tally");
const title = document.getElementById("project_title");
const category = document.getElementById("project_category");
const paragraph = document.getElementById("project_paragraph");


// ===============================
// STATE
// ===============================
let currentIndex = 0;
let scrolling = false;


// ===============================
// START VIDEOS PLAYING
// ===============================
videos.forEach(video => {
    video.play().catch(() => {
        // autoplay may be blocked until interaction
    });
});


// ===============================
// UI UPDATE FUNCTION (RIGHT SIDE)
// ===============================
function updateUI(index) {
    const project = projects[index];

    counter.textContent = project.tally;
    title.textContent = project.title;
    category.textContent = project.category;
    paragraph.textContent = project.description;
}


// ===============================
// MOVE CAROUSEL (LEFT + RIGHT SYNC POINT)
// ===============================
function moveTo(index) {

    const videoHeight = gallery.offsetHeight;
    const gap = 60; // must match CSS gap/margin

    const offset = index * (videoHeight + gap);

    // Move video track
    track.style.transform = `translateY(-${offset}px)`;

    currentIndex = index;

    // Sync text
    updateUI(index);

    // Reset + play active video
    videos.forEach((video, i) => {
        if (i === index) {
            video.currentTime = 0;
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    });
}


// ===============================
// INITIAL STATE
// ===============================
moveTo(0);


// ===============================
// MOUSE WHEEL NAVIGATION
// ===============================
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
