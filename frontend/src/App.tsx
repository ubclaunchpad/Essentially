import './App.css';

function App() {
  return (
    <div>
      <h1>TLDR</h1>
      {process.env.name === 'DEVELOPMENT' && <h2>Running Development Mode</h2>}
    </div>
  );
}

export default App;
