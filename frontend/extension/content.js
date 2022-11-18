// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// TODO: Configure TypeScript for the content scripts
function addstylesheet(filename) {
    var link = document.createElement('link')
    link.href = chrome.runtime.getURL(filename)
    link.type = 'text/css'
    link.rel = 'stylesheet'
    document.getElementsByTagName('head')[0].appendChild(link)
}
const newdiv = document.createElement('div')
newdiv.setAttribute('id', 'overlay')
addstylesheet('styles.css')
const i = document.createElement('iframe')
i.src = chrome.runtime.getURL('build/index.html')
i.setAttribute('scrolling', 'no')
newdiv.appendChild(i)
org_html = document.body.innerHTML
document.body.appendChild(newdiv)

window.addEventListener('mouseup', wordSelected);

function wordSelected(){
    let selectedText = window.getSelection().toString();
    console.log(selectedText);
    if(selectedText.length > 0){
        let message = {
            text : selectedText
        };
        chrome.runtime.sendMessage(message);
        const boxp = document.createElement('p');
        boxp.setAttribute('id', 'box');
        document.body.appendChild(boxp);
    }
}