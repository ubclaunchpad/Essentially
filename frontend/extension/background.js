chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
    });
});

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log(tabs);
    chrome.tabs.sendMessage(
        tabs[0].id, { greeting: 'hello' },
        function(response) {
            console.log('hello');
            console.log(response);
        }
    );
});