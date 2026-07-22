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

    // Listen for screen resizing (e.g., if user shrinks their browser window)
    laptopQuery.addEventListener("change", checkScroll);

    initCookieBanner();
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
    window.open(whatsappUrl, '_blank', 'noopener');
    showToast("Opening WhatsApp to send your egg request!");
}

// Reliable clipboard utility with modern fallback support
async function copyText(elementId, successMessage) {
    const textElement = document.getElementById(elementId);
    if (!textElement) return;

    const textToCopy = textElement.innerText.trim() || textElement.textContent.trim();

    if (!textToCopy) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(textToCopy);
            showToast(successMessage);
            return;
        } catch (err) {
            console.warn('Clipboard API failed, falling back to execCommand.', err);
        }
    }

    const tempInput = document.createElement('textarea');
    tempInput.value = textToCopy;
    tempInput.style.position = 'fixed';
    tempInput.style.left = '-9999px';
    tempInput.setAttribute('readonly', '');
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast(successMessage);
        } else {
            console.error('Browser failed copy command processing.');
        }
    } catch (err) {
        console.error('Fallback clipboard processing failed: ', err);
    } finally {
        document.body.removeChild(tempInput);
    }
}

// Keyboard support for egg style cards
function handleEggKeydown(event, element, value) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectEggStyle(element, value);
    }
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

function initCookieBanner() {
    const consent = getCookieConsent();
    if (consent) {
        return;
    }
    showCookieBanner();
}

function acceptCookies() {
    setCookieConsent('accepted');
    hideCookieBanner();
    showToast('Cookies accepted.');
}

function rejectCookies() {
    setCookieConsent('rejected');
    hideCookieBanner();
    showToast('Non-essential cookies rejected.');
}

function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.remove('hidden');
    }
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.add('hidden');
    }
}

function showCookieDetails(event) {
    event.preventDefault();
    const details = document.getElementById('cookie-details');
    if (details) {
        details.classList.toggle('hidden');
    }
}

function hideCookieDetails() {
    const details = document.getElementById('cookie-details');
    if (details) {
        details.classList.add('hidden');
    }
}

function getCookieConsent() {
    try {
        return window.localStorage.getItem('waverley_cookie_consent');
    } catch (err) {
        return getCookie('waverley_cookie_consent');
    }
}

function setCookieConsent(value) {
    try {
        window.localStorage.setItem('waverley_cookie_consent', value);
    } catch (err) {
        setCookie('waverley_cookie_consent', value, 365);
    }
}

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, cookie) => {
        const [key, value] = cookie.split('=');
        return key === name ? decodeURIComponent(value) : r;
    }, '');
}
