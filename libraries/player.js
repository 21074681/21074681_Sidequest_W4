class Player {
  constructor(tileSize) {
    this.ts = tileSize;
    this.r = 0;
    this.c = 0;
  }

  tryMove(level, dr, dc) {
    const newR = this.r + dr;
    const newC = this.c + dc;

    // Stop moving outside grid
    if (newR < 0 || newR >= level.rows || newC < 0 || newC >= level.cols) {
      return false;
    }

    // Stop moving into walls
    if (level.isWall(newR, newC)) {
      return false;
    }

    this.r = newR;
    this.c = newC;

    return true;
  }

  draw() {
    fill(0, 120, 255);
    rect(this.c * this.ts, this.r * this.ts, this.ts, this.ts);
  }
}
