var elements = document.getElementsByTagName('*');
var replacements = 0;

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
      var replacedText = text.replace(/!{2,}/g, function() {
        replacements++;
        return '!';
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

