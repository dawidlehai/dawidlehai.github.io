function attachVideoPlayButtons() {
  const videoContainers = document.querySelectorAll(".js-videos");

  videoContainers.forEach((container) => {
    const desktopVideo = container.querySelector(".js-video-desktop");
    const mobileVideo = container.querySelector(".js-video-mobile");

    if (desktopVideo && mobileVideo) {
      const button = document.createElement("button");
      button.innerText = "Play";

      button.addEventListener("click", () => {
        if (desktopVideo.paused) {
          desktopVideo.play();
          mobileVideo.play();
        } else {
          desktopVideo.pause();
          mobileVideo.pause();
        }
      });

      container.appendChild(button);
    }
  });
}

export default attachVideoPlayButtons;
