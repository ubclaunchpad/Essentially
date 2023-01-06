chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
    });
});

chrome.runtime.onInstalled.addListener(async() => {
    chrome.contextMenus.create({
        id: 'web',
        title: 'Open Web app',
        contexts: ['page'],
    });
});

chrome.contextMenus.onClicked.addListener(async(info, tab) => {
    if (tab) {
        let url = chrome.runtime.getURL('build/tab/index.html');
        return chrome.tabs.create({ url });
    }
});