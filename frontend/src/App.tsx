import './App.css';
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';


function App() {

  const [text, setText] = useState<any>();


  return (
    <div>
      <h1>{text}</h1>
      {process.env.name === 'DEVELOPMENT' && <h2>Running Development Mode</h2>}
    </div>
  );
}

export default App;
