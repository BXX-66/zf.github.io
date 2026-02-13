(function () {

  // 移动端关闭
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);

  canvas.style.position = "fixed";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let mouse = { x: width / 2, y: height / 2 };

  const dots = [];
  const DOT_COUNT = 18;

  for (let i = 0; i < DOT_COUNT; i++) {
    dots.push({
      x: mouse.x,
      y: mouse.y
    });
  }

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    let prev = mouse;

    dots.forEach((dot, index) => {

      const ease = 0.35 - index * 0.015;

      dot.x += (prev.x - dot.x) * ease;
      dot.y += (prev.y - dot.y) * ease;

      const radius = 6 - index * 0.25;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);

      // 🌊 明亮青蓝色
      ctx.fillStyle = "rgba(0, 255, 220, 0.35)";
      ctx.shadowBlur = 25;
      ctx.shadowColor = "rgba(0, 255, 220, 0.6)";

      ctx.fill();

      prev = dot;
    });

    requestAnimationFrame(animate);
  }

  animate();

})();
