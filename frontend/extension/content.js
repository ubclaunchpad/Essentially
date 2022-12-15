// TODO: Configure TypeScript for the content scripts
// function addstylesheet(filename) {
//     var link = document.createElement('link');
//     link.href = chrome.runtime.getURL(filename);
//     link.type = 'text/css';
//     link.rel = 'stylesheet';
//     document.getElementsByTagName('head')[0].appendChild(link);
// }
// addstylesheet('styles.css');

function selectQualifiedContentFromDOM(selectors, qualifiedName) {
    const resHTML = document.querySelector(selectors);
    return resHTML == null ? undefined : resHTML.getAttribute(qualifiedName);
}

function getPageText() {
    let dateSearch = selectQualifiedContentFromDOM('meta[property*="time"]', "content");
    const date = (dateSearch == null ? new Date() : new Date(dateSearch)).toLocaleDateString();

    let siteSearch = selectQualifiedContentFromDOM('meta[name*="site"]', "content");
    const site = siteSearch ?? "@news";

    let authorSearch = selectQualifiedContentFromDOM('meta[name*="author"]', "content");
    const author = authorSearch ?? site;

    let titleSearch = selectQualifiedContentFromDOM('meta[name*="title"], meta[property*="title"]', "content");
    const title = titleSearch ?? document.title;

    let iconSearch = selectQualifiedContentFromDOM('link[rel*="icon"]', "href");
    const icon = iconSearch ?? "/favicon.ico";

    const allText = Array.from(document.body.getElementsByTagName('p')).map(
        (e) => e.innerText
    );

    return {
        title: title,
        date: date,
        author: author,
        website: window.location.href,
        icon: icon,
        body: allText
    };
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({ text: getPageText() });
});

window.addEventListener('mouseup', wordSelected);

function wordSelected() {
    let selectedText = window.getSelection().toString();
    console.log(selectedText);
    if (selectedText.length > 0) {
        let message = {
            text: selectedText,
        };
        chrome.runtime.sendMessage(message);
        const boxp = document.createElement('p');
        boxp.setAttribute('id', 'box');
        document.body.appendChild(boxp);
    }
}