chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
    });
});

// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ['content.js'],
//     });
// });

// chrome.chrome.tabs.query({ active: true, currentWindow: true },
//     function(tabs) {
//         console.log(tabs);
//         chrome.tabs.sendMessage(
//             tabs[0].id, { greeting: 'hello' },
//             function(response) {
//                 console.log('hello');
//                 console.log(response);
//             }
//         );
//     }
// );

function run() {
    console.log('aa');
    console.log(document.getElementById('amsmdjdnkne3kfwnlfnnfljnaa'));
    if (document.getElementById('amsmdjdnkne3kfwnlfnnfljnaa')) {
        document.getElementById('amsmdjdnkne3kfwnlfnnfljnaa').remove();

        console.log('aa');
    } else {
        const newdiv = document.createElement('div');
        newdiv.setAttribute('id', 'overlay');
        const i = document.createElement('iframe');
        i.setAttribute('id', 'amsmdjdnkne3kfwnlfnnfljnaa');
        i.src = chrome.runtime.getURL('build/index.html');
        i.setAttribute('scrolling', 'no');
        newdiv.appendChild(i);
        org_html = document.body.innerHTML;
        document.body.appendChild(i);
        console.log('aa');
        console.log(document.getElementById('amsmdjdnkne3kfwnlfnnfljnaa'));
    }
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: run,
    });
});

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse){
    console.log(request); 
}