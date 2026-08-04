const images = [
    "../images/zombie_start_screen_2.png",
    "../images/zombie_early_stage.png",
    "../images/zombie_action_screenshot.png",
    "../images/zombie_powerup_chase.png",
    "../images/zombie_blue_stage.png",
    "../images/zombie_yellow_stage.png",
    "../images/zombie_upwards_run.png",
    "../images/zombie_death_screen_2.png"
];

let currentIndex = 0;

const track = document.querySelector(".gallery_track");
const leftButton = document.getElementById("carousel_left");
const rightButton = document.getElementById("carousel_right");
const indicatorsContainer = document.querySelector(".carousel_indicators");

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

        if (index === currentIndex + 1) {
            slide.classList.add("next-slide");
        }

        if (index === currentIndex - 1) {
            slide.classList.add("previous-slide");
        }
    });

    updateButtons();
    updateIndicators();
}

function getTrackOffset(index) {
    const width = document.querySelector(".gallery_viewport").clientWidth;
    const gap = parseFloat(getComputedStyle(track).gap);

    return index * (width + gap);
}

rightButton.addEventListener("click", () => {

    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateImage();
    }

});

leftButton.addEventListener("click", () => {

    if (currentIndex > 0) {
        currentIndex--;
        updateImage();
    }

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

function updateButtons() {

    leftButton.style.visibility = "visible";
    rightButton.style.visibility = "visible";

    leftButton.style.display =
        currentIndex === 0 ? "none" : "block";

    rightButton.style.display =
        currentIndex === images.length - 1 ? "none" : "block";
}

function createIndicators() {

    indicatorsContainer.innerHTML = "";

    images.forEach((_, index) => {

        const indicator = document.createElement("div");

        indicator.classList.add("carousel_indicator");

        indicator.innerHTML = `
            <svg viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="7" />
            </svg>
        `;

        indicator.addEventListener("click", () => {

            currentIndex = index;
            updateImage();

        });

        indicatorsContainer.appendChild(indicator);

    });

}

function updateIndicators() {

    const indicators =
        document.querySelectorAll(".carousel_indicator");

    indicators.forEach((indicator, index) => {

        indicator.classList.toggle(
            "active",
            index === currentIndex
        );

    });

}

createIndicators();
updateImage();
