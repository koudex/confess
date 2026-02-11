document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".header-text").innerHTML = config.headerText;
    document.querySelector(".yes-header-text").innerHTML = config.yesHeaderText;
    document.querySelector(".gif").src = config.gifURL;
    document.querySelector(".yes-gif").src = config.yesGifURL;

    // Get audio element and set up
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.src = config.musicURL;
    backgroundMusic.volume = config.musicVolume;
    backgroundMusic.preload = "auto";

    // Pause music when window loses focus
    document.addEventListener("visibilitychange", function() {
        if (document.hidden && !backgroundMusic.paused) {
            backgroundMusic.pause();
        }
    });

    let messageIndex = 0;

    document.querySelector(".no-button").addEventListener("click", function () {
        this.textContent = config.messages[messageIndex];
        messageIndex = (messageIndex + 1) % config.messages.length;

        const yesButton = document.querySelector(".yes-button");
        const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
        yesButton.style.fontSize = `${currentSize * 1.5}px`;
    });

    document.querySelector(".yes-button").addEventListener("click", function () {
        document.querySelector(".yes-container").style.display = "flex";
        document.querySelector(".container").style.display = "none";
        
        // Play music only when yes is clicked
        backgroundMusic.play().catch(e => {
            console.log("Autoplay prevented:", e);
            // If autoplay is prevented, show a message or handle it
        });
    });
    
    // Optional: Add play button to yes container in case autoplay is blocked
    document.querySelector(".yes-container").addEventListener("click", function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        }
    });
});