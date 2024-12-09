function attachVideoPlayButtons() {
  const playText = "Play";
  const pauseText = "Pause";
  const buttonClass = "video-play-button";
  const videoContainers = document.querySelectorAll(".js-videos");

  videoContainers.forEach(function attachPlayButton(container) {
    const desktopVideo = container.querySelector(".js-video-desktop");
    const mobileVideo = container.querySelector(".js-video-mobile");

    if (desktopVideo && mobileVideo) {
      const button = document.createElement("button");
      button.classList.add(buttonClass);
      button.innerText = playText;

      function handleVideoButtonClick() {
        if (desktopVideo.paused) {
          desktopVideo.play();
          mobileVideo.play();
          button.innerText = pauseText;
        } else {
          desktopVideo.pause();
          mobileVideo.pause();
          button.innerText = playText;
        }
      }

      button.addEventListener("click", handleVideoButtonClick);
      container.appendChild(button);
    }
  });
}

export default attachVideoPlayButtons;
