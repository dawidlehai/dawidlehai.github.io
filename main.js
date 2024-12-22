import observeVideos from "/scripts/observeVideos.js";
import modifyAnchorClickHandler from "/scripts/modifyAnchorClickHandler.js";

observeVideos();
document.addEventListener("click", modifyAnchorClickHandler);
