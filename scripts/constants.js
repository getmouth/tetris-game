const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
};

const COLORS = ["cyan", "blue", "orange", "yellow", "green", "purple", "red"];

const SHAPES = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
];

Object.freeze(KEY);
