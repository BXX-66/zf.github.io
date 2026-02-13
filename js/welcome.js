(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("welcome-info");
    if (!container) return;

    container.innerHTML = `
      <div class="terminal-card">
        <div id="terminal-output"></div>
        <div id="hitokoto-line"></div>
      </div>
    `;

    const output = document.getElementById("terminal-output");
    const hitokotoLine = document.getElementById("hitokoto-line");

    // 打字机函数
    function typeWriter(text, element, speed = 35, callback) {
      let i = 0;
      function typing() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(typing, speed);
        } else {
          if (callback) callback();
        }
      }
      typing();
    }

    // 获取IP
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(ipData => {

        const city = ipData.city || "未知";
        const country = ipData.country_name || "";
        const ip = ipData.ip || "";

        const lines = [
          ">>> 系统连接成功...",
          `>>> 访问来源：${country} ${city}`,
          `>>> 当前 IP：${ip}`,
          ">>> 欢迎访问我的博客"
        ];

        let index = 0;

        function printNextLine() {
          if (index >= lines.length) {
            fetchHitokoto();
            return;
          }

          const line = document.createElement("div");
          line.className = "gradient-text";
          output.appendChild(line);

          typeWriter(lines[index], line, 35, () => {
            index++;
            printNextLine();
          });
        }

        printNextLine();

      });

    // 一言
    function fetchHitokoto() {
      fetch("https://v1.hitokoto.cn/")
        .then(res => res.json())
        .then(data => {

          hitokotoLine.className = "gradient-text";
          typeWriter(">>> " + data.hitokoto, hitokotoLine, 40);

        })
        .catch(() => {
          hitokotoLine.className = "gradient-text";
          hitokotoLine.innerHTML = ">>> 欢迎访问本站";
        });
    }

  });

})();


// ===== 样式 =====
const style = document.createElement("style");
style.innerHTML = `

/* 公告标题“欢迎访问”渐变 */
.card-widget.card-announcement .item-headline span{
  background: linear-gradient(
    90deg,
    #00ffe5,
    #00c3ff,
    #00ffe5
  );
  background-size:300% 300%;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  animation: gradientMove 6s ease infinite;
}

.terminal-card{
  background: #0d1117;
  padding:18px;
  border-radius:10px;
  font-size:13px;
  line-height:1.6;
  font-family: "Courier New", monospace;
  border:1px solid rgba(0,255,200,0.3);
  box-shadow: 0 0 25px rgba(0,255,200,0.15);
  overflow:hidden;
}

/* 所有文字渐变 */
.gradient-text{
  margin-bottom:4px;
  font-weight:600;
  background: linear-gradient(
    90deg,
    #00ffe5,
    #00c3ff,
    #00ffe5
  );
  background-size:300% 300%;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  animation: gradientMove 6s ease infinite;
}

/* 渐变流动动画 */
@keyframes gradientMove{
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

`;
document.head.appendChild(style); 