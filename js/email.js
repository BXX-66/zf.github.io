(function () {

  const EMAIL = "3483190878@qq.com";

  function createPopup() {

    // 避免重复创建
    if (document.getElementById("email-popup-box")) return;

    // 遮罩层
    const overlay = document.createElement("div");
    overlay.id = "email-popup-overlay";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      backdrop-filter: blur(4px);
      z-index: 9998;
    `;

    // 弹窗
    const box = document.createElement("div");
    box.id = "email-popup-box";
    box.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--card-bg, #1e1e1e);
      color: var(--font-color, #fff);
      padding: 28px;
      border-radius: 18px;
      text-align: center;
      z-index: 9999;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      min-width: 280px;
    `;

    box.innerHTML = `
      <div style="font-size:18px;margin-bottom:15px;">My Email</div>
      <input value="${EMAIL}" readonly 
        style="
          width:100%;
          padding:8px;
          border-radius:8px;
          border:none;
          text-align:center;
          font-size:15px;
          margin-bottom:12px;
        ">
      <div style="font-size:13px;opacity:0.7;">
        Click anywhere outside to close
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(box);

    overlay.addEventListener("click", function () {
      overlay.remove();
      box.remove();
    });

    navigator.clipboard.writeText(EMAIL);

  }

  function bindEvent() {

    const btn = document.querySelector(
      'a.social-icon[title="Email"]'
    );

    if (!btn) return;

    if (btn.dataset.emailBound === "true") return;
    btn.dataset.emailBound = "true";

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      createPopup();
    });
  }
