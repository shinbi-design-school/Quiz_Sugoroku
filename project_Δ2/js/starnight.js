const canvas = document.getElementById('fiber');
const ctx = canvas.getContext('2d');

// リサイズ対応
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// 星データ
const STAR_COUNT = 300;
const stars = [];

// 惑星データ
const PLANET_COUNT = 2;
const planets = [];

// ★ 画像（1プレイ1回だけ）
const heroImg = new Image();
heroImg.src = "../images/ultlaman.png"; // ← ここにアップロード画像のパスを入れる

let hero = {
  x: -300, // 左の外から登場
  y: canvas.height * 0.5,
  speed: 0.5,
  size: 150,
  active: true // ★ 1プレイ1回だけ表示
};

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: 0.5 + Math.random() * 2,
    size: Math.random() * 2,
    alpha: 0.3 + Math.random() * 0.7
  };
}

function createPlanet() {
  const size = 60 + Math.random() * 150;
  return {
    x: canvas.width + Math.random() * 500,
    y: Math.random() * canvas.height,
    size: size,
    speed: 0.1 + Math.random() * 0.4,
    color: randomPlanetColor(),
    hasRing: Math.random() < 0.4
  };
}

function randomPlanetColor() {
  const colors = ["#6bb6ff", "#ff6b6b", "#ffd66b", "#b56bff", "#6bffb0"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 初期化
for (let i = 0; i < STAR_COUNT; i++) stars.push(createStar());
for (let i = 0; i < PLANET_COUNT; i++) planets.push(createPlanet());

function update() {
  // 星
  for (const star of stars) {
    star.x -= star.speed;
    if (star.x < 0) {
      star.x = canvas.width + Math.random() * 50;
      star.y = Math.random() * canvas.height;
    }
  }

  // 惑星
  for (const planet of planets) {
    planet.x -= planet.speed;
    if (planet.x + planet.size < 0) {
      const newPlanet = createPlanet();
      newPlanet.x = canvas.width + Math.random() * 1000;
      Object.assign(planet, newPlanet);
    }
  }

  // ★ ヒーロー画像（1回だけ）
  if (hero.active) {
    hero.x += hero.speed;

    // 画面外へ出たら非表示にする
    if (hero.x > canvas.width + hero.size) {
      hero.active = false;
    }
  }
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 星
  for (const star of stars) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // 惑星
  for (const planet of planets) {
    ctx.beginPath();
    ctx.fillStyle = planet.color;
    ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
    ctx.fill();

    // 光
    const grad = ctx.createRadialGradient(
      planet.x - planet.size * 0.4,
      planet.y - planet.size * 0.4,
      planet.size * 0.1,
      planet.x,
      planet.y,
      planet.size
    );
    grad.addColorStop(0, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
    ctx.fill();

    // 輪っか
    if (planet.hasRing) {
      ctx.save();
      ctx.translate(planet.x, planet.y);
      ctx.rotate(-0.4);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = planet.size * 0.2;
      ctx.ellipse(0, 0, planet.size * 1.4, planet.size * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  // ★ ヒーロー画像（1プレイ1回）
  if (hero.active) {
    ctx.drawImage(heroImg, hero.x, hero.y - hero.size / 2, hero.size, hero.size);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();