function copyText(elementId, successMessage) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert(successMessage);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Custom interactive visual select helper for egg styles
function selectEggStyle(element, value) {
    // Unselect all other egg cards
    const cards = document.querySelectorAll('.egg-card');
    cards.forEach(card => card.classList.remove('selected'));

    // Mark chosen element
    element.classList.add('selected');

    // Sync with invisible radio inputs
    const radio = element.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
}

// Prepares custom message and redirects to WhatsApp (using client side text-encode)
function submitEggRequest(event) {
    event.preventDefault();

    const nameInput = document.getElementById('guestName').value.trim();
    const chosenStyle = document.querySelector('input[name="eggStyle"]:checked').value;
    const targetPhone = "447506994559"; // Target phone number (WhatsApp compatible)

    // Constructing clean, readable message text
    const textMessage = `Hello Waverley Stay! 🍳\n\nI would love to have a fresh breakfast egg from your hens!\n\nStyle: *${chosenStyle}*\nRequested by: *${nameInput}*\n\nThank you!`;

    // Encode message for Web URL compatibility
    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

    // Open message in new browser window/tab
    window.open(whatsappUrl, '_blank');
    showToast("Opening WhatsApp to send your breakfast request!");
}

// Clean clipboard utility avoiding alert() prompt popup windows
function copyText(elementId, successMessage) {
    const textElement = document.getElementById(elementId);
    if (!textElement) return;

    const textToCopy = textElement.innerText || textElement.textContent;

    // Robust text copy execution mechanism
    const tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast(successMessage);
        } else {
            console.error("Incompatible command action execution.");
        }
    } catch (err) {
        console.error('Failed to copy fallback context: ', err);
    }

    document.body.removeChild(tempInput);
}

// Custom animated feedback toast replacement for alert()
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');

    if (!toast || !toastText) return;

    clearTimeout(toastTimeout);
    toastText.textContent = message;
    toast.classList.add('show');

    // Hide after 3.5 seconds
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
