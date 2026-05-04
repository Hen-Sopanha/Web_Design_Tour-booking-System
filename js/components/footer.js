/**
 * Footer Component
 * Renders the CamTravel site footer and injects it into #footer-root.
 */

function assetUrl(relativePath) {
    return new URL(relativePath, document.baseURI).href;
}

const footerData = {
    resources: [
        { label: 'Why CamTravel' },
        { label: 'Blogs' },
        { label: 'Faqs' }
    ],
    helpfulLinks: [
        { label: 'Contact Us' },
        { label: 'Privacy Policy' },
        { label: 'Terms & Conditions' }
    ],
    partner: [
        { label: 'Join as a Guide' },
        { label: 'Join as a Tour Operator' }
    ],
    socials: [
        {
            label: 'Facebook',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
        },
        {
            label: 'Instagram',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
        },
        {
            label: 'X (Twitter)',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
        },
        {
            label: 'TikTok',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>`,
        },
        {
            label: 'Telegram',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.862c-1.073.43-1.067 1.484-.187 1.768l4.239 1.32 1.614 4.948c.2.604.756.828 1.28.52l2.298-1.476 4.373 3.228c.786.546 1.632.168 1.875-.814l3.019-14.222c.267-1.267-.468-1.898-1.99-1.35zM9.865 14.868l-.37 3.469-1.36-4.169 9.565-6.222-7.835 6.922z"/></svg>`,
        }
    ],
    payments: [
        {
            label: 'Mastercard',
            img: `<img src="${assetUrl('../assets/logo/Mastercard-Logo.png')}" alt="Mastercard" class="payment-logo-img payment-logo-mastercard">`,
        },
        {
            label: 'Visa',
            img: `<img src="${assetUrl('../assets/logo/Visa-Logo.jpg')}" alt="Visa" class="payment-logo-img payment-logo-visa">`,
        },
        {
            label: 'Apple Pay',
            img: `<img src="${assetUrl('../assets/logo/ApplePay-Logo.png')}" alt="Apple Pay" class="payment-logo-img payment-logo-applepay">`,
        },
        {
            label: 'ABA Pay',
            img: `<img src="${assetUrl('../assets/logo/Aba-Logo.png')}" alt="ABA Pay" class="payment-logo-img payment-logo-aba">`,
        },
        {
            label: 'PayPal',
            img: `<img src="${assetUrl('../assets/logo/Paypal-Logo.png')}" alt="PayPal" class="payment-logo-img payment-logo-paypal">`,
        },
        {
            label: 'Alipay',
            img: `<img src="${assetUrl('../assets/logo/Alipay-Logo.png')}" alt="Alipay" class="payment-logo-img payment-logo-alipay">`,
        }
    ],
};

function starsSVG(count = 5) {
    return Array.from({ length: count }, () =>
        `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
          fill="#00B67A" aria-hidden="true">
       <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02
                        12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
     </svg>`
    ).join('');
}

function linkList(items) {
    return items.map(item =>
        `<li class="footer-link" style="cursor: default;">${item.label}</li>`
    ).join('');
}

function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';

    footer.innerHTML = `
    <div class="footer-inner">
      <!-- Top: Logo and Rating -->  
      <div class="footer-top">
        <div class="footer-brand">
          <img src="${assetUrl('../assets/logo/CamTravel-Logo.png')}" alt="CamTravel" class="footer-logo-img">
        </div>

        <div class="footer-rating">
          <span class="rating-label">Excellent</span>
          <div class="rating-stars" aria-label="5 out of 5 stars">
            ${starsSVG(5)}
          </div>
        </div>
      </div>

      <!-- Mid: 4 Columns -->
      <div class="footer-columns">
        <div class="footer-col">
          <h3 class="footer-col-heading">RESOURCES</h3>
          <ul class="footer-col-listing">${linkList(footerData.resources)}</ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-col-heading">HELPFUL LINKS</h3>
          <ul class="footer-col-listing">${linkList(footerData.helpfulLinks)}</ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-col-heading">PARTNER</h3>
          <ul class="footer-col-listing">${linkList(footerData.partner)}</ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-col-heading">WAYS YOU CAN PAY</h3>
          <div class="payment-grid">
            ${footerData.payments.map(p =>
        `<div class="payment-badge" title="${p.label}">${p.img}</div>`
    ).join('')}
          </div>
        </div>
      </div>

      <!-- Bottom: Socials -->
      <div class="footer-bottom">
        <span class="socials-label">SOCIALS</span>
        <div class="socials-list">
          ${footerData.socials.map(s =>
        `<a href="${s.href}" class="social-link" aria-label="${s.label}" title="${s.label}">
               ${s.svg}
             </a>`
    ).join('')}
        </div>
      </div>

    </div>
  `;

    return footer;
}

function mountFooter() {
    const root = document.getElementById('footer-root');
    if (!root) {
        console.warn('No #footer-root element found.');
        return;
    }
    root.appendChild(createFooter());
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountFooter);
} else {
    mountFooter();
}
