import { SISTEMAS } from './systems.config.js';

const elements = {
  systemsGrid: document.getElementById('systemsGrid'),
  searchInput: document.getElementById('searchInput'),
  emptyState: document.getElementById('emptyState'),
  currentYear: document.getElementById('currentYear'),
  shareModal: document.getElementById('shareModal'),
  modalClose: document.getElementById('modalClose'),
  sharePreview: document.getElementById('sharePreview'),
  whatsappButton: document.getElementById('whatsappButton'),
  copyButton: document.getElementById('copyButton'),
  toast: document.getElementById('toast'),
};

let sistemaSelecionado = null;
let toastTimer = null;

function validateSystemUrl(value) {
  if (typeof value !== 'string' || !value.trim() || value.trim() === '#') {
    return { valid: false, reason: 'URL não configurada.' };
  }

  try {
    const url = new URL(value.trim());
    const allowedProtocols = new Set(['http:', 'https:']);

    if (!allowedProtocols.has(url.protocol)) {
      return { valid: false, reason: 'Apenas URLs HTTP/HTTPS são permitidas.' };
    }

    return { valid: true, url: url.href };
  } catch {
    return { valid: false, reason: 'URL inválida.' };
  }
}

function normalizeSystem(system) {
  const validation = validateSystemUrl(system.url);
  if (system.access && system.status === 'disponivel' && !validation.valid) {
    console.warn(`[Portal] URL inválida para "${system.nome}": ${validation.reason}`);
  }

  return {
    ...system,
    _urlValidation: validation,
  };
}

const sistemasValidados = SISTEMAS.map(normalizeSystem);

function getStatusInfo(system) {
  if (system.access && system.status === 'disponivel' && !system._urlValidation.valid) {
    return {
      texto: 'Configuração inválida',
      classe: 'status-invalid',
    };
  }

  switch (system.status) {
    case 'disponivel':
      return { texto: 'Disponível', classe: 'status-available' };
    case 'manutencao':
      return { texto: 'Manutenção', classe: 'status-maintenance' };
    case 'indisponivel':
      return { texto: 'Indisponível', classe: 'status-unavailable' };
    default:
      return { texto: 'Indefinido', classe: 'status-unavailable' };
  }
}

