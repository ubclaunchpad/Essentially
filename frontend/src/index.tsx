import App from './App';
import ThemeProvider from './context/ThemeContent'
import { createRoot } from 'react-dom/client';
import Home from './pages';
const container = document.getElementById('launchpad-essentially');
const root = createRoot(container!);

if (process.env.name === 'web') {
  root.render(<ThemeProvider>
      <Home />
  </ThemeProvider>);
} else {
  root.render(<ThemeProvider>
      <App />
  </ThemeProvider>);
}
