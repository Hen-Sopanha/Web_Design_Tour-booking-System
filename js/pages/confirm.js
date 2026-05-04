const bookingData = JSON.parse(localStorage.getItem("bookingData"));

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && value) element.textContent = value;
}

if (bookingData) {
  setText("summary-tour-name", bookingData.tourName);
  setText("summary-location", bookingData.location);
  setText("summary-name", bookingData.name);
  setText("summary-room", bookingData.room);
  setText("summary-date", bookingData.travelDates);
  setText("summary-travelers", bookingData.travelers);
  setText("summary-total", bookingData.total);

  if (bookingData.addons && bookingData.addons.length > 0) {
    setText("summary-addons", bookingData.addons.join(", "));
  } else {
    setText("summary-addons", "No add-ons");
  }
}

document.querySelector(".btn-continue").addEventListener("click", function () {
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

const currencySelector = document.getElementById("currency-selector");

if (currencySelector) {
  currencySelector.addEventListener("click", function (e) {
    this.classList.toggle("is-open");
    e.stopPropagation();
  });

  document.addEventListener("click", function () {
    currencySelector.classList.remove("is-open");
  });

  document.querySelectorAll(".currency-option").forEach(function (option) {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      const currency = this.dataset.currency;
      document.getElementById("currency-label").textContent =
        "Currency (" + currency + ")";
      document.querySelectorAll(".currency-option").forEach(function (o) {
        o.classList.remove("active");
      });
      this.classList.add("active");
      localStorage.setItem("selectedCurrency", currency);
      localStorage.setItem("currencyRate", this.dataset.rate);
      currencySelector.classList.remove("is-open");
    });
  });
}
