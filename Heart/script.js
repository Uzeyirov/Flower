// ===== CANVAS =====
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ===== STARS =====
const stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5
  });
}

function drawStars() {
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

// ===== VALUES =====
let grow = 0;
let rotation = 0;

// ===== STEM =====
function drawStem(x, height) {
  ctx.beginPath();
  ctx.moveTo(x, canvas.height);
  ctx.quadraticCurveTo(
    x,
    canvas.height - height / 2,
    x,
    canvas.height - height * grow
  );
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 6;
  ctx.stroke();
}

// ===== PETAL =====
function drawPetal(cx, cy, angle, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle + rotation);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(50, -30, 0, -100);
  ctx.quadraticCurveTo(-50, -30, 0, 0);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

// ===== TEXT CONTROL =====
const texts = document.querySelectorAll("#texts .text");
let textShown = false;

// ===== LOOP =====
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();

  const centerX = canvas.width / 2;
  const stemHeight = canvas.height * 0.4;

  drawStem(centerX, stemHeight);

  if (grow > 0.6) {
    const flowerY = canvas.height - stemHeight;
    const colors = ["#60a5fa", "#a78bfa", "#38bdf8"];

    ctx.save();
    ctx.translate(centerX, flowerY);
    ctx.rotate(rotation);
    ctx.translate(-centerX, -flowerY);

    for (let i = 0; i < 8; i++) {
      drawPetal(
        centerX,
        flowerY,
        (Math.PI * 2 / 8) * i,
        colors[i % colors.length]
      );
    }

    ctx.beginPath();
    ctx.arc(centerX, flowerY, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#e0f2fe";
    ctx.fill();

    ctx.restore();
    rotation += 0.002;
  }

  // TEXT APPEAR
  if (grow > 0.5 && !textShown) {
    texts.forEach((t, i) => {
      setTimeout(() => t.classList.add("show"), i * 400);
    });
    textShown = true;
  }

  if (grow < 1) grow += 0.004;
  requestAnimationFrame(animate);
}

animate();
