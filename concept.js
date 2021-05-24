//Open london tab by default
window.onload = function () {
  document.querySelector(".default-open").style.display = "block";
};

function openIframe(evt, iframe) {
  //Declare all variables
  let i, iframes, buttons;

  //Get all iframe elements and hide them
  iframes = document.getElementsByTagName("iframe");
  for (i = 0; i < iframes.length; i++) {
    iframes[i].style.display = "none";
  }

  //Get all elements with class="tablinks" and remove the class "active"
  buttons = document.getElementsByClassName("button");
  for (i = 0; i < buttons.length; i++) {
    buttons[i].className = buttons[i].className.replace("active", "");
  }

  // Show the current tab and add an "active" class to the button that opened the tab
  document.getElementById(iframe).style.display = "block";
  evt.currentTarget.className += " active";
}
