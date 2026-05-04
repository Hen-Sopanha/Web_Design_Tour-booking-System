document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".tour-card img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("closeBtn");
  const filter = document.getElementById("tourFilter");
  const cards = document.querySelectorAll(".tour-card");

  // 1. OPEN Lightbox
  images.forEach(img => {
    img.addEventListener("click", function () {
      lightbox.style.display = "flex";
      lightboxImg.src = this.getAttribute("src");
    });
  });

  // 2. CLOSE when clicking the photo
  lightboxImg.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  // 3. CLOSE when clicking background
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // 4. CLOSE with button
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      lightbox.style.display = "none";
    });
  }

  // 5. FILTER LOGIC
  if (filter) {
    filter.addEventListener("change", function () {
      const value = this.value;

      cards.forEach(card => {
        const category = card.getAttribute("data-category");

        if (value === "all" || category === value) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
    // DELETED the broken "filter.addEventListener("change", ...)" line from here
  }

const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-btn");

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  cards.forEach(card => {
    // This looks at the text inside the <h3> tag (e.g., "Tour F")
    const tourTitle = card.querySelector("h3").textContent.toLowerCase();

    if (tourTitle.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Trigger search when the button is clicked
searchBtn.addEventListener("click", performSearch);

// Optional: Trigger search when the user presses "Enter" in the input box
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    performSearch();
  }
});
});