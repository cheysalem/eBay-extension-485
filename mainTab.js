// NMSU CS485 Fall 2023 Final Project
// this script handles the pop-up menu
console.log("background");

// Declare a variable to store the username
var username;

// Make buttons usable
document.addEventListener("DOMContentLoaded", () => {

  // No scroll bar got from stackoverflow
  var styleElement = document.createElement("style");
  styleElement.id = "remove-scroll-style";
  styleElement.textContent =
    "html::-webkit-scrollbar{display:none !important}" +
    "body::-webkit-scrollbar{display:none !important}";
  document.getElementsByTagName("body")[0].appendChild(styleElement);
});

// For eBay blacklist collapse '+' and '-' collapse
document.addEventListener("DOMContentLoaded", function () {
  var blacklistButton = document.getElementById("blacklist-collapse");

  if (blacklistButton) {
    blacklistButton.addEventListener("click", function () {
      var targetId = this.getAttribute("data-target");
      var targetElement = document.getElementById(targetId);

      this.classList.toggle("active");

      if (this.classList.contains("active")) {
        console.log("'+' clicked");
        targetElement.classList.add("active");
      } else {
        console.log("'-' clicked");
        targetElement.classList.remove("active");
      }
    });
  }
});

// For eBay view blacklist collapse '+' and '-' collapse
document.addEventListener("DOMContentLoaded", function () {
  var blacklistButton = document.getElementById("view-blklist-collapse");
  var usernameInput = document.getElementById("usernameInput");

  if (blacklistButton) {
    blacklistButton.addEventListener("click", function () {
      var targetId = this.getAttribute("data-target");
      var targetElement = document.getElementById(targetId);

      this.classList.toggle("active");

      if (this.classList.contains("active")) {
        console.log("'+' clicked");
        targetElement.classList.add("active");
      } else {
        console.log("'-' clicked");
        targetElement.classList.remove("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var blacklistContent = document.getElementById("blacklist-content");

    var blacklistCollapseButton = document.getElementById("blacklist-collapse");

    if (blacklistCollapseButton) {
      blacklistCollapseButton.addEventListener("click", function () {
        blacklistContent.classList.toggle("collapsed");
      });
    }
  });
});
// For eBay user blacklist collapse '+' and '-' collapse
document.addEventListener("DOMContentLoaded", function () {
  var blacklistButton = document.getElementById("user-blklist-collapse");
  var usernameInput = document.getElementById("usernameInput");

  if (blacklistButton) {
    blacklistButton.addEventListener("click", function () {
      var targetId = this.getAttribute("data-target");
      var targetElement = document.getElementById(targetId);

      this.classList.toggle("active");

      if (this.classList.contains("active")) {
        console.log("'+' clicked");
        targetElement.classList.add("active");
      } else {
        console.log("'-' clicked");
        targetElement.classList.remove("active");
      }
    });
  }

  
  document.addEventListener("DOMContentLoaded", function () {
    var blacklistContent = document.getElementById("blacklist-content");

    var blacklistCollapseButton = document.getElementById("blacklist-collapse");

    if (blacklistCollapseButton) {
      blacklistCollapseButton.addEventListener("click", function () {
        blacklistContent.classList.toggle("collapsed");
      });
    }
  });

});




 

