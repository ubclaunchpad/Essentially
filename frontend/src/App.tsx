import './App.css';
import { useState } from 'react';

function App() {
  const [text, setText] = useState([]);

  const callExtension = () => {
    console.log(window.document.body.innerHTML);
    let text = '';
    Array.from(document.body.getElementsByTagName('p')).forEach(
      (element) => (text += element.innerText)
    );
    console.log(text);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { greeting: 'hello' },
        function (response) {
          setText(response.text);
        }
      );
    });
  };

  return (
    <div>
      <h1>TLDR</h1>
      <button onClick={() => callExtension()}>Extract Article</button>
      <div className="article">
        {text.map((t) => (
          <p>{t}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
