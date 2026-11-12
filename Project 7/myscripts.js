/*
Extreme Honeymoons
Project 7 - External JavaScript
*/

// Change a logo or print-button image.
function swapMe(imageId, filename) {
    const image = document.getElementById(imageId);

    if (image) {
        image.src = "Images/" + filename;
    }
}

// Adventure gallery images and descriptions.
const adventures = [
    {
        image: "Images/Image1Lg.jpg",
        title: "Mountain Biking Adventure",
        alt: "Mountain biking adventure"
    },
    {
        image: "Images/Image2Lg.jpg",
        title: "Scuba Diving Adventure",
        alt: "Scuba diving adventure"
    },
    {
        image: "Images/Image3Lg.jpg",
        title: "Snowboarding Adventure",
        alt: "Snowboarding adventure"
    },
    {
        image: "Images/Image4Lg.jpg",
        title: "Mountain Hiking Adventure",
        alt: "Mountain hiking adventure"
    }
];

// Display the selected adventure.
function swapImage(index) {
    const selected = adventures[index];
    const largeImage = document.getElementById("theImage");
    const caption = document.getElementById("bottomText");

    if (!selected || !largeImage || !caption) {
        return;
    }

    largeImage.src = selected.image;
    largeImage.alt = selected.alt;
    caption.textContent = selected.title;
}

// Preload gallery and rollover images.
function preloadImages() {
    const files = [
        "Images/logo1.svg",
        "Images/logo2.svg",
        "Images/print1.jpg",
        "Images/print2.jpg",
        ...adventures.map(item => item.image)
    ];

    files.forEach(function(file) {
        const image = new Image();
        image.src = file;
    });
}

// Prepare images when the page finishes loading.
window.addEventListener("DOMContentLoaded", function() {
    preloadImages();
});
