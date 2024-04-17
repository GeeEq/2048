let board;
let currentScore = 0;
let rows = 4;
let columns = 4;

const currentScoreElem = document.getElementById(`currentScore`);

const gameOverElem = document.getElementById("game-over");

// set timer

function startTime() {
  let timer;
  let sec = 0;

  let ele = document.getElementById(`game-timer`);
  timer = setInterval(() => {
    ele.innerHTML = `00:` + sec;
    sec++;
  }, 1000);
}

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
  setTwo();
  setTwo();
}

function ifEmpty() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}

// funkcija ant kiekvienos korteles turinciai nuline reiksme(boolean)

function setTwo() {
  if (!ifEmpty()) {
    return;
  }
  let found = false;

  // tikrina ar kortele tuscia/ random r c

  while (!found) {
    let r = Math.floor(Math.random() * rows); // skaiciau nuo 0 iki 4
    let c = Math.floor(Math.random() * columns); // same

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("currentScore").innerText = currentScore;
});

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  //[0,2,2,2]
  row = filterZero(row); // nuima nulines reiksmes[2.2.2]

  //slide
  for (let i = 0; i < row.length - 1; i++) {
    // tikrinam kiekviena dvejeta
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      currentScore += row[i];
      //[2,2,2] pereina i [4,0,2]
      console.log(slide);
    }
  }
  row = filterZero(row); //[4,2]

  //pridedam nulines reiksmes

  while (row.length < columns) {
    row.push(0);
    //[4,2,0,0]
  }
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    console.log(slideLeft);

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();

    board[r] = row;

    console.log(slideRight);

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function reload() {
  document.querySelector(`restart-btn`).click();
}
