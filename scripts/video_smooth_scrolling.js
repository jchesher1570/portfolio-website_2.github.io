console.log("script loaded");

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // ELEMENTS (MUST COME FIRST)
    // ===============================
    const gallery = document.getElementById("project_videos");

    const videoTrack = document.querySelector(".video_track");
    const infoTrack = document.querySelector(".project_info_track");

    const counter = document.getElementById("project_tally");
    const title = document.getElementById("project_title");
    const category = document.getElementById("project_category");
    const paragraph = document.getElementById("project_paragraph");

    const videos = document.querySelectorAll(".gallery-video");

    // ===============================
    // DATA
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
    // CONFIG
    // ===============================
    const gap = 60;
    const videoHeight = 600;
    const itemHeight = videoHeight + gap;
    const maxScroll = (videos.length - 1) * itemHeight;

    // ===============================
    // STATE
    // ===============================
    let currentY = 0;
    let targetY = 0;
    let lastIndex = -1;

    // ===============================
    // WHEEL INPUT
    // ===============================
    window.addEventListener("wheel", (e) => {
        e.preventDefault();
        targetY += e.deltaY * 4;
    }, { passive: false });

    // ===============================
    // UI
    // ===============================
    function updateUI(index) {
        const p = projects[index];

        counter.textContent = p.tally;
        title.textContent = p.title;
        category.textContent = p.category;
        paragraph.textContent = p.description;
    }

    // ===============================
    // LOOP
    // ===============================
    function animate() {

        targetY = Math.max(0, Math.min(targetY, maxScroll));

        currentY += (targetY - currentY) * 0.15;

        videoTrack.style.transform =
            `translateY(-${currentY}px)`;

        const index = Math.round(currentY / itemHeight);

        if (index !== lastIndex) {
            lastIndex = index;

            updateUI(index);

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
    videos.forEach(v => v.play().catch(() => {}));

    updateUI(0);
    animate();
});
