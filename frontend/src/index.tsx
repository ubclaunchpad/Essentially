import App from './App';
import ThemeProvider from './context/ThemeContent'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<ThemeProvider>
    <App />
</ThemeProvider>);
