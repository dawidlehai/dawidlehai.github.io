const html = document.documentElement;
const isReferrerSameOrigin = document.referrer.startsWith(
  window.location.origin
);

export default function modifyAnchorClickHandler(event) {
  const isAnchor = event.target.tagName === "A";

  if (isAnchor) {
    /**
     * If the anchor is a hash link, smooth scroll to the target.
     * Smooth scrolling is disabled for better View Transition API handling.
     * Otherwise, going back to the previous page would always slowly scroll from the top.
     */
    const isHash = event.target.getAttribute("href")?.startsWith("#");

    if (isHash) {
      html.style.scrollBehavior = "smooth";

      let isScrolling;

      function handleScroll() {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(function setScrollToAuto() {
          html.style.scrollBehavior = "auto";
          window.removeEventListener("scroll", handleScroll);
        }, 100);
      }

      window.addEventListener("scroll", handleScroll);
    } else if (isReferrerSameOrigin) {
      /**
       * Instead of navigating to the previous page with an href like '/',
       * use browser history to automatically scroll to the previous position.
       */
      const isBackButton = event.target.classList.contains("js-back-button");

      if (isBackButton) {
        event.preventDefault();
        window.history.back();
      }
    }
  }
}
