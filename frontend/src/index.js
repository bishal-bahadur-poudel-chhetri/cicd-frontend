import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Your main React component

// Ensure this is correct
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Target container is not a DOM element.");
}
