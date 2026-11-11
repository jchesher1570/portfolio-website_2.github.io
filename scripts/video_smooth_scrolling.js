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

    const projectText = document.getElementById("project_text");

    const projectLink = document.getElementById("project_link");
    const videoLink = document.getElementById("video_link");

    const scrollbar = document.getElementById("project_scrollbar");
    const scrollbarThumb = document.getElementById("project_scrollbar_thumb");

    // ===============================
    // DATA
    // ===============================
    const projects = [
    {
        title: "Zombified",
        category: "Personal Project / Full Stack",
        description: "A Pac-Man based JavaScript game, centred around zombies.",
        url: "./zombified.html"
    },
    {
        title: "2D Platformer",
        category: "Personal Project / Game Development",
        description: "A side-scrolling platform game featuring custom physics and AI.",
        url: "./2d_platformer.html"
    }
];

    // ===============================
    // CONFIG
    // ===============================
    const itemHeight = videos[0].offsetHeight + (window.innerHeight * 0.4);
    const maxScroll = (videos.length - 1) * itemHeight;
    const snapToItem = (y) => {
        return Math.round(y / itemHeight) * itemHeight;
    };

    // ===============================
    // STATE
    // ===============================
    let currentY = 0;
    let targetY = 0;
    let lastIndex = -1;
    let isFading = false;
    let scrollDirection = 1;
    let isInitialFrame = true;

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
    
        if (isDraggingScrollbar || e.deltaY === 0) {
            return;
        }
    
        scrollDirection = e.deltaY > 0 ? 1 : -1;
    
        targetY += scrollDirection * itemHeight;
    
        targetY = snapToItem(
            Math.max(
                0,
                Math.min(targetY, maxScroll)
            )
        );
    
    }, { passive: false });

    // ===============================
    // SCROLLBAR STATE
    // ===============================
    
    let isDraggingScrollbar = false;
    
    // Height of thumb as a percentage of track
    const thumbHeightPercent = 20;
    
    scrollbarThumb.style.height =
        `${thumbHeightPercent}%`;
    
    // Calculate available thumb travel
    function getThumbTravel() {
        return scrollbar.clientHeight -
            scrollbarThumb.offsetHeight;
    }

    // ===============================
    // UPDATE SCROLLBAR POSITION
    // ===============================
    
    function updateScrollbar() {
    
        const progress = maxScroll > 0
            ? Math.max(0, Math.min(currentY / maxScroll, 1))
            : 0;
    
        const thumbTravel = getThumbTravel();
    
        const thumbY = progress * thumbTravel;
    
        scrollbarThumb.style.transform =
            `translateY(${thumbY}px)`;
    
        const index = Math.min(
            videos.length - 1,
            Math.max(0, Math.round(currentY / itemHeight))
        );
    
        scrollbar.setAttribute(
            "aria-valuenow",
            String(index + 1)
        );
    }

    // ===============================
    // SCROLLBAR INTERACTION
    // ===============================
    
    // Convert pointer position into carousel position
    function scrollToPointer(clientY) {
    
        const rect = scrollbar.getBoundingClientRect();
    
        const thumbTravel = getThumbTravel();
    
        if (thumbTravel <= 0 || maxScroll <= 0) {
            return;
        }
    
        // Centre thumb on pointer
        let thumbY =
            clientY - rect.top -
            scrollbarThumb.offsetHeight / 2;
    
        thumbY = Math.max(
            0,
            Math.min(thumbY, thumbTravel)
        );
    
        const progress = thumbY / thumbTravel;
    
        const newTargetY = snapToItem(
            progress * maxScroll
        );
    
        scrollDirection =
            newTargetY >= targetY ? 1 : -1;
    
        targetY = Math.max(
            0,
            Math.min(newTargetY, maxScroll)
        );
    }
    
    // Begin dragging
    scrollbar.addEventListener("pointerdown", (e) => {
    
        if (e.button !== 0) return;
    
        isDraggingScrollbar = true;
    
        scrollbar.setPointerCapture(e.pointerId);
    
        scrollToPointer(e.clientY);
    
        e.preventDefault();
    });
    
    // Drag scrollbar
    scrollbar.addEventListener("pointermove", (e) => {
    
        if (!isDraggingScrollbar) return;
    
        scrollToPointer(e.clientY);
    });
    
    // Stop dragging
    function stopScrollbarDrag() {
        isDraggingScrollbar = false;
    }
    
    scrollbar.addEventListener(
        "pointerup",
        stopScrollbarDrag
    );
    
    scrollbar.addEventListener(
        "pointercancel",
        stopScrollbarDrag
    );
    
    // Keyboard navigation
    scrollbar.addEventListener("keydown", (e) => {
    
        let nextTarget = targetY;
    
        switch (e.key) {
            case "ArrowDown":
            case "PageDown":
                nextTarget += itemHeight;
                break;
    
            case "ArrowUp":
            case "PageUp":
                nextTarget -= itemHeight;
                break;
    
            case "Home":
                nextTarget = 0;
                break;
    
            case "End":
                nextTarget = maxScroll;
                break;
    
            default:
                return;
        }
    
        e.preventDefault();
    
        scrollDirection =
            nextTarget >= targetY ? 1 : -1;
    
        targetY = Math.max(
            0,
            Math.min(nextTarget, maxScroll)
        );
    });


    // ===============================
    // UI
    // ===============================
    function updateUI(index, animateNumber = true) {

    const p = projects[index];

    if (isFading) return;
    isFading = true;

    projectText.style.opacity = 0;

    setTimeout(() => {

        title.textContent = p.title;
        projectLink.href = p.url;
        videoLink.href = p.url;
        category.textContent = p.category;
        paragraph.textContent = p.description;

        requestAnimationFrame(() => {

            projectText.style.opacity = 1;

            isFading = false;

        });

    }, 200);

    // Always update the number
    projectNumber.textContent =
        String(index + 1).padStart(2, "0");

    // Only animate when requested
    if (animateNumber) {

        projectNumber.classList.remove(
            "number-up",
            "number-down"
        );

        void projectNumber.offsetWidth;

        projectNumber.classList.add(
            scrollDirection > 0
                ? "number-up"
                : "number-down"
        );
    }
}

    // ===============================
    // LOOP
    // ===============================
    function animate() {

        targetY = snapToItem(
        Math.max(0, Math.min(targetY, maxScroll))
    );

    if (!isInitialFrame) {
        currentY += (targetY - currentY) * 0.15;
    } else {
        currentY = targetY;
        isInitialFrame = false;
    }

    videoTrack.style.transform =`translateY(calc(-${currentY}px + 76vh))`;

    // Synchronise scrollbar with video position
    updateScrollbar();

    const index = Math.min(
        videos.length - 1,
        Math.max(0, Math.round(currentY / itemHeight))
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
    requestAnimationFrame(() => {

        videoTrack.style.transform = `translateY(calc(0px + 76vh))`;

        updateUI(0, false);
        lastIndex = 0;

        videos.forEach((v, i) => {
            if (i === 0) {
                v.currentTime = 0;
                v.play().catch(() => {});
            } else {
                v.pause();
            }
        });

        requestAnimationFrame(() => {

            videoTrack.style.transition = "transform 0.8s cubic-bezier(.22,.61,.36,1)";

            animate();

        });

    });
});
