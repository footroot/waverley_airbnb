// header to icon on scroll
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const laptopQuery = window.matchMedia("(min-width: 1024px)");
    
    function checkScroll() {
        //Only run the shrink Logic on Laptops screen and Larger
        if (laptopQuery.matches && window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    // Listen for scroll events
    window.addEventListener("scroll", checkScroll);

    // Listen for screen resizing (e.g., if user shrinks thei browser window)
    laptopQuery.addEventListener("change", checkScroll);
})

// Store selected style (default to Boiled)
let currentStyleSelection = 'Boiled';

// Select helper for interactive cooking selection cards
function selectEggStyle(element, value) {
    // Unselect all other egg cards
    const cards = document.querySelectorAll('.egg-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    // Mark chosen element as selected
    element.classList.add('selected');
    currentStyleSelection = value;

    // Sync with invisible radio inputs
    const radio = element.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
}

// Package preference message and trigger redirect to WhatsApp
function submitEggRequest() {
    const targetPhone = "447506994559"; // Your WhatsApp Contact Phone
    
    // Crafting direct, clean message
    const textMessage = `Hello Waverley Stay! 🍳\n\nI would love to have a fresh breakfast egg from your hens!\n\nStyle: *${currentStyleSelection}*\n\nThank you!`;
    
    // Safe URL character encoding
    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

    // Open redirect link in new viewport tab
    window.open(whatsappUrl, '_blank');
    showToast("Opening WhatsApp to send your egg request!");
}

// Reliable clipboard utility that does not block UI threads
function copyText(elementId, successMessage) {
    const textElement = document.getElementById(elementId);
    if (!textElement) return;

    const textToCopy = textElement.innerText || textElement.textContent;

    // Backup programmatic selector wrapper
    const tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast(successMessage);
        } else {
            console.error("Browser failed copy command processing.");
        }
    } catch (err) {
        console.error('Fallback clipboard processing failed: ', err);
    }
    
    document.body.removeChild(tempInput);
}

// Custom non-intrusive animated feedback Toast (No alerts used)
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    
    if (!toast || !toastText) return;

    clearTimeout(toastTimeout);
    toastText.textContent = message;
    toast.classList.add('show');

    // Fade back out after 3.2 seconds
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}
