import attachVideoPlayButtons from "./attachVideoPlayButtons.js";

export default function observeVideos() {
  const desktopVideos = document.querySelectorAll(".js-video-desktop");
  const videosMap = new Map();

  const videoObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      const desktopVideo = entry.target;
      const mobileVideo = videosMap.get(desktopVideo);

      if (entry.isIntersecting) {
        try {
          await desktopVideo.play();
          await mobileVideo.play();
        } catch {
          videosMap.forEach((_, videoDesktop) => {
            videoObserver.unobserve(videoDesktop);
          });
          attachVideoPlayButtons();
        }
      } else {
        desktopVideo.pause();
        mobileVideo.pause();
      }
    });
  }, videoObserverOptions);

  desktopVideos.forEach((desktopVideo) => {
    const mobileVideo = desktopVideo
      .closest(".js-videos")
      .querySelector(".js-video-mobile");

    videosMap.set(desktopVideo, mobileVideo);
    videoObserver.observe(desktopVideo);

    desktopVideo.controls = false;
    mobileVideo.controls = false;
  });
}
