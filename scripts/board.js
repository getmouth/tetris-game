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

  valid(p) {
    return p.shape.every((row, y) => {
      return row.every(
        (value, x) => value === 0 || this.isInsideWalls(p.x + x, p.y + y)
      );
    });
  }

  isInsideWalls(x, y) {
    return (
      x >= 0 && // Left wall
      x < COLS && // Right wall
      y < ROWS // Bottom wall
    );
  }
}
