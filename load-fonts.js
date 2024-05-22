"use strict";
(async function loadFonts() {
  const fontsLoaded = sessionStorage.getItem("fontsLoaded");
  if (!fontsLoaded && "fonts" in document) {
    await Promise.all([
      document.fonts.load("1rem JetBrains Mono"),
      document.fonts.load("italic 1rem JetBrains Mono"),
    ]);
    sessionStorage.setItem("fontsLoaded", "true");
  }
  document.documentElement.classList.add("fonts-loaded");
})();
