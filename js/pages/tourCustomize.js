document.addEventListener("DOMContentLoaded", function () {

  (function () {

    const destSelect = document.getElementById('destination');
    if (!destSelect) return;

    const nightsSlider = document.getElementById('nightsSlider');
    const nightsValueSpan = document.getElementById('nightsValue');
    const travelersInput = document.getElementById('travelers');
    const vibesSelect = document.getElementById('vibesSelect');
    const budgetSlider = document.getElementById('budgetSlider');
    const budgetValueSpan = document.getElementById('budgetValue');
    const specialTextarea = document.getElementById('specialRequests');

    const previewDest = document.getElementById('previewDest');
    const previewNights = document.getElementById('previewNights');
    const previewTravelers = document.getElementById('previewTravelers');
    const previewStyle = document.getElementById('previewStyle');
    const previewBudget = document.getElementById('previewBudget');
    const previewNotes = document.getElementById('previewNotes');
    const totalAmountSpan = document.getElementById('totalAmount');
    const liveMsgSpan = document.getElementById('liveUpdateMsg');
    const submitBtn = document.getElementById('submitTourBtn');

    const destRates = {
      kampot: 55,
      sihanoukville: 70,
      battambang: 48,
      siemreap: 85,
      kohkong: 62,
      kep: 68,
    };

    const destNames = {
      kampot: 'Kampot',
      sihanoukville: 'Sihanoukville',
      battambang: 'Battambang',
      siemreap: 'Siem Reap',
      kohkong: 'Koh Kong',
      kep: 'Kep',
    };

    const vibeMulti = {
      Temple: 1.0,
      Adventure: 1.15,
      Nature: 0.95,
      Beach: 1.05,
    };

    function updatePreviewAndTotal() {
      let destKey = destSelect.value;
      let nights = parseInt(nightsSlider.value) || 1;
      let travelers = parseInt(travelersInput.value) || 0;

      // Handle multiple vibes
      const selectedChips = document.querySelectorAll('.vibe-chip.selected');
      let selectedVibeKeys = Array.from(selectedChips).map(chip => chip.dataset.value);
      let budgetPerNight = parseInt(budgetSlider.value) || 100;

      let baseRate = destRates[destKey] || 0;
      
      // Combined multiplier: average of selected vibes
      let totalMultiplier = 0;
      if (selectedVibeKeys.length > 0) {
        const sumMultiplier = selectedVibeKeys.reduce((acc, key) => acc + (vibeMulti[key] || 1), 0);
        totalMultiplier = sumMultiplier / selectedVibeKeys.length;
      } else {
        totalMultiplier = 1;
      }

      let total = 0;
      if (destKey && travelers > 0 && selectedVibeKeys.length > 0) {
        let finalRate = ((baseRate * 0.6) + (budgetPerNight * 0.4)) * totalMultiplier;
        total = Math.round(finalRate * nights * travelers);
      }

      previewDest.innerText = destKey ? "🔍 " + (destNames[destKey] || "Unknown") : "Select Destination";
      previewNights.innerText = `${nights} night${nights !== 1 ? 's' : ''}`;
      previewTravelers.innerText = travelers > 0 ? `${travelers} ${travelers === 1 ? 'person' : 'people'}` : "Set travelers";
      previewStyle.innerText = selectedVibeKeys.length > 0 ? selectedVibeKeys.join(", ") : "Select Vibes";
      previewBudget.innerText = `$${budgetPerNight}`;
      previewNotes.innerText = specialTextarea.value || "—";
      totalAmountSpan.innerText = total > 0 ? `$${total.toLocaleString()}` : "$0";
      liveMsgSpan.innerText = destKey ? `${destNames[destKey] || ""}` : "";

      validateForm();
    }

    function validateForm() {
      if (!submitBtn) return;
      
      const form = document.getElementById('customizerForm');
      const selectedChips = document.querySelectorAll('.vibe-chip.selected');
      
      // Native browser validation for required fields (Destination, Travelers)
      const isFormValid = form ? form.checkValidity() : true;
      // Manual check for vibes since they are interactive chips
      const isVibesValid = selectedChips.length >= 1;

      if (isFormValid && isVibesValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('disabled');
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
      } else {
        submitBtn.disabled = true;
        submitBtn.classList.add('disabled');
        submitBtn.style.opacity = "0.5";
        submitBtn.style.cursor = "not-allowed";
      }
    }

    function bindEvents() {
      destSelect.addEventListener('change', updatePreviewAndTotal);
      nightsSlider.addEventListener('input', () => {
        nightsValueSpan.innerText = `${nightsSlider.value} nights`;
        updatePreviewAndTotal();
      });
      travelersInput.addEventListener('input', updatePreviewAndTotal);

      // Updated: Click handler for vibe chips
      const vibeChipsContainer = document.getElementById('vibeChips');
      const vibesHiddenInput = document.getElementById('vibesSelect');

      if (vibeChipsContainer) {
        vibeChipsContainer.addEventListener('click', (e) => {
          const chip = e.target.closest('.vibe-chip');
          if (chip) {
            chip.classList.toggle('selected');
            
            // Sync to hidden input for form submission
            const selectedChips = vibeChipsContainer.querySelectorAll('.vibe-chip.selected');
            const values = Array.from(selectedChips).map(c => c.dataset.value);
            if (vibesHiddenInput) vibesHiddenInput.value = values.join(',');
            
            updatePreviewAndTotal();
          }
        });
      }

      budgetSlider.addEventListener('input', () => {
        budgetValueSpan.innerText = `$${budgetSlider.value}`;
        updatePreviewAndTotal();
      });
      specialTextarea.addEventListener('input', updatePreviewAndTotal);

      // Form submission prevention
      const form = document.getElementById('customizerForm');
      if (form) {
        form.addEventListener('submit', (e) => {
          const travelers = parseInt(travelersInput.value) || 0;
          const selectedChips = document.querySelectorAll('.vibe-chip.selected');
          
          if (!destSelect.value || travelers < 1 || selectedChips.length < 1) {
            e.preventDefault();
            alert('Please fill in all required fields (Destination, Travelers, and at least one Vibe).');
            return false;
          }
        });
      }

      // Extra protection for button clicks
      if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
          if (submitBtn.disabled) {
            e.preventDefault();
          }
        });
      }
    }

    bindEvents();
    updatePreviewAndTotal();

  })();

});