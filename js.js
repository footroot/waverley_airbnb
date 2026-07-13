function copyText(elementId, successMessage) {
const text = document.getElementById(elementId).innerText;
navigator.clipboard.writeText(text).then(() => {
alert(successMessage);
}).catch(err => {
console.error('Failed to copy: ', err);
});
}
