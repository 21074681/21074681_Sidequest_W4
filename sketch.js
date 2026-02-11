/*
Week 4 — Example 4: Playable Maze (JSON + Level class + Player class)
GBDA302
*/

const TS = 32;

let levelsData;
let levels = [];
let currentLevel = 0;

let level;
let player;

function preload() {
  levelsData = loadJSON("levels.json");
}

function setup() {
  levels = levelsData.levels.map((grid) => new Level(grid, TS));

  player = new Player(TS);

  loadLevel(0);

  noStroke();
  textFont("sans-serif");
  textSize(14);
}

function draw() {
  background(240);

  level.draw();
  player.draw();

  drawHUD();
}

function drawHUD() {
  fill(0);
  text(`Level ${currentLevel + 1}/${levels.length} — WASD / Arrows`, 10, 16);
}

function keyPressed() {
  let dr = 0;
  let dc = 0;

  if (keyCode === LEFT_ARROW || key === "a" || key === "A") dc = -1;
  else if (keyCode === RIGHT_ARROW || key === "d" || key === "D") dc = 1;
  else if (keyCode === UP_ARROW || key === "w" || key === "W") dr = -1;
  else if (keyCode === DOWN_ARROW || key === "s" || key === "S") dr = 1;
  else return;

  const moved = player.tryMove(level, dr, dc);

  if (moved && level.isGoal(player.r, player.c)) {
    currentLevel++;

    // If there is another level, load it
    if (currentLevel < levels.length) {
      loadLevel(currentLevel);
    }
    // Otherwise, loop back to Level 1
    else {
      currentLevel = 0;
      loadLevel(currentLevel);
    }
  }
}

function loadLevel(index) {
  currentLevel = index;
  level = levels[currentLevel];

  player.r = level.start.r;
  player.c = level.start.c;

  resizeCanvas(level.pixelWidth(), level.pixelHeight());
}
