import { travelData } from "../data.js";

// generate image
function getImageUrl(keyword, w = 400, h = 260) {
    return `https://source.unsplash.com/featured/${w}x${h}/?${encodeURIComponent(keyword)}&sig=${Math.random()}`;
}

// render destinations
function renderDestinations() {
    const container = document.getElementById("destinationsContainer");
    if (!container) return;

    container.innerHTML = "";

    travelData.destinations.forEach(dest => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <a href="${dest.link}">
                <img src="${getImageUrl(dest.imageQuery)}" alt="${dest.name}">
            </a>
            <p>${dest.name}</p>
        `;

        container.appendChild(card);
    });
}

// render horizontal cards
function renderCards(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "h-card";

        card.innerHTML = `
            <div class="h-card-img">
                <img src="${getImageUrl(item.imgKeyword)}" alt="${item.title}">
            </div>
            <div class="h-card-content">
                <h4>${item.title} (${item.price})</h4>
                <p>${item.description}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

// init page
document.addEventListener("DOMContentLoaded", () => {
    renderDestinations();
    renderCards("attractiveTripsWrapper", travelData.attractiveTrips);
    renderCards("hiddenGemsWrapper", travelData.hiddenGems);
});