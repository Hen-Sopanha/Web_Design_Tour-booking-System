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

/**
 * Formats a price based on the selected currency and exchange rate.
 * @param {number} amount - The amount in USD.
 * @param {string} currency - The target currency code.
 * @returns {string} The formatted price string.
 */
function formatPrice(amount, currency) {
    const rate = exchangeRates[currency] || 1;
    const converted = amount * rate;
    
    if (currency === 'KHR') {
        // KHR is usually represented as a whole number with KHR suffix
        return `${Math.round(converted).toLocaleString()} KHR`;
    }
    
    const symbol = currencySymbols[currency] || '';
    // EUR and GBP usually put the symbol before the amount
    return `${symbol}${converted.toFixed(2)}`;
}

/**
 * Updates all elements with the 'price-convert' class to show the price in the selected currency.
 */
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

// Initial update when the script loads or DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAllPrices);
} else {
    updateAllPrices();
}

// Listen for the custom currencyChanged event dispatched from header.js
document.addEventListener('currencyChanged', (e) => {
    updateAllPrices();
});
