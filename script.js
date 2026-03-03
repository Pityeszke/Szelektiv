const trash = document.getElementById("trash");
const bins = document.querySelectorAll(".bin");

const scoreDisplay = document.getElementById("score");
const errorDisplay = document.getElementById("errors");
const timeDisplay = document.getElementById("time");

let score = 0;
let errors = 0;
let timeLeft = 60;
let currentType = "";

// Típusok
const types = ["paper", "plastic", "metal", "mixed"];

// Színek
const colors = {
  paper: "blue",
  plastic: "gold",
  metal: "gray",
  mixed: "green"
};

// Új hulladék generálása
function generateTrash() {
  const randomType = types[Math.floor(Math.random() * types.length)];
  currentType = randomType;

  trash.style.backgroundColor = colors[randomType];
  trash.dataset.type = randomType;
}

// Drag esemény
trash.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", trash.dataset.type);
});

// Kukák eseményei
bins.forEach(bin => {
  bin.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  bin.addEventListener("drop", (e) => {
    e.preventDefault();
    const droppedType = e.dataTransfer.getData("text/plain");
    const binType = bin.dataset.type;
    const countDisplay = bin.querySelector(".count");

    if (droppedType === binType) {
      score++;
      scoreDisplay.textContent = score;

      countDisplay.textContent = parseInt(countDisplay.textContent) + 1;

      bin.style.backgroundColor = "lightgreen";
      setTimeout(() => bin.style.backgroundColor = "", 300);

      generateTrash();
    } else {
      errors++;
      errorDisplay.textContent = errors;

      bin.style.backgroundColor = "lightcoral";
      setTimeout(() => bin.style.backgroundColor = "", 300);
    }
  });
});

// Időzítő
const timer = setInterval(() => {
  timeLeft--;
  timeDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    trash.style.display = "none";
    alert(`Játék vége!\nPontszám: ${score}\nHibák: ${errors}`);
  }
}, 1000);

// Kezdés
generateTrash();
scoreDisplay.textContent = score;
errorDisplay.textContent = errors;
timeDisplay.textContent = timeLeft;