chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
    });
});

chrome.runtime.onInstalled.addListener(async() => {
    let url = chrome.runtime.getURL('build/tab/index.html');
    let tab = await chrome.tabs.create({ url });
    console.log(`Created tab ${tab.id}`);
});

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
    console.log(request);
}