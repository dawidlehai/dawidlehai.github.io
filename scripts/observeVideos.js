import attachVideoPlayButtons from "/scripts/attachVideoPlayButtons.js";

/**
 * Videos are played with JS because it is the only way to lazy load them with
 * preload="metadata". If videos had autoplay, they would be downloaded immediately.
 */
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
          await mobileVideo?.play();
        } catch {
          videosMap.forEach((_, videoDesktop) => {
            videoObserver.unobserve(videoDesktop);
          });
          attachVideoPlayButtons();
        }
      } else {
        desktopVideo.pause();
        mobileVideo?.pause();
      }
    });
  }, videoObserverOptions);

  desktopVideos.forEach((desktopVideo) => {
    const mobileVideo = desktopVideo
      .closest(".js-videos")
      .querySelector(".js-video-mobile");

    videosMap.set(desktopVideo, mobileVideo);
    videoObserver.observe(desktopVideo);

    /**
     * Controls attribute is added to the video elements as a fallback,
     * in case the user has disabled JavaScript or the Intersection Observer API.
     */
    desktopVideo.controls = false;
    if (mobileVideo) mobileVideo.controls = false;
  });
}
