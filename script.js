const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

const SIZE = 220;
canvas.width = SIZE;
canvas.height = SIZE;

// pintar capa amarilla
ctx.fillStyle = "#facc15";
ctx.fillRect(0, 0, SIZE, SIZE);

// para calcular porcentaje raspado
let totalPixels = SIZE * SIZE;
let cleared = false;

let isDrawing = false;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches ? e.touches[0] : e;
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

function scratch(e) {
  if (!isDrawing || cleared) return;
  e.preventDefault();

  const { x, y } = getPos(e);

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();

  checkCleared();
}

function checkCleared() {
  const imageData = ctx.getImageData(0, 0, SIZE, SIZE).data;
  let transparent = 0;

  for (let i = 3; i < imageData.length; i += 4) {
    if (imageData[i] === 0) transparent++;
  }

  const percent = transparent / totalPixels;

  if (percent > 0.5) {
    cleared = true;
    ctx.clearRect(0, 0, SIZE, SIZE);
    canvas.style.display = "none";
  }
}

// mouse
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);
canvas.addEventListener("mousemove", scratch);

// touch
canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
  e.preventDefault();
}, { passive: false });

canvas.addEventListener("touchend", () => isDrawing = false);
canvas.addEventListener("touchmove", scratch, { passive: false });
