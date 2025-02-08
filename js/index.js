console.log("Welcom to Snack game");

let inputDir = { x: 0, y: 0 };

const foodSound = new Audio("eat.mp3");
const musicSound = new Audio("music1.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("turn.mp3");

let speed = 5;
let lastPaintTime = 0;
let snackArr = [{ x: 13, y: 15 }];
food = { x: 2, y: 15 };
let score = 0;

//game fns
function main(ctime) {
  window.requestAnimationFrame(main);
  //console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(snackArr) {
  //if u bump into youe self
  for (let i = 1; i < snackArr.length; i++) {
    if (snackArr[i].x === snackArr[0].x && snackArr[i].y === snackArr[0].y) {
      return true;
    }
  }
  //if u bump into wall
  if (
    snackArr[0].x >= 18 ||
    snackArr[0].x <= 0 ||
    snackArr[0].y >= 18 ||
    snackArr[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  //part 1:updating the snack array
  if (isCollide(snackArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over.Press any key to play again!");
    score = 0;
    snackArr = [{ x: 13, y: 15 }];
    musicSound.play();
  }

  //if u have eaten the food,increment the score and regenerate the food
  if (snackArr[0].y === food.y && snackArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscore) {
      hiscore = score;
      localStorage.setItem("highscore", JSON.stringify(hiscore));
      highscorebox.innerHTML = "Highscore:" + hiscore;
    }
    scorebox.innerHTML = "Score:" + score;
    snackArr.unshift({
      x: snackArr[0].x + inputDir.x,
      y: snackArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //moving the snack
  for (let i = snackArr.length - 2; i >= 0; i--) {
    // const element = array[i];
    snackArr[i + 1] = { ...snackArr[i] };
  }

  snackArr[0].x += inputDir.x;
  snackArr[0].y += inputDir.y;

  //part 2:display the snack and food
  //display the snack
  board.innerHTML = "";
  snackArr.forEach((e, index) => {
    snackElement = document.createElement("div");
    snackElement.style.gridRowStart = e.y;
    snackElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snackElement.classList.add("head");
    } else {
      snackElement.classList.add("snack");
    }

    board.appendChild(snackElement);
  });
  //display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
  hiscore = 0;
  localStorage.setItem("highscore", JSON.stringify(hiscore));
} else {
  hiscore = JSON.parse(highscore);
  highscorebox.innerHTML = "Highscore:" + highscore;
}
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start game
  musicSound.play();
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
