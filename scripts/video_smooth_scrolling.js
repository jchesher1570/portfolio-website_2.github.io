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

// -------------------------
// STATE
// -------------------------
let currentY = 0;
let targetY = 0;

// IMPORTANT: must match CSS
const itemHeight = gallery.offsetHeight + 60; // height + gap

// -------------------------
// PLAY VIDEOS
// -------------------------
videos.forEach(v => v.play().catch(() => {}));

// -------------------------
// WHEEL INPUT (SMOOTH TARGET)
// -------------------------
gallery.addEventListener("wheel", (e) => {
    e.preventDefault();

    targetY += e.deltaY * 1; // sensitivity

    const maxScroll =
        (videos.length - 1) * itemHeight;

    targetY = Math.max(0, Math.min(targetY, maxScroll));

}, { passive: false });

// -------------------------
// UI UPDATE BASED ON POSITION
// -------------------------
function updateUI(index) {
    const p = projects[index];

    counter.textContent = p.tally;
    title.textContent = p.title;
    category.textContent = p.category;
    paragraph.textContent = p.description;
}

// -------------------------
// ANIMATION LOOP
// -------------------------
function animate() {

    // smooth lerp
    currentY += (targetY - currentY) * 0.08;

    videoTrack.style.transform =
        `translateY(-${currentY}px)`;

    infoTrack.style.transform =
        `translateY(-${currentY}px)`;

    // determine active index
    const index = Math.round(currentY / itemHeight);

    // sync UI only when changed
    if (index !== window._lastIndex) {
        window._lastIndex = index;
        updateUI(index);

        // control video playback
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

animate();
