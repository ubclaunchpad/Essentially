// TODO: Configure TypeScript for the content scripts
function addstylesheet(filename) {
    var link = document.createElement('link');
    link.href = chrome.runtime.getURL(filename);
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
}

addstylesheet('styles.css');

function getPageText() {

    let title = "";

    const titleHTML = document.querySelector('meta[name="title"], meta[itemprop="title"], meta[name="name"], meta[itemprop="name"], meta[name="headline"]');
    if (titleHTML) {
        title = titleHTML.getAttribute("content");
    }

    let website = "";

    const websiteHTML = document.querySelector('meta[property*="site_name"], meta[name="application-name"]');

    if (websiteHTML) {
        website = websiteHTML.getAttribute("content");
    }

    let description = "";

    const descriptionHTML = document.querySelector('meta[name="description"], meta[itemProp="description"]');

    if (descriptionHTML) {
        description = descriptionHTML.getAttribute("content");
    }

    let date = "";

    const dateHTML = document.querySelector('meta[itemProp="datePublished"]');
    if (dateHTML) {
        date = dateHTML.getAttribute("content");
    }

    const allText = Array.from(document.body.getElementsByTagName('p')).map(
        (e) => e.innerHTML
    );

    let body = [];

    for (const text of allText) {
        const span_regex = /<span.*>/g;
        const a_tag_regex = /<\/?a([^>])*>/g;

        if (text.charAt(0) !== '<' && !span_regex.exec(text)) {
            body.push(text.replaceAll(a_tag_regex, ''));
        }
    }


    return {
        title: title,
        date: date,
        author: "",
        website: website,
        body: body
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