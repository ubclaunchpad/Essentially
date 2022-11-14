import './App.css';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function App() {

  const navigate = useNavigate();


  const getArticle = () => {
      navigate("/article");
  }

  return (
    <div>
      <h1>TLDR</h1>
      {process.env.name === 'DEVELOPMENT' && <h2>Running Development Mode</h2>}
    <button onClick={getArticle}>
        Get Article
    </button>
    </div>
  );
}

export default App;
