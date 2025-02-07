/**
 * Some browsers require a user gesture to start playing a video.
 * This function attaches a play button to each project with a video.
 */
export default function attachVideoPlayButtons() {
  const playText = "Play";
  const buttonClasses = "video-play-button button js-video-play-button";
  const buttonHiddenClass = "video-play-button--hidden";
  const projectContainers = document.querySelectorAll(".js-project");

  projectContainers.forEach(function attachPlayButton(container) {
    const buttonIsPresent = container.querySelector(".js-video-play-button");
    if (buttonIsPresent) return;

    const desktopVideo = container.querySelector(".js-video-desktop");
    const mobileVideo = container.querySelector(".js-video-mobile");

    if (desktopVideo) {
      const button = document.createElement("button");
      button.classList = buttonClasses;
      button.innerText = playText;

      function handleVideoButtonClick() {
        desktopVideo.play();
        mobileVideo?.play();
        button.classList.add(buttonHiddenClass);
      }

      button.addEventListener("click", handleVideoButtonClick);

      let videosContainer = container.querySelector(".js-videos");
      if (videosContainer.parentElement instanceof HTMLAnchorElement) {
        videosContainer = videosContainer.parentElement;
      }

      videosContainer.insertAdjacentElement("afterend", button);
    }
  });
}
