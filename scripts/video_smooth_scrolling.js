const gallery = document.getElementById("project_videos");

const videoTrack = document.querySelector(".video_track");
const infoTrack = document.querySelector(".project_info_track");

const counter = document.getElementById("project_tally");
const title = document.getElementById("project_title");
const category = document.getElementById("project_category");
const paragraph = document.getElementById("project_paragraph");

const videos = document.querySelectorAll(".gallery-video");

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
// CONFIG
// ===============================
const gap = 60;
const videoHeight = document.querySelector(".gallery-video").offsetHeight;
const itemHeight = videoHeight + gap;

const maxScroll = (videos.length - 1) * itemHeight;


// ===============================
// STATE
// ===============================
let currentY = 0;
let targetY = 0;
let lastIndex = -1;


// ===============================
// START VIDEOS
// ===============================
videos.forEach(v => {
    v.play().catch(() => {});
});


// ===============================
// WHEEL INPUT (SMOOTH CONTROL)
// ===============================
gallery.addEventListener("wheel", (e) => {
    e.preventDefault();

    // Increase responsiveness (this was your main issue)
    targetY += e.deltaY * 2.8;

    // Clamp scroll range
    targetY = Math.max(0, Math.min(targetY, maxScroll));

}, { passive: false });


// ===============================
// UPDATE UI
// ===============================
function updateUI(index) {
    const p = projects[index];

    counter.textContent = p.tally;
    title.textContent = p.title;
    category.textContent = p.category;
    paragraph.textContent = p.description;
}


// ===============================
// MAIN ANIMATION LOOP
// ===============================
function animate() {

    // Smooth interpolation (Lenis-style feel)
    currentY += (targetY - currentY) * 0.08;

    videoTrack.style.transform =
        `translateY(-${currentY}px)`;

    infoTrack.style.transform =
        `translateY(-${currentY}px)`;

    // Determine active slide index
    const index = Math.round(currentY / itemHeight);

    // Only update when index changes
    if (index !== lastIndex) {
        lastIndex = index;

        updateUI(index);

        // Sync video playback
        videos.forEach((v, i) => {
            if (i === index) {
                v.currentTime = 0;
                v.play().catch(() => {});
            } else {
                v.pause();
            }
        });
    }

    requestAnimationFrame(animate);
}


// ===============================
// INIT
// ===============================
updateUI(0);
animate();
