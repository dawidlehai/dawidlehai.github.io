const html = document.documentElement;
const isReferrerSameOrigin = document.referrer.startsWith(
  window.location.origin
);

export default function modifyAnchorClickHandler(event) {
  const isAnchor = event.target.tagName === "A";

  if (isAnchor) {
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
      const isBackButton = event.target.classList.contains("js-back-button");

      if (isBackButton) {
        event.preventDefault();
        window.history.back();
      }
    }
  }
}
