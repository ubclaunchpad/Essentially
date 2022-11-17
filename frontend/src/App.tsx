import './App.css';
import { useState } from 'react';

function App() {
  const [text, setText] = useState([]);

  const callExtension = () => {
    let text = '';
    Array.from(document.body.getElementsByTagName('p')).forEach(
      (element) => (text += element.innerText)
    );

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

  const close = () => {
    setText([]);
  };

  return (
    <div className="main">
      <h1>TLDR</h1>

      {text.length > 0 && (
        <div className="article">
          {text.map((t) => (
            <p>{t}</p>
          ))}
        </div>
      )}

      {!text.length && (
        <button onClick={() => callExtension()}>Summarize</button>
      )}
      {text.length > 0 && <button onClick={() => close()}>close</button>}
    </div>
  );
}

export default App;
