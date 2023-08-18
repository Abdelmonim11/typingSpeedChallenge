// arrrays of words
let words = {
  Easy: [
    "random",
    "title",
    "Nile",
    "Gasim",
    "red",
    "green",
    "zone",
    "qatar",
    "array",
  ],
  Normal: [
    "member",
    "hyper",
    "india",
    "sudan",
    "value",
    "window",
    "victory",
    "message",
    "madani",
    "yellow",
  ],
  Hard: [
    "programming",
    "Liverpool",
    "Khartoum",
    "question",
    "section",
    "downtown",
    "restrunt",
    "technology",
  ],
};

// levels and thire time object
const levelsObj = {
  Easy: 6,
  Normal: 5,
  Hard: 4,
};

// get elements
let levelsList = document.querySelector(".levels ul"),
  levels = document.querySelectorAll(".levels ul li"),
  startGameBtn = document.querySelector(".start"),
  container = document.querySelector(".container"),
  theWord = document.querySelector(".the-word"),
  input = document.querySelector("input"),
  overlay = document.getElementById("overlay"),
  instruction = document.querySelector(".instruction"),
  arrayLengthSpan = document.querySelector(".wordsNumber"),
  result = document.querySelector(".result"),
  currentLevel = document.querySelector(".current-level"),
  nextWordBox = document.querySelector(".next-words"),
  period = document.querySelector(".period"),
  timeLeft = document.querySelector(".time > span"),
  totalScore = document.querySelector(".total"),
  // set default level
  defaultLevel = "Easy",
  defaultLevelSeconds = levelsObj[defaultLevel];

// set time, time left and total
period.innerHTML = defaultLevelSeconds;
timeLeft.innerHTML = defaultLevelSeconds;
totalScore.innerHTML = words[defaultLevel].length;
arrayLengthSpan.innerHTML = words[defaultLevel].length;

// prevent pasting on input feild
input.onpaste = () => {
  return false;
};

// show levels list
currentLevel.onclick = () => {
  levelsList.classList.toggle("show");
  // prevent a glitch
  if (levelsList.classList.contains("show")) {
    startGameBtn.style.pointerEvents = "none";
  } else {
    startGameBtn.style.pointerEvents = "auto";
  }
};

// select level function
document.onclick = (e) => {
  if (e.target.classList.contains("level")) {
    removeActive();
    currentLevel.innerHTML = e.target.innerHTML;
    levelsList.classList.toggle("show");
    e.target.classList.add("active");
    levelsList.style.display = "none";
    defaultLevel = e.target.innerHTML;
    defaultLevelSeconds = levelsObj[defaultLevel];
    totalScore.innerHTML = words[defaultLevel].length;
    arrayLengthSpan.innerHTML = words[defaultLevel].length;

    // prevent a glitch
    if (levelsList.classList.contains("show")) {
      startGameBtn.style.pointerEvents = "none";
    } else {
      startGameBtn.style.pointerEvents = "auto";
    }

    // set time, time left and total
    period.innerHTML = defaultLevelSeconds;
    timeLeft.innerHTML = defaultLevelSeconds;
  }
};
// remove active from all levels
function removeActive() {
  levels.forEach((level) => {
    level.classList.remove("active");
  });
}

function generateWords() {
  // generate words from array to next word box
  nextWordBox.innerHTML = "";
  nextWordBox.style.display = "flex";
  instruction.style.display = "none";
  words[defaultLevel].forEach((word) => {
    let div = document.createElement("div");
    div.innerHTML = word;
    nextWordBox.appendChild(div);
  });
}

// start game function
startGameBtn.onclick = countDown;

function startGame() {
  generateWords();
  timeLeft.innerHTML = defaultLevelSeconds;
  startGameBtn.remove();
  randomWordFun();

  let count = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML == 0) {
      clearInterval(count);
      if (
        input.value.toLocaleLowerCase() == theWord.innerHTML.toLocaleLowerCase()
      ) {
        document.querySelector(".success").play();
        input.value = "";
        words[defaultLevel].splice(
          words[defaultLevel].indexOf(theWord.innerHTML),
          1
        );
        result.innerHTML++;

        if (result.innerHTML == totalScore.innerHTML) {
          // victory event
          input.classList.add("gameRun"); // exiting input
          finish();
        } else {
          startGame();
        }
      } else {
        document.querySelector(".feild").play();
        input.classList.add("gameRun"); // exiting input
        finish();
      }
    }
  }, 1000);
}

// get random word from array of words
function randomWordFun() {
  let randomWord =
    words[defaultLevel][Math.floor(Math.random() * words[defaultLevel].length)];
  theWord.innerHTML = randomWord;
}

// before game start countdown
function countDown() {
  input.focus(); // auto focus on inout feild
  currentLevel.classList.add("gameRun"); // prevent click while game running
  startGameBtn.innerHTML = "3";
  setInterval(() => {
    startGameBtn.innerHTML--;
    if (startGameBtn.innerHTML == 0) {
      startGame();
    }
  }, 1000);
}

// finish function
function finish() {
  let div = document.createElement("div"),
    span = document.createElement("span"),
    playAgain = document.createElement("button");
  div.classList.add("finish");
  playAgain.classList.add("finishBtn");
  if (result.innerHTML == totalScore.innerHTML) {
    playAgain.innerHTML = "Play Again";
    span.append(document.createTextNode("You Done Great Bro (:"));
  } else {
    playAgain.innerHTML = "Try Again";
    span.append(document.createTextNode("Game Over"));
  }
  div.appendChild(span);
  div.appendChild(playAgain);
  container.appendChild(div);
  nextWordBox.remove();
  // play again button function
  document.querySelector(".finish > button").addEventListener("click", () => {
    window.location.reload();
  });
  // make overlay effect
  overlay.classList.add("overlay");
}
