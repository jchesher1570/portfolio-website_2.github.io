console.log("script loaded");

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // ELEMENTS
    // ===============================
    const gallery = document.getElementById("project_videos");

    const videoTrack = document.querySelector(".video_track");

    const title = document.getElementById("project_title");
    const category = document.getElementById("project_category");
    const paragraph = document.getElementById("project_paragraph");

    const projectNumber = document.getElementById("project_number");
    const projectTotal = document.getElementById("project_total");

    const videos = document.querySelectorAll(".gallery-video");

    // ===============================
    // DATA
    // ===============================
    const projects = [
        {
            title: "Zombified",
            category: "Personal Project / Full Stack",
            description: "A Pac-Man based JavaScript game, centred around zombies."
        },
        {
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

    // NEW
    let scrollDirection = 1;

    // ===============================
    // INITIALISE TALLY
    // ===============================
    projectTotal.textContent =
        String(projects.length).padStart(2, "0");

    // ===============================
    // WHEEL INPUT
    // ===============================
    window.addEventListener("wheel", (e) => {

        e.preventDefault();

        // NEW
        scrollDirection = e.deltaY > 0 ? 1 : -1;

        targetY += e.deltaY * 4;

    }, { passive: false });

    // ===============================
    // UI
    // ===============================
    function updateUI(index) {

        const p = projects[index];

        title.textContent = p.title;
        category.textContent = p.category;
        paragraph.textContent = p.description;

        // restart animation
        projectNumber.classList.remove(
            "number-up",
            "number-down"
        );

        void projectNumber.offsetWidth;

        projectNumber.textContent =
            String(index + 1).padStart(2, "0");

        projectNumber.classList.add(
            scrollDirection > 0
                ? "number-up"
                : "number-down"
        );
    }

    // ===============================
    // LOOP
    // ===============================
    function animate() {

        targetY = Math.max(
            0,
            Math.min(targetY, maxScroll)
        );

        currentY += (targetY - currentY) * 0.15;

        videoTrack.style.transform =
            `translateY(-${currentY}px)`;

        const index = Math.round(
            currentY / itemHeight
        );

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
    videos.forEach(v => {
        v.play().catch(() => {});
    });

    updateUI(0);

    animate();

});
