import attachVideoPlayButtons from "./scripts/attachVideoPlayButtons.js";

const desktopVideos = document.querySelectorAll(".js-video-desktop");
const videosMap = new Map();

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const desktopVideo = entry.target;
    const mobileVideo = videosMap.get(desktopVideo);

    if (entry.isIntersecting) {
      console.log("intersection");
      desktopVideo
        .play()
        .then(() => {
          mobileVideo.play();
        })
        .catch(() => {
          videosMap.forEach((_, videoDesktop) => {
            videoObserver.unobserve(videoDesktop);
          });
          attachVideoPlayButtons();
        });
    } else {
      desktopVideo.pause();
      mobileVideo.pause();
    }
  });
}, options);

desktopVideos.forEach((video) => {
  const mobileVideo = video
    .closest(".js-videos")
    .querySelector(".js-video-mobile");

  videosMap.set(video, mobileVideo);
  videoObserver.observe(video);

  video.controls = false;
  mobileVideo.controls = false;
});
