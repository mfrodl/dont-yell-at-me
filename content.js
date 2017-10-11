// Total number of replacements on a page, shown in the badge
var replacements = 0;

// Regular expressions
const YELLING = /!{2,}/g;
const QUESTION = /(!+\?|\?[?!])[?!]*/g;
const SYMBOLS = /[?!]{2,}/g;

// Function to remove extra exclamation marks
function shutUp() {
  var elements = document.getElementsByTagName('*');

  for (let element of elements) {
    // Do not perform replacement inside scripts
    if (element.tagName == 'SCRIPT') {
      continue;
    }

    for (let node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        var text = node.nodeValue;

        // Replace two or more consecutive exclamation marks with a single one;
        // keep track or the number of replacements
        var replacedText = text.replace(YELLING, function() {
          replacements++;
          return '!';
        });

        var replacedText = replacedText.replace(QUESTION, function() {
          replacements++;
          return '?';
        });

        // If a replacement occurred, modify the DOM accordingly and update the
        // badge to show the total number of replacements
        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
          chrome.runtime.sendMessage({replacements: replacements.toString()});
        }
      }
    }
  }
}

// Remove exclamation marks as soon as DOM is ready
document.addEventListener('DOMContentLoaded', shutUp);

// Observe DOM mutations to remove dynamically added exclamation marks
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (SYMBOLS.test(mutation.target.innerText)) {
      shutUp();
    }
  });
});

var config = {
  childList: true,
  characterData: true,
  subtree: true
};

observer.observe(document.body, config);
