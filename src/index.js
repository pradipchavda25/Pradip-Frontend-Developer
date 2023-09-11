import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SpaceXProvider } from './context/SpacexContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SpaceXProvider>
      <App />
    </SpaceXProvider>
  </React.StrictMode>,
);

reportWebVitals();
