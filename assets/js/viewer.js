(function init() {
  const params = new URLSearchParams(window.location.search);
  const url = params.get("url");
  const name = params.get("name");
  const key = params.get("key");

  const viewerNameEl = document.getElementById("viewerName");
  const viewerUrlEl = document.getElementById("viewerUrl");
  const openNewTabEl = document.getElementById("openNewTab");
  const frameEl = document.getElementById("frame");
  const noticeEl = document.getElementById("iframeNotice");
  const pageTitleEl = document.getElementById("pageTitle");
  const reloadFrameBtn = document.getElementById("reloadFrame");

  function safeUrl(url) {
    try {
      const u = new URL(url);
      if (u.protocol !== "http:" && u.protocol !== "https:") return null;
      return u.toString();
    } catch {
      return null;
    }
  }

  const safeTargetUrl = safeUrl(url);

  if (!safeTargetUrl || !name) {
    viewerNameEl.textContent = "Erro: Conteúdo não encontrado";
    viewerUrlEl.textContent = "A URL ou o nome do produto não foram fornecidos.";
    frameEl.hidden = true;
    return;
  }

  // Tema
  if (key) {
    document.body.classList.add(`theme-${key}`);
  }

  // Update page elements
  document.title = `Referência: ${name} — Portal Office`;
  pageTitleEl.textContent = `Referência: ${name}`;
  viewerNameEl.textContent = `Referência: ${name}`;
  viewerUrlEl.textContent = safeTargetUrl;
  openNewTabEl.href = safeTargetUrl;
  frameEl.src = safeTargetUrl;

  // Logic for iframe loading notice
  const timeoutMs = 2200;
  const token = String(Date.now());
  frameEl.dataset.token = token;

  setTimeout(() => {
    if (frameEl.dataset.token !== token) return;
    noticeEl.classList.add("show");
  }, timeoutMs);

  // Event listeners
  reloadFrameBtn.addEventListener("click", () => {
    if (!frameEl.src || frameEl.src === "about:blank") return;
    const current = frameEl.src;
    frameEl.src = "about:blank";
    noticeEl.classList.remove("show");
    setTimeout(() => {
      frameEl.src = current;
    }, 60);
  });
})();
