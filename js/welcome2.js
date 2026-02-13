// 霓虹风格
(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("welcome-info");
    if (!container) return;

    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(ipData => {

        const city = ipData.city || "";
        const country = ipData.country_name || "";
        const ip = ipData.ip || "";

        fetch("https://v1.hitokoto.cn/")
          .then(res => res.json())
          .then(hitokotoData => {

            container.innerHTML = `
            <div class="cyber-card">

              <div class="cyber-title">
                ⚡ 访问验证成功
              </div>

              <div class="cyber-info">
                🌍 您来自：${country} ${city}
              </div>

              <div class="cyber-ip">
                🛰 当前 IP：${ip}
              </div>

              <div class="cyber-welcome">
                🚀 欢迎进入我的数字空间
              </div>

              <div class="cyber-hitokoto">
                「 ${hitokotoData.hitokoto} 」
              </div>

            </div>
            `;

          })
          .catch(() => {
            container.innerHTML = "欢迎访问我的博客。";
          });

      })
      .catch(() => {
        container.innerHTML = "欢迎访问我的博客。";
      });

  });

})();


// ===== 样式部分 =====
const style = document.createElement("style");
style.innerHTML = `

.cyber-card{
  padding:20px;
  border-radius:16px;
  background: rgba(10,10,25,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border:1px solid rgba(0,255,255,0.4);
  box-shadow:
    0 0 20px rgba(0,255,255,0.3),
    0 0 40px rgba(138,43,226,0.3);
  font-size:14px;
  line-height:1.6;
  color:#e0f7ff;
  position:relative;
  overflow:hidden;
}

/* 标题霓虹发光 */
.cyber-title{
  font-weight:700;
  font-size:15px;
  margin-bottom:8px;
  color:#00f5ff;
  text-shadow:
    0 0 6px #00f5ff,
    0 0 12px #00f5ff,
    0 0 20px #8a2be2;
  animation: flicker 3s infinite alternate;
}

/* IP 高亮 */
.cyber-ip{
  font-weight:600;
  margin:6px 0;
  color:#ff00ff;
  text-shadow:
    0 0 6px #ff00ff,
    0 0 12px #ff00ff;
}

/* 一言渐变流光 */
.cyber-hitokoto{
  margin-top:10px;
  font-weight:600;
  background: linear-gradient(90deg,#00f5ff,#ff00ff,#00ffcc,#00f5ff);
  background-size:300% 300%;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  animation: gradientMove 6s linear infinite;
}

/* 呼吸霓虹边框 */
.cyber-card::before{
  content:"";
  position:absolute;
  inset:-2px;
  border-radius:16px;
  background: linear-gradient(45deg,#00f5ff,#ff00ff,#00ffcc,#00f5ff);
  background-size:300% 300%;
  z-index:-1;
  filter: blur(8px);
  opacity:0.6;
  animation: gradientMove 8s linear infinite;
}

/* 动画 */
@keyframes gradientMove{
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

@keyframes flicker{
  0%{opacity:0.9}
  100%{opacity:1}
}

`;
document.head.appendChild(style);
