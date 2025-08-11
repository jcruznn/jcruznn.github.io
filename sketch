let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Generate random shapes
  for (let i = 0; i < 50; i++) {
    shapes.push({
      type: random(['circle', 'rect', 'arc', 'line']),
      x: random(width),
      y: random(height),
      size: random(20, 150),
      col: color(random(255), random(255), random(255), random(150, 255)),
      dx: random(-1, 1),
      dy: random(-1, 1),
      rot: random(TWO_PI),
      drot: random(-0.02, 0.02)
    });
  }
}

function draw() {
  background(240);

  for (let s of shapes) {
    push();
    translate(s.x, s.y);
    rotate(s.rot);
    fill(s.col);

    if (s.type === 'circle') {
      ellipse(0, 0, s.size);
    } else if (s.type === 'rect') {
      rectMode(CENTER);
      rect(0, 0, s.size, s.size);
    } else if (s.type === 'arc') {
      arc(0, 0, s.size, s.size, random(TWO_PI), random(TWO_PI));
    } else if (s.type === 'line') {
      stroke(s.col);
      strokeWeight(random(2, 6));
      line(-s.size / 2, 0, s.size / 2, 0);
      noStroke();
    }

    pop();

    // Move
    s.x += s.dx;
    s.y += s.dy;
    s.rot += s.drot;

    // Bounce off edges
    if (s.x < 0 || s.x > width) s.dx *= -1;
    if (s.y < 0 || s.y > height) s.dy *= -1;
  }
}
