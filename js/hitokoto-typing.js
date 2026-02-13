// 一言
document.addEventListener("DOMContentLoaded", function () {

  const target = document.querySelector("#hitokoto");
  if (!target) return;

  fetch("https://v1.hitokoto.cn/")
    .then(res => res.json())
    .then(data => {
      const text = data.hitokoto;
      let index = 0;
      target.innerText = "";

      const timer = setInterval(() => {
        target.innerText += text[index];
        index++;

        if (index >= text.length) {
          clearInterval(timer);
        }
      }, 100); // 打字速度（可改 50 更快 / 200 更慢）
    })
    .catch(() => {
      target.innerText = "一言加载失败啦～";
    });

});
