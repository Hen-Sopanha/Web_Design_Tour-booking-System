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
  
      const destRates = {
        kompot: 55,
        sihanoukville: 70,
        battambang: 48,
        siemreap: 85,
        kohkong: 62,
        kep: 68,
      };
  
      const destNames = {
        kompot: 'Kompot',
        sihanoukville: 'Sihanoukvill',
        battambang: 'Battambang',
        siemreap: 'Siem Reap',
        kohkong: 'Koh Kong',
        kep: 'Kep',
      };
  
      const vibeMulti = {
        Temple: 1.0,
        adventure: 1.15,
        Nature: 0.95,
        Beach: 1.05,
      };
  
      function updatePreviewAndTotal() {
        let destKey = destSelect.value;
        let nights = parseInt(nightsSlider.value) || 1;
        let travelers = parseInt(travelersInput.value) || 1;
        let vibeKey = vibesSelect.value;
        let budgetPerNight = parseInt(budgetSlider.value) || 100;
  
        // ✅ FIX: fallback base rate changed from 55 to 30
        let baseRate = destRates[destKey] || 30;
        let finalRate = ((baseRate * 0.6) + (budgetPerNight * 0.4)) * (vibeMulti[vibeKey] || 1);
  
        let total = Math.round(finalRate * nights * travelers);
  
        previewDest.innerText = "🔍 " + (destNames[destKey] || "Unknown");
        previewNights.innerText = `${nights} night${nights !== 1 ? 's' : ''}`;
        previewTravelers.innerText = `${travelers} ${travelers === 1 ? 'person' : 'people'}`;
        previewStyle.innerText = vibeKey;
        previewBudget.innerText = `$${budgetPerNight}`;
        previewNotes.innerText = specialTextarea.value || "—";
        totalAmountSpan.innerText = `$${total.toLocaleString()}`;
        liveMsgSpan.innerText = `${destNames[destKey] || ""}`;
      }
  
      function bindEvents() {
        destSelect.addEventListener('change', updatePreviewAndTotal);
        nightsSlider.addEventListener('input', () => {
          nightsValueSpan.innerText = `${nightsSlider.value} nights`;
          updatePreviewAndTotal();
        });
        travelersInput.addEventListener('input', updatePreviewAndTotal);
        vibesSelect.addEventListener('change', updatePreviewAndTotal);
        budgetSlider.addEventListener('input', () => {
          budgetValueSpan.innerText = `$${budgetSlider.value}`;
          updatePreviewAndTotal();
        });
        specialTextarea.addEventListener('input', updatePreviewAndTotal);
      }
  
      bindEvents();
      updatePreviewAndTotal();
  
    })();
  
});