class Level {
  constructor(grid, tileSize) {
    this.grid = grid;
    this.ts = tileSize;

    this.rows = grid.length;
    this.cols = grid[0].length;

    this.start = this.findStart();
  }

  findStart() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c] === 2) {
          return { r: r, c: c };
        }
      }
    }
  }

  draw() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const tile = this.grid[r][c];

        if (tile === 1) {
          fill(50); // wall
        } else if (tile === 3) {
          fill(0, 200, 0); // goal
        } else {
          fill(220); // floor
        }

        rect(c * this.ts, r * this.ts, this.ts, this.ts);
      }
    }
  }

  isWall(r, c) {
    return this.grid[r][c] === 1;
  }

  isGoal(r, c) {
    return this.grid[r][c] === 3;
  }

  pixelWidth() {
    return this.cols * this.ts;
  }

  pixelHeight() {
    return this.rows * this.ts;
  }
}
