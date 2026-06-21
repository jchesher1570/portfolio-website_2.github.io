const images = [
    "../images/laptop-android-zom.png",
    "../images/gourmet_gossip.PNG"
];

let currentIndex = 0;

const track = document.querySelector(".gallery_track");
const leftButton = document.getElementById("carousel_left");
const rightButton = document.getElementById("carousel_right");

function updateImage() {

    track.style.transform =
        `translateX(-${getTrackOffset(currentIndex)}px)`;

    const slides = track.querySelectorAll("img");

    slides.forEach((slide, index) => {

        slide.classList.remove(
            "current-slide",
            "next-slide",
            "previous-slide"
        );

        if (index === currentIndex) {
            slide.classList.add("current-slide");
        }

        if (index === (currentIndex + 1) % slides.length) {
            slide.classList.add("next-slide");
        }

        if (
            index ===
            (currentIndex - 1 + slides.length) % slides.length
        ) {
            slide.classList.add("previous-slide");
        }
    });
}

function getTrackOffset(index) {
    const width = document.querySelector(".gallery_viewport").clientWidth;
    const gap = parseFloat(getComputedStyle(track).gap);

    return index * (width + gap);
}

rightButton.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    updateImage();
});

leftButton.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    updateImage();
});

rightButton.addEventListener("mouseenter", () => {

    const previewAmount = 150;

    const offset = getTrackOffset(currentIndex);

    track.style.transform =
        `translateX(-${offset + previewAmount}px)`;

});

leftButton.addEventListener("mouseenter", () => {

    const previewAmount = 150;

    const offset = getTrackOffset(currentIndex);

    track.style.transform =
        `translateX(-${offset - previewAmount}px)`;

});

function resetPreview() {
    track.style.transform =
        `translateX(-${getTrackOffset(currentIndex)}px)`;
}

leftButton.addEventListener("mouseleave", resetPreview);
rightButton.addEventListener("mouseleave", resetPreview);
