export default function addBackNavigationHandlers(selector) {
  if (document.referrer.startsWith(window.location.origin)) {
    const buttons = document.querySelectorAll(selector);

    if (buttons.length > 0) {
      buttons.forEach(function addHandler(button) {
        button.addEventListener("click", function handleBack(event) {
          event.preventDefault();
          window.history.back();
        });
      });
    }
  }
}
