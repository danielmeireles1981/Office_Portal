function getProductKey() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("product") || "").toLowerCase();
}

function storageKey(productKey) {
  return `portal_progress_${productKey}`;
}

function loadProgress(productKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(productKey)) || "{}");
  } catch {
    return {};
  }
}

function saveProgress(productKey, progress) {
  localStorage.setItem(storageKey(productKey), JSON.stringify(progress));
}

function createExerciseCard(ex, checked, onToggle, productName) {
  const card = document.createElement("article");
  card.className = "exercise-card";

  const modelTextHtml = ex.modelText ? `
    <div class="model-text">
      <div class="model-text-header">
        <strong>Dados para colar no ${productName}:</strong>
        <button class="btn-copy" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>
          <span>Copiar</span>
        </button>
      </div>
      <pre class="model-text-content">${ex.modelText}</pre>
    </div>
  ` : '';

  const guideHtml = ex.guide && ex.guide.length > 0 ? `
    <div class="exercise-footer">
      <button class="btn-guide" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
        <span>Ver Passo a Passo</span>
      </button>
    </div>
    <div class="exercise-guide">
      <div class="exercise-guide-content">
        <h4>Como resolver:</h4>
        <ol>
          ${ex.guide.map(g => `<li>${g}</li>`).join("")}
        </ol>
      </div>
    </div>
  ` : '';

  card.innerHTML = `
    <div class="exercise-top">
      <div>
        <h3>${ex.title}</h3>
        <p class="muted"><strong>Objetivo:</strong> ${ex.objective}</p>
      </div>

      <label class="check">
        <input type="checkbox" ${checked ? "checked" : ""}>
        <span>Concluído</span>
      </label>
    </div>

    <div class="exercise-body">
      ${modelTextHtml}
      <h4>Passos da Atividade</h4>
      <ol>
        ${ex.steps.map(s => `<li>${s}</li>`).join("")}
      </ol>
      <p class="muted"><strong>Entrega / Checklist:</strong> ${ex.deliverable}</p>
    </div>
    ${guideHtml}
  `;

  const checkbox = card.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", () => onToggle(ex.id, checkbox.checked));

  const copyButton = card.querySelector(".btn-copy");
  if (copyButton) {
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(ex.modelText).then(() => {
        const buttonText = copyButton.querySelector("span");
        buttonText.textContent = "Copiado!";
        copyButton.disabled = true;
        setTimeout(() => {
          buttonText.textContent = "Copiar";
          copyButton.disabled = false;
        }, 2000);
      }).catch(err => {
        console.error('Falha ao copiar texto: ', err);
      });
    });
  }

  const guideButton = card.querySelector(".btn-guide");
  if (guideButton) {
    guideButton.addEventListener("click", () => {
      card.classList.toggle("guide-visible");
      const buttonText = guideButton.querySelector("span");
      buttonText.textContent = card.classList.contains("guide-visible")
        ? "Ocultar Passo a Passo"
        : "Ver Passo a Passo";
    });
  }

  return card;
}

function renderList(containerId, list, progress, onToggle, productName) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  list.forEach(ex => {
    const checked = !!progress[ex.id];
    container.appendChild(createExerciseCard(ex, checked, onToggle, productName));
  });
}

(function init() {
  const key = getProductKey();
  const data = window.PORTAL_DATA?.[key];

  if (!data) {
    document.getElementById("pageTitle").textContent = "Exercícios — produto não encontrado";
    document.getElementById("productName").textContent = "Produto inválido";
    document.getElementById("productDesc").textContent = "Volte ao portal e escolha Word, Excel ou PowerPoint.";
    document.getElementById("refLink").setAttribute("href", "index.html");
    return;
  }

  // Tema
  document.body.classList.add(`theme-${key}`);

  // Header / Info
  document.getElementById("pageTitle").textContent = `Exercícios — ${data.name}`;
  document.getElementById("productName").textContent = data.name;
  document.getElementById("productDesc").textContent = data.desc;

  const refLink = document.getElementById("refLink");
  refLink.href = data.referenceUrl;

  // Progress Bar
  const progressBarEl = document.getElementById("progressBar");
  const progressTextEl = document.getElementById("progressText");
  const totalExercises = data.basic.length + data.intermediate.length;

  function updateProgressBar() {
    const currentProgress = loadProgress(key);
    const completedCount = Object.values(currentProgress).filter(Boolean).length;
    const percentage = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

    if (progressBarEl && progressTextEl) {
      progressBarEl.style.width = `${percentage}%`;
      progressTextEl.textContent = `${completedCount} / ${totalExercises}`;
    }
  }

  // Progress
  const progress = loadProgress(key);

  function onToggle(exId, isChecked) {
    progress[exId] = isChecked;
    saveProgress(key, progress);
    updateProgressBar();
  }

  renderList("basicList", data.basic, progress, onToggle, data.name);
  renderList("intermediateList", data.intermediate, progress, onToggle, data.name);
  updateProgressBar();

  // Reset
  document.getElementById("resetProgress").addEventListener("click", () => {
    localStorage.removeItem(storageKey(key));
    location.reload();
  });
})();
