function renderFooter() {
    return `
        <footer class="footer">
            <div class="container">
                <p>&copy; 2026 CamTravel. Group Project: Sopanha, Mengseang, Seyha, Ratha, Picheth.</p>
            </div>
        </footer>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const footerPlaceholder = document.getElementById("footer");
    if (footerPlaceholder) footerPlaceholder.innerHTML = renderFooter();
});