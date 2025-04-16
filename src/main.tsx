// Import the polyfill first to ensure it's loaded before any Material-UI components
import './app/polyfills/react-dom-polyfill';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
