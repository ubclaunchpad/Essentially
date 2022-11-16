// TODO: Configure TypeScript for the content scripts
function addstylesheet(filename) {
    var link = document.createElement('link');
    link.href = chrome.runtime.getURL(filename);
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
}

const newdiv = document.createElement('div');
newdiv.setAttribute('id', 'overlay');
addstylesheet('styles.css');
const i = document.createElement('iframe');
i.src = chrome.runtime.getURL('build/index.html');
i.setAttribute('scrolling', 'no');
newdiv.appendChild(i);
org_html = document.body.innerHTML;
document.body.appendChild(newdiv);

function getPageText() {
    let res = [];
    const allText = Array.from(document.body.getElementsByTagName('p')).map(
        (e) => e.innerHTML
    );

    for (const text of allText) {
        const span_regex = /<span.*>/g;
        const a_tag_regex = /<\/?a([^>])*>/g;

        if (text.charAt(0) !== '<' && !span_regex.exec(text)) {
            res.push(text.replaceAll(a_tag_regex, ''));
        }
    }
    return res;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({ text: getPageText() });
});