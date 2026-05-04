const exchangeRates = {
    USD: 1,
    KHR: 4050,
    EUR: 0.85,
    GBP: 0.75
};

const currencySymbols = {
    USD: '$',
    KHR: '៛',
    EUR: '€',
    GBP: '£'
};

// Formats a price based on the selected currency and exchange rate
function formatPrice(amount, currency) {
    const rate = exchangeRates[currency] || 1;
    const converted = amount * rate;

    if (currency === 'KHR') {
        return `${Math.round(converted).toLocaleString()} KHR`;
    }

    const symbol = currencySymbols[currency] || '';
    return `${symbol}${converted.toFixed(2)}`;
}

function updateAllPrices() {
    const currency = localStorage.getItem('selectedCurrency') || 'USD';
    const priceElements = document.querySelectorAll('.price-convert');

    priceElements.forEach(el => {
        const basePrice = parseFloat(el.dataset.basePrice);
        if (!isNaN(basePrice)) {
            el.textContent = formatPrice(basePrice, currency);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAllPrices);
} else {
    updateAllPrices();
}

document.addEventListener('currencyChanged', (e) => {
    updateAllPrices();
});
