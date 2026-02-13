(function () {

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

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const dots = [];
  const DOT_COUNT = 22;

  for (let i = 0; i < DOT_COUNT; i++) {
    dots.push({
      x: mouse.x,
      y: mouse.y,
      vx: 0,
      vy: 0
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    let target = mouse;

    dots.forEach((dot, index) => {

      // 弹性参数（前快后慢）
      const spring = 0.18 - index * 0.006;
      const friction = 0.75;

      dot.vx += (target.x - dot.x) * spring;
      dot.vy += (target.y - dot.y) * spring;

      dot.vx *= friction;
      dot.vy *= friction;

      dot.x += dot.vx;
      dot.y += dot.vy;

      const radius = 7 - index * 0.25;

      const gradient = ctx.createRadialGradient(
        dot.x, dot.y, 0,
        dot.x, dot.y, radius * 3
      );

      // 💎 高级蓝紫渐变
    gradient.addColorStop(0, "rgba(0,255,200,0.95)");
    gradient.addColorStop(0.4, "rgba(0,200,255,0.6)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      target = dot;
    });

    requestAnimationFrame(animate);
  }

  animate();

})();