function getBotaoStatus(system) {
  if (system.access && system.status === 'disponivel' && !system._urlValidation.valid) {
    return 'URL inválida';
  }

  switch (system.status) {
    case 'manutencao':
      return 'Em manutenção';
    case 'indisponivel':
      return 'Indisponível';
    default:
      return 'Em breve';
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function canAccessSystem(system) {
  return Boolean(
    system.status === 'disponivel' &&
    system.access &&
    system._urlValidation.valid
  );
}

function showLoadingState() {
  elements.systemsGrid.setAttribute('aria-busy', 'true');
  elements.systemsGrid.innerHTML = `
    ${Array.from({ length: 6 }, () => `
      <article class="system-card skeleton-card" aria-hidden="true">
        <div class="skeleton skeleton-icon"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-line"></div>
        <div class="skeleton skeleton-line short"></div>
        <div class="skeleton skeleton-button"></div>
      </article>
    `).join('')}
  `;
}

function hideLoadingState() {
  elements.systemsGrid.removeAttribute('aria-busy');
}

function renderSistemas(lista = sistemasValidados) {
  elements.systemsGrid.innerHTML = '';
  hideLoadingState();

  if (lista.length === 0) {
    elements.emptyState.style.display = 'block';
    return;
  }

  elements.emptyState.style.display = 'none';

  lista.forEach((system, index) => {
    const status = getStatusInfo(system);
    const isDisponivel = canAccessSystem(system);
    const url = isDisponivel ? system._urlValidation.url : '#';

    const card = document.createElement('article');
    card.className = 'system-card';
    card.style.animationDelay = `${index * 60}ms`;

    card.innerHTML = `
      <div class="card-top">
        <div class="system-icon">${escapeHtml(system.icone)}</div>
        <div class="system-status ${status.classe}">
          <span class="status-dot"></span>
          ${escapeHtml(status.texto)}
        </div>
      </div>

      <div class="card-content">
        <div class="card-title">${escapeHtml(system.nome)}</div>
        <div class="card-description">${escapeHtml(system.descricao)}</div>
        <div class="card-meta">
          <span>•</span>
          <span>${escapeHtml(system.categoria)}</span>
        </div>
      </div>

      <div class="card-bottom">
        <a
          class="access-button ${isDisponivel ? '' : 'disabled'}"
          href="${escapeHtml(url)}"
          ${isDisponivel ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true"'}
          data-system-id="${escapeHtml(system.id)}"
        >
          ${isDisponivel ? 'Acessar sistema →' : escapeHtml(getBotaoStatus(system))}
        </a>

        ${isDisponivel ? `
          <button
            class="share-button"
            type="button"
            title="Compartilhar"
            aria-label="Compartilhar ${escapeHtml(system.nome)}"
            data-share-id="${escapeHtml(system.id)}"
          >
            ↗
          </button>
        ` : ''}
      </div>
    `;

    const accessButton = card.querySelector('.access-button');
    accessButton.addEventListener('click', (event) => {
      if (!isDisponivel) {
        event.preventDefault();
        showToast(
          status.texto === 'Configuração inválida'
            ? `Não é possível acessar "${system.nome}" porque a URL configurada é inválida.`
            : `"${system.nome}" está ${status.texto.toLowerCase()}.`,
          'error'
        );
      }
    });

    const shareButton = card.querySelector('.share-button');
    if (shareButton) {
      shareButton.addEventListener('click', () => openShareModal(system));
    }

    elements.systemsGrid.appendChild(card);
  });
}

function filterSistemas() {
  const termo = elements.searchInput.value.trim().toLowerCase();

  if (!termo) {
    renderSistemas(sistemasValidados);
    return;
  }

  const filtrados = sistemasValidados.filter((system) => {
    const texto = [system.nome, system.descricao, system.categoria]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return texto.includes(termo);
  });

  renderSistemas(filtrados);
}

function openShareModal(system) {
  if (!canAccessSystem(system)) return;

  sistemaSelecionado = system;
  elements.sharePreview.innerHTML = `
    <strong>${escapeHtml(system.nome)}</strong>
    <br><br>
    ${escapeHtml(system.descricao)}
    <br><br>
    <span class="share-url">${escapeHtml(system._urlValidation.url)}</span>
  `;

  elements.shareModal.classList.add('active');
  elements.modalClose.focus();
}

function closeShareModal() {
  elements.shareModal.classList.remove('active');
  sistemaSelecionado = null;
}

function showToast(message, type = 'success') {
  clearTimeout(toastTimer);

  elements.toast.textContent = message;
  elements.toast.className = `toast toast-${type}`;
  elements.toast.classList.add('show');

  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 2800);
}

async function copySystemLink() {
  if (!sistemaSelecionado) return;

  const url = sistemaSelecionado._urlValidation.url;
  const originalText = elements.copyButton.textContent;

  try {
    await navigator.clipboard.writeText(url);
    elements.copyButton.textContent = '✓ Link copiado';
    showToast('Link copiado para a área de transferência.');
  } catch (error) {
    console.error('[Portal] Falha ao copiar link:', error);

    // Fallback para navegadores/contextos onde Clipboard API não está disponível.
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    const copied = document.execCommand('copy');
    textArea.remove();

    if (copied) {
      elements.copyButton.textContent = '✓ Link copiado';
      showToast('Link copiado para a área de transferência.');
    } else {
      showToast('Não foi possível copiar automaticamente. Copie o endereço manualmente.', 'error');
    }
  } finally {
    window.setTimeout(() => {
      elements.copyButton.textContent = originalText;
    }, 1800);
  }
}

function shareOnWhatsApp() {
  if (!sistemaSelecionado) return;

  const message = [
    '*Distrito Nordeste Central*',
    '',
    `📋 *${sistemaSelecionado.nome}*`,
    '',
    sistemaSelecionado.descricao,
    '',
    '🔗 Acesse o sistema:',
    sistemaSelecionado._urlValidation.url,
  ].join('\n');

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  );
}

function validateCatalog() {
  const duplicatedIds = new Set();
  const duplicates = [];

  sistemasValidados.forEach((system) => {
    if (duplicatedIds.has(system.id)) duplicates.push(system.id);
    duplicatedIds.add(system.id);
  });

  if (duplicates.length) {
    console.warn('[Portal] IDs duplicados encontrados:', duplicates);
  }
}

function init() {
  validateCatalog();
  elements.currentYear.textContent = new Date().getFullYear();
  showLoadingState();

  window.requestAnimationFrame(() => {
    renderSistemas();
  });

  elements.searchInput.addEventListener('input', filterSistemas);
  elements.modalClose.addEventListener('click', closeShareModal);
  elements.whatsappButton.addEventListener('click', shareOnWhatsApp);
  elements.copyButton.addEventListener('click', copySystemLink);

  elements.shareModal.addEventListener('click', (event) => {
    if (event.target === elements.shareModal) closeShareModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && elements.shareModal.classList.contains('active')) {
      closeShareModal();
    }
  });
}

init();
