const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
let board = new Board(ctx);

// ========= Methods ================
let requestId;

function play() {
  addEventListener();

  let piece = new Piece(ctx);

  board.piece = piece;

  if (requestId) {
    cancelAnimationFrame(requestId);
  }

  time.start = performance.now();
  animate();
}

function draw() {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  board.piece.draw();
}

function drop() {
  let p = moves[KEY.DOWN](board.piece);

  if (board.valid(p)) {
    board.piece.move(p);
    draw();
  }
}

// ========= Moves ================

const moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.UP]: (p) => board.rotate(p),
  [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
};

//=========== Animation ===========/

let time = { start: 0, elapsed: 0, level: 1000 };

function animate(now = 0) {
  time.elapsed = now - time.start;

  if (time.elapsed > time.level) {
    time.start = now;
    drop();
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  board.piece.draw();

  requestId = requestAnimationFrame(animate);
}

// ========= Events ================

function addEventListener() {
  document.removeEventListener("keydown", handleKeyPress);
  document.addEventListener("keydown", handleKeyPress);
}

function handleKeyPress(evt) {
  evt.preventDefault();

  if (moves[evt.keyCode]) {
    let p = moves[evt.keyCode](board.piece);

    if (evt.keyCode === KEY.SPACE) {
      while (board.valid(p)) {
        board.piece.move(p);

        p = moves[KEY.SPACE](board.piece);
      }
    }

    if (board.valid(p)) {
      board.piece.move(p);
      draw();
    }
  }
}
