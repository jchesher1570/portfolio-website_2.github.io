const gallery = document.getElementById("project_videos");
const track = document.querySelector(".video_track");

let currentY = 0;
let targetY = 0;

gallery.addEventListener("wheel", (e) => {
    e.preventDefault();

    targetY += e.deltaY * 0.8;

    const maxScroll =
        track.scrollHeight - gallery.offsetHeight;

    targetY = Math.max(
        0,
        Math.min(targetY, maxScroll)
    );

}, { passive: false });

function animate() {

    currentY += (targetY - currentY) * 0.08;

    track.style.transform =
        `translateY(-${currentY}px)`;

    requestAnimationFrame(animate);
}

animate();
