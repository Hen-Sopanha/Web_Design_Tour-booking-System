const images = document.querySelectorAll(".tour-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");

// 1. OPEN Lightbox
images.forEach(img => {
  img.addEventListener("click", function () {
    lightbox.style.display = "flex";
    // Using getAttribute ensures we grab the path exactly as written in HTML
    lightboxImg.src = this.getAttribute("src"); 
  });
});

// 2. CLOSE when clicking the BIG PHOTO (Back to small)
lightboxImg.addEventListener("click", function () {
  lightbox.style.display = "none";
});

// 3. CLOSE when clicking the background (outside the photo)
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// 4. CLOSE with the button
if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
  });
}