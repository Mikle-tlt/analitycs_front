import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/app/app";
import './style.css';
import { ThemeProvider } from './utils';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

