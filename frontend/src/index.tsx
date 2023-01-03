import App from './App';
import { createRoot } from 'react-dom/client';
import Home from './pages';
const container = document.getElementById('launchpad-essentially');
const root = createRoot(container!);

if (process.env.name === 'web') {
  root.render(<Home />);
} else {
  root.render(<App />);
}
