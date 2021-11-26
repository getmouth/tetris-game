const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const canvasNext = document.getElementById("next");
const ctxNext = canvasNext.getContext("2d");

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctxNext.canvas.width = 8 * BLOCK_SIZE;
ctxNext.canvas.height = 8 * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
let board = new Board(ctx, ctxNext);

// ========= Score ================

let accountValues = {
  score: 0,
  lines: 0,
  level: 0,
};

let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  },
});

// ========= Methods ================
let requestId;

function play() {
  resetGame();
  // board = new Board(ctx, ctxNext);
  addEventListener();

  let piece = new Piece(ctx);

  board.piece = piece;

  if (requestId) {
    cancelAnimationFrame(requestId);
  }

  time.start = performance.now();
  animate();
}

function resetGame() {
  account.score = 0;
  account.lines = 0;
  account.level = 0;

  board = new Board(ctx, ctxNext);
  time = { start: performance.now(), elapsed: 0, level: LEVEL[0] };
}

function draw() {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  board.draw();
  board.piece.draw();
}

function gameOver() {
  cancelAnimationFrame(requestId);

  ctx.fillStyle = "black";
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = "1px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("GAME OVER", 1.8, 4);
}

function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
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

    if (!board.drop()) {
      gameOver();
      return;
    }
    // board.drop();
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  draw();

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
        account.score += POINTS.HARD_DROP;

        p = moves[KEY.DOWN](board.piece);
      }
    } else if (board.valid(p)) {
      board.piece.move(p);

      if (evt.keyCode === KEY.DOWN) {
        account.score += POINTS.SOFT_DROP;
      }
    }

    if (board.valid(p)) {
      board.piece.move(p);
    }
  }
}
