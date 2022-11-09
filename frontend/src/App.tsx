import './App.css';
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';


function App() {

  const [text, setText] = useState<any>();

  useEffect(() => {
      console.log(location);
      fetch('http://localhost:3000/', {
          method: 'GET',
      })
          .then((res : any) => {
              return res.text();
          })
          .then((text : string) => {
              setText(text);
          });
  }, [])

  return (
    <div>
      <h1>{text}</h1>
      {process.env.name === 'DEVELOPMENT' && <h2>Running Development Mode</h2>}
    </div>
  );
}

export default App;
