chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
    });
});

// // TODO: Iframe dynamic sizing issues: needd to actively send size change messages so iframe can adjust its size or iframe will block the page
// function run() {
//     const EXTENSION_IFRAME_ID = 'essentially-extension-v1-lp';
//     if (document.getElementById(EXTENSION_IFRAME_ID)) {
//         document.getElementById(EXTENSION_IFRAME_ID).remove();
//     } else {
//         const extensionFrame = document.createElement('iframe');
//         extensionFrame.setAttribute('id', EXTENSION_IFRAME_ID);
//         extensionFrame.sandbox.add('allow-scripts');
//         extensionFrame.sandbox.add('allow-same-origin');
//         extensionFrame.fetchPriority = 'high';
//         extensionFrame.setAttribute('scrolling', 'no');
//         extensionFrame.src = chrome.runtime.getURL('build/index.html');
//         document.body.appendChild(extensionFrame);
//     }
// }
//
// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: run,
//     });
// });

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
    console.log(request);
}