const currencies = [
  { code: 'USD', label: 'USD' },
  { code: 'EUR', label: 'EUR' },
  { code: 'KHR', label: 'KHR' },
];

function createHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="header-inner">
      <img src="./../assets/logo/CamTravel Logo.png" alt="CamTravel" class="header-logo-img">

      <div class="header-controls">
        <div class="currency-selector" id="currencySelector">
          <button
            class="currency-btn"
            id="currencyBtn"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-label="Select currency"
          >
            <span class="currency-label" id="currencyLabel">Currency (USD)</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="chevron-icon" width="16" height="16" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>

          </button>

          <ul class="currency-dropdown" id="currencyDropdown" role="listbox" aria-label="Currency options">
            ${currencies.map(c => `
              <li class="currency-option${c.code === 'USD' ? ' is-selected' : ''}"
                  role="option"
                  aria-selected="${c.code === 'USD'}"
                  data-code="${c.code}">
                ${c.label}
              </li>`).join('')}
          </ul>
        </div>

        <a href="/pages/tour-customize.html" class="btn-cta" id="customizeTourBtn">
          Customize My Tour
        </a>

      </div>
    </div>
  `;

  return header;
}

function mountHeader() {
  const root = document.getElementById('header-root');
  if (!root) {
    console.warn('No #header-root element found.');
    return;
  }
  root.appendChild(createHeader());
  initCurrencyDropdown();
}

function initCurrencyDropdown() {
  const btn = document.getElementById('currencyBtn');
  const dropdown = document.getElementById('currencyDropdown');
  const label = document.getElementById('currencyLabel');
  const selector = document.getElementById('currencySelector');

  if (!btn || !dropdown) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = selector.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  dropdown.addEventListener('click', (e) => {
    const option = e.target.closest('.currency-option');
    if (!option) return;

    const code = option.dataset.code;
    label.textContent = `Currency (${code})`;

    dropdown.querySelectorAll('.currency-option').forEach(el => {
      el.classList.remove('is-selected');
      el.setAttribute('aria-selected', 'false');
    });
    option.classList.add('is-selected');
    option.setAttribute('aria-selected', 'true');

    selector.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('click', () => {
    selector.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountHeader);
} else {
  mountHeader();
}