"use strict";
(async function loadFonts() {
  if ("fonts" in document) {
    await Promise.all([
      document.fonts.load("1rem JetBrains Mono"),
      document.fonts.load("italic 1rem JetBrains Mono"),
    ]);
    document.documentElement.classList.add("fonts-loaded");
  }
})();
