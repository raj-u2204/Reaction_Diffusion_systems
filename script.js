const canvas = document.getElementById("sim");
const ctx = canvas.getContext("2d");
const gravitySlider = document.getElementById("gravity");
const countLabel = document.getElementById("count");
const resetBtn = document.getElementById("reset");

const RESTITUTION = 0.75; // energy retained per bounce
const RADIUS_RANGE = [6, 14];

let particles = [];

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = randRange(...RADIUS_RANGE);
    this.vx = randRange(-3, 3);
    this.vy = randRange(-2, 0);
    this.hue = randRange(180, 320);
  }

  step(gravity) {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    // wall collisions
    if (this.x - this.r < 0) {
      this.x = this.r;
      this.vx *= -RESTITUTION;
    } else if (this.x + this.r > canvas.width) {
      this.x = canvas.width - this.r;
      this.vx *= -RESTITUTION;
    }

    if (this.y + this.r > canvas.height) {
      this.y = canvas.height - this.r;
      this.vy *= -RESTITUTION;
      this.vx *= 0.98; // a little floor friction
    } else if (this.y - this.r < 0) {
      this.y = this.r;
      this.vy *= -RESTITUTION;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.hue}, 80%, 65%)`;
    ctx.fill();
  }
}

function spawn(x, y, n = 1) {
  for (let i = 0; i < n; i++) {
    particles.push(new Particle(x, y));
  }
  countLabel.textContent = particles.length;
}

function reset() {
  particles = [];
  countLabel.textContent = "0";
  spawn(canvas.width / 2, 40, 300);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gravity = parseFloat(gravitySlider.value);

  for (const p of particles) {
    p.step(gravity);
    p.draw();
  }

  requestAnimationFrame(loop);
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  spawn(x, y, 1);
});

resetBtn.addEventListener("click", reset);

reset();
loop();
