const choices = ["rock", "paper", "scissors"];

const icons = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️"
};

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const resultEl = document.getElementById("result");
const roundEl = document.getElementById("round");
const resetBtn = document.getElementById("reset-btn");
const confettiEl = document.getElementById("confetti");

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getWinner(player, computer) {
  if (player === computer) return "draw";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }

  return "lose";
}

function updateDisplay(player, computer, outcome) {
  playerChoiceEl.textContent = icons[player];
  computerChoiceEl.textContent = icons[computer];

  playerChoiceEl.classList.remove("pop");
  computerChoiceEl.classList.remove("pop");

  void playerChoiceEl.offsetWidth;
  void computerChoiceEl.offsetWidth;

  playerChoiceEl.classList.add("pop");
  computerChoiceEl.classList.add("pop");

  resultEl.className = `result ${outcome}`;

  if (outcome === "win") {
    resultEl.textContent = "You win! 🎉";
  } else if (outcome === "lose") {
    resultEl.textContent = "Computer wins!";
  } else {
    resultEl.textContent = "It's a draw!";
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function playRound(playerChoice) {
  if (gameOver) return;

  const computerChoice = getComputerChoice();
  const outcome = getWinner(playerChoice, computerChoice);

  if (outcome === "win") {
    playerScore++;
  } else if (outcome === "lose") {
    computerScore++;
  }

  updateDisplay(playerChoice, computerChoice, outcome);

  if (playerScore === 5 || computerScore === 5) {
    gameOver = true;

    if (playerScore === 5) {
      resultEl.textContent = "🏆 You won the game!";
      roundEl.textContent = "Amazing! Hit Reset to play again.";
      createConfetti();
    } else {
      resultEl.textContent = "💻 Computer won the game!";
      roundEl.textContent = "Good game! Hit Reset to try again.";
    }
  } else {
    roundEl.textContent = `First to 5 wins • ${playerScore + computerScore + 1} rounds`;
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  gameOver = false;

  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  playerChoiceEl.textContent = "?";
  computerChoiceEl.textContent = "?";
  resultEl.className = "result";
  resultEl.textContent = "Make your move!";
  roundEl.textContent = "First to 5 wins";
}

function createConfetti() {
  confettiEl.innerHTML = "";

  for (let i = 0; i < 90; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.setProperty("--x", `${(Math.random() - 0.5) * 300}px`);
    piece.style.animationDelay = `${Math.random() * 0.7}s`;
    piece.style.background = `hsl(${Math.random() * 360}, 90%, 65%)`;
    confettiEl.appendChild(piece);
  }

  setTimeout(() => {
    confettiEl.innerHTML = "";
  }, 2600);
}

document.querySelectorAll(".choice-btn").forEach(button => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice);
  });
});

resetBtn.addEventListener("click", resetGame);
