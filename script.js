const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 220;
canvas.height = 220;

ctx.fillStyle = "#facc15";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let drawing = false;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function scratch(e) {
  if (!drawing) return;
  e.preventDefault();
  const p = getPos(e);

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", scratch);

canvas.addEventListener("touchstart", () => drawing = true);
canvas.addEventListener("touchend", () => drawing = false);
canvas.addEventListener("touchmove", scratch);
