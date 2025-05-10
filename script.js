// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const levelDisplay = document.getElementById("level");
const muteBtn = document.getElementById("muteBtn");

let score = 0;
let highScore = localStorage.getItem("pattotiHighScore") || 0;
let level = 1;
let angle = 0;
let speed = 0.02;
let isMuted = false;
let audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_92c3b86dc0.mp3?filename=happy-beat-11053.mp3");
audio.loop = true;
audio.volume = 0.5;
audio.play();

canvas.width = 600;
canvas.height = 600;

function drawShawarma() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);
  ctx.fillStyle = "#d2691e";
  ctx.fillRect(-25, -150, 50, 300);
  ctx.restore();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2);
  ctx.fillStyle = "#ffcc00";
  ctx.fill();
}

function gameLoop() {
  drawShawarma();
  angle += speed;
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", sliceShawarma);
canvas.addEventListener("touchstart", sliceShawarma);

function sliceShawarma() {
  score += 1;
  if (score % 10 === 0) {
    level += 1;
    speed += 0.005;
  }
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("pattotiHighScore", highScore);
  }
  highScoreDisplay.textContent = highScore;
}

muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  audio.muted = isMuted;
  muteBtn.textContent = isMuted ? "Unmute" : "Mute";
});

// Initialize display
highScoreDisplay.textContent = highScore;
gameLoop();