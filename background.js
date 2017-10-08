// Set badge background color to red
chrome.browserAction.setBadgeBackgroundColor({color: 'red'});

// Show the number of performed replacements in the badge text
chrome.runtime.onMessage.addListener(
  function(request, sender) {
    chrome.browserAction.setBadgeText({
      text: request.replacements,
      tabId: sender.tab.id
    });
  }
);
