const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
let board;

function play() {
  board = new Board(ctx);
  draw();
}

function draw() {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  board.piece.draw();
}

// ========= Moves ================

const moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.UP]: (p) => board.rotate(p),
};

// ========= Events ================

document.addEventListener("keydown", (event) => {
  event.preventDefault();

  if (moves[event.keyCode]) {
    let p = moves[event.keyCode](board.piece);

    board.piece.move(p);

    draw();
  }

  return false;
});
