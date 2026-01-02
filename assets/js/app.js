// ================================
// CONFIG (links externos continuam)
// ================================
const products = [
  {
    key: "word",
    name: "Word",
    badge: "Exercícios",
    desc: "Aceite os 5 desafios de <strong>WordTron</strong> e transforme seus textos em documentos poderosos e profissionais.",
    referenceUrl: "https://support.microsoft.com/pt-br/word",
    icon: "assets/img/word.png",
    masterName: "WordTron",
    masterImage: "assets/img/wordtron.png",
  },
  {
    key: "excel",
    name: "Excel",
    badge: "Exercícios",
    desc: "Domine as planilhas com <strong>Excelion</strong>! Uma trilha de 5 desafios que vai da organização de dados à criação de dashboards.",
    referenceUrl: "https://support.microsoft.com/pt-br/office/o-que-%C3%A9-o-excel-94b00f50-5896-479c-b0c5-ff74603b35a3",
    icon: "assets/img/excel.png",
    masterName: "Excelion",
    masterImage: "assets/img/excelion.png",
  },
  {
    key: "powerpoint",
    name: "PowerPoint",
    badge: "Exercícios",
    desc: "<strong>P.Painter</strong> te guiará por 5 desafios práticos para transformar suas ideias em apresentações visuais e inesquecíveis.",
    referenceUrl: "https://support.microsoft.com/pt-br/powerpoint",
    icon: "assets/img/powerpoint.png",
    masterName: "P.Painter",
    masterImage: "assets/img/ppainter.png",
  },
];

// ================================
// DOM
// ================================
const cardsEl = document.getElementById("cards");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = imageModal.querySelector(".modal-close");

// ================================
function safeUrl(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
}

function createCard(p) {
  const ref = safeUrl(p.referenceUrl) ?? "#";
  const exercisesUrl = `product.html?product=${encodeURIComponent(p.key)}`;
  const viewerUrl = `viewer.html?url=${encodeURIComponent(ref)}&name=${encodeURIComponent(p.name)}&key=${encodeURIComponent(p.key)}`;

  const card = document.createElement("article");
  card.className = `card card-${p.key}`;

  card.innerHTML = `
    <div class="head">
      <div class="card-left">
        <div class="icon-wrap" aria-hidden="true">
          <img src="${p.icon}" alt="" onerror="this.style.display='none'">
        </div>
        <div style="min-width:0;">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
        </div>
      </div>
    </div>

    <div class="card-master">
      <img src="${p.masterImage}" alt="Mestre ${p.masterName}" onerror="this.style.display='none'">
      <div class="card-master-info">
        <p>Mestre responsável</p>
        <strong>${p.masterName}</strong>
      </div>
    </div>

    <div class="actions">
        <a class="btn secondary" href="${viewerUrl}">
            Ver Material
        </a>
        <a class="btn btn-main" href="${exercisesUrl}">Iniciar Desafios</a>
      
    </div>
  `;

  const masterImg = card.querySelector(".card-master img");
  masterImg.addEventListener("click", () => {
    imageModal.classList.add("show");
    modalImage.src = p.masterImage;
  });

  return card;
}

// Events
document.getElementById("btnHome").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Modal close events
function closeModal() {
  imageModal.classList.remove("show");
}
modalClose.addEventListener("click", closeModal);
imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    closeModal();
  }
});

// Render
products.forEach((p) => cardsEl.appendChild(createCard(p)));
