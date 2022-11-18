chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
    });
});

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse){
    console.log(request); 
}