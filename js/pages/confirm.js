const bookingData = JSON.parse(localStorage.getItem("bookingData"));

function setText(id, value, isPrice = false) {
  const element = document.getElementById(id);
  if (!element || !value) return;
  
  if (isPrice) {
    // Extract number from string like "USD 3,700.00" or "$3,700.00"
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    element.classList.add('price-convert');
    element.dataset.basePrice = numericValue;
    element.textContent = value; // main.js will override this
  } else {
    element.textContent = value;
  }
}

function renderPriceBreakdown(rows) {
  const container = document.getElementById("summary-price-breakdown");
  if (!container) return;

  container.innerHTML = "";
  if (!Array.isArray(rows) || rows.length === 0) return;

  rows.forEach((row) => {
    const priceRow = document.createElement("div");
    const label = document.createElement("span");
    const amount = document.createElement("span");

    priceRow.className = "price-row";
    label.className = "price-label";
    amount.className = "price-amount price-convert";
    
    // Extract numeric value from "USD 120.00"
    const numericValue = parseFloat(row.amount.replace(/[^0-9.]/g, '')) || 0;
    amount.dataset.basePrice = numericValue;
    
    label.textContent = row.label;
    amount.textContent = row.amount;

    priceRow.append(label, amount);
    container.appendChild(priceRow);
  });
  
  // Trigger global update if available
  if (typeof updateAllPrices === 'function') updateAllPrices();
}

if (bookingData) {
  setText("summary-tour-name", bookingData.tourName);
  setText("summary-location", bookingData.location);
  setText("summary-name", bookingData.name);
  setText("summary-room", bookingData.room);
  setText("summary-date", bookingData.travelDates);
  setText("summary-travelers", bookingData.travelers);
  setText("summary-total", bookingData.total, true);
  renderPriceBreakdown(bookingData.priceBreakdown);

  if (bookingData.addons && bookingData.addons.length > 0) {
    setText("summary-addons", bookingData.addons.join(", "));
  } else {
    setText("summary-addons", "No add-ons");
  }
}

const continueBtn = document.querySelector(".btn-continue");
if (continueBtn) {
  continueBtn.addEventListener("click", function () {
    const selected = document.querySelector('input[name="payment"]:checked');
    if (!selected) {
      alert("Please select a payment method first.");
      return;
    }

    localStorage.setItem("selectedPayment", selected.value);
    localStorage.setItem(
      "customerRequest",
      document.getElementById("customer-request").value,
    );

    if (selected.value == "credit-card") {
      window.location.href = "confirm2.html";
    } else {
      alert("Please choose Credit Card to this page.");
    }
  });
}
