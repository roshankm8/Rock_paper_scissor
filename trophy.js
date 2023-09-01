document.addEventListener("DOMContentLoaded", () => {
    const playAgainLink = document.querySelector(".play-again");

    playAgainLink.addEventListener("click", () => {
        if (playerHasWon) {
            // Reset the game if the player has won
            window.location.href = "index.html";
        } else {
            // Handle other cases or actions as needed
        }
    });
});