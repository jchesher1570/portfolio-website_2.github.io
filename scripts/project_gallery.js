const images = [
    "../images/laptop-android-zom.png",
    "../images/gourmet_gossip.PNG"
];

let currentIndex = 0;

const galleryImage = document.getElementById("gallery_image");
const leftButton = document.getElementById("carousel_left");
const rightButton = document.getElementById("carousel_right");

function updateImage() {
    galleryImage.src = images[currentIndex];
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
