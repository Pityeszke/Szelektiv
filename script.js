const trash = document.getElementById("trash");
const bins = document.querySelectorAll(".bin");
const scoreDisplay = document.getElementById("score");
const errorDisplay = document.getElementById("errors");
const timeDisplay = document.getElementById("time");

let score = 0;
let errors = 0;
let timeLeft = 60;
let currentType = "";

const types = ["paper", "plastic", "metal", "mixed"];
const colors = {
    paper: "blue",
    plastic: "yellow",
    metal: "gray",
    mixed: "green"
};

function randomTrash() {
    currentType = types[Math.floor(Math.random() * types.length)];
    trash.style.backgroundColor = colors[currentType];
}

trash.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", currentType);
});

bins.forEach(bin => {
    bin.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    bin.addEventListener("drop", (e) => {
        e.preventDefault();
        const binType = bin.getAttribute("data-type");

        if (binType === currentType) {
            score++;
            scoreDisplay.textContent = score;

            const countDisplay = bin.querySelector(".count");
            countDisplay.textContent = parseInt(countDisplay.textContent) + 1;

            bin.classList.add("feedback-correct");
            setTimeout(() => bin.classList.remove("feedback-correct"), 300);
        } else {
            errors++;
            errorDisplay.textContent = errors;

            bin.classList.add("feedback-wrong");
            setTimeout(() => bin.classList.remove("feedback-wrong"), 300);
        }

        randomTrash();
    });
});

function startTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    trash.style.display = "none";
    alert("Játék vége!\nPontszám: " + score + "\nHibák: " + errors);
}

randomTrash();
startTimer();