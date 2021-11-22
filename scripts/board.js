class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.getEmptyBoard();
    this.piece = new Piece(ctx);
  }

  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  rotate(p) {
    let clone = JSON.parse(JSON.stringify(p));
    // let clone = { ...p };

    for (let y = 0; y < clone.shape.length; y++) {
      for (let x = 0; x < y; x++) {
        [clone.shape[x][y], clone.shape[y][x]] = [
          clone.shape[y][x],
          clone.shape[x][y],
        ];
      }
    }

    clone.shape.forEach((row) => row.reverse());

    return clone;
  }
}
