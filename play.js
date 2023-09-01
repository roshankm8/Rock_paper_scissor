const btnRules = document.querySelector(".rule");
const btnClose = document.querySelector(".cross");
const modalRules = document.querySelector(".modal");

const CHOICES = [{
        name: "paper",
        beats: "rock",
    },
    {
        name: "scissors",
        beats: "paper",
    },
    {
        name: "rock",
        beats: "scissors",
    },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector("#human_score");
let score = parseInt(localStorage.getItem("human_score"));
if (isNaN(score)) {
    score = 0;
    localStorage.setItem("human_score", 0);
}
keepScore(0);
const pcScore = document.querySelector("#pc_score");
let score1 = parseInt(localStorage.getItem("pc_score"));
if (isNaN(score1)) {
    score1 = 0;
    localStorage.setItem("pc_score", 0);
}

keepScore1(0);
// const refresh =

// Game Logic
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find((choice) => choice.name === choiceName);
        choose(choice);
    });
});

function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="./icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
        }, idx * 1000);
    });

    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());

        if (userWins) {
            resultText.innerText = "YOU WIN";

            resultDivs[0].classList.toggle("winner");
            showtrophy();
            keepScore(1);
        } else if (aiWins) {
            resultText.innerText = "YOU LOST";
            resultDivs[0].classList.toggle("winner");
            keepScore1(1);
        } else {
            resultText.innerText = "TIE UP";
        }
        resultWinner.classList.toggle("hidden");
        resultsDiv.classList.toggle("show-winner");
    }, 1000);

    function showtrophy() {
        window.location.href = "trophy.html";
    }
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function keepScore(point) {
    console.log(score, "f");
    score += point;
    console.log(score, "g");
    localStorage.setItem("human_score", score);
    scoreNumber.innerText = score;
}

function keepScore1(point) {
    score1 += point;
    localStorage.setItem("pc_score", score1);
    pcScore.innerText = score1;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");

    resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
});
btnRules.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
});