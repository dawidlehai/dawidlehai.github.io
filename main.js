"use strict";

const desktopVideos = document.querySelectorAll(".js-video-desktop");
const videosMap = new Map();

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const mobileVideo = videosMap.get(entry.target);
    const videos = [entry.target, mobileVideo];

    videos.forEach((video) => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
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
