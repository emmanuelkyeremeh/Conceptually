//fullScreenEnabled boolean variable
const fullScreenEnabled = !!(
  document.fullscreenEnabled ||
  document.mozFullScreenEnabled ||
  document.msFullscreenEnabled ||
  document.webkitSupportsFullscreen ||
  document.webkitFullscreenEnabled ||
  document.createElement("video").webkitRequestFullScreen
);

//event listener to initiate after DOMContentLoaded
window.addEventListener("DOMContentLoaded", initiate);

function initiate() {
  //video player components
  const $videoContainer = document.getElementById("video-container");
  const $video = document.getElementById("video");
  const $videoControls = document.getElementById("video-controls");
  const $playpause = document.getElementById("playpause");
  const $stop = document.getElementById("stop");
  const $mute = document.getElementById("mute");
  const $volinc = document.getElementById("volinc");
  const $voldec = document.getElementById("voldec");
  const $progress = document.getElementById("progress");
  const $fullscreen = document.getElementById("fullscreen");
  let change = false;

  //check if fullscreen is enabled to decide whether or not to display the fullscreen button
  if (!fullScreenEnabled) {
    $fullscreen.style.display = "none";
  }

  //event listeners
  //fullscreen status event listeners
  document.addEventListener("fullscreenchange", function (e) {
    setFullscreenData(!!(document.fullscreen || document.fullscreenElement));
  });
  document.addEventListener("webkitfullscreenchange", function () {
    setFullscreenData(!!document.webkitIsFullScreen);
  });
  document.addEventListener("mozfullscreenchange", function () {
    setFullscreenData(!!document.mozFullScreen);
  });
  document.addEventListener("msfullscreenchange", function () {
    setFullscreenData(!!document.msFullscreenElement);
  });

  //controls event listeners
  $fullscreen.addEventListener("click", function (e) {
    handleFullscreen($video);
  });

  $playpause.addEventListener("click", function (e) {
    if ($video.paused || $video.ended) $video.play();
    else $video.pause();
  });

  $stop.addEventListener("click", function (e) {
    $video.pause();
    $video.currentTime = 0;
    $progress.value = 0;
  });

  $mute.addEventListener("click", function (e) {
    $video.muted = !$video.muted;
  });

  $volinc.addEventListener("click", function (e) {
    alterVolume($video, "+");
  });

  $voldec.addEventListener("click", function (e) {
    alterVolume($video, "-");
  });

  $video.addEventListener("loadedmetadata", function (e) {
    $progress.setAttribute("max", $video.duration);
    if (!$progress.value) $progress.classList.remove("fill");
    else $progress.classList.add("fill");
  });

  $video.addEventListener("timeupdate", function () {
    if (!$progress.getAttribute("max"))
      progress.setAttribute("max", video.duration);
    $progress.value = video.currentTime;
    if (!$progress.value) $progress.classList.remove("fill");
    else $progress.classList.add("fill");
  });

  $progress.addEventListener("change", function (e) {
    change = true;
    $video.currentTime = this.value;
    if (!$progress.value) $progress.classList.remove("fill");
    else $progress.classList.add("fill");
  });
}

function handleFullscreen($element) {
  if (isFullScreen()) {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    setFullscreenData(false);
  } else {
    if ($element.requestFullscreen) $element.requestFullscreen();
    else if ($element.mozRequestFullScreen) $element.mozRequestFullScreen();
    else if ($element.webkitRequestFullScreen)
      $element.webkitRequestFullScreen();
    else if ($element.msRequestFullscreen) $element.msRequestFullscreen();
    setFullscreenData(true);
  }
}

function isFullScreen() {
  return !!(
    document.fullscreen ||
    document.webkitIsFullScreen ||
    document.mozFullScreen ||
    document.msFullscreenElement ||
    document.fullscreenElement
  );
}

function setFullscreenData(state) {
  const $videoContainer = document.getElementById("video-container");
  $videoContainer.setAttribute("data-fullscreen", !!state);
}

function alterVolume($videoElement, dir) {
  let currentVolume = Math.floor($videoElement.volume * 10) / 10;
  if (dir === "+") {
    if (currentVolume < 1) $videoElement.volume += 0.1;
  } else if (dir === "-") {
    if (currentVolume > 0) $videoElement.volume -= 0.1;
  }
}
