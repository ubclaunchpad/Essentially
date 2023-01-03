function selectQualifiedContentFromDOM(selectors, qualifiedName) {
    const resHTML = document.querySelector(selectors);
    return resHTML == null ? undefined : resHTML.getAttribute(qualifiedName);
}

function getPageText() {
    let dateSearch = selectQualifiedContentFromDOM(
        'meta[property*="time"]',
        'content'
    );
    const date = (
        dateSearch == null ? new Date() : new Date(dateSearch)
    ).toLocaleDateString();

    let siteSearch = selectQualifiedContentFromDOM(
        'meta[name*="site"]',
        'content'
    );
    const site = siteSearch ? siteSearch : '@news';

    let authorSearch = selectQualifiedContentFromDOM(
        'meta[name*="author"]',
        'content'
    );
    const author = authorSearch ? authorSearch : site;

    let titleSearch = selectQualifiedContentFromDOM(
        'meta[name*="title"], meta[property*="title"]',
        'content'
    );
    const title = titleSearch ? titleSearch : document.title;

    let iconSearch = selectQualifiedContentFromDOM('link[rel*="icon"]', 'href');
    const icon = iconSearch ? iconSearch : '/favicon.ico';

    const allText = Array.from(document.body.getElementsByTagName('p')).map(
        (e) => e.innerText
    );

    return {
        title: title,
        date: date,
        author: author,
        website: window.location.href,
        icon: icon,
        body: allText,
    };
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({ text: getPageText() });
});