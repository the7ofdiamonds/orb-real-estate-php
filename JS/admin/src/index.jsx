import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

document.addEventListener('DOMContentLoaded', function () {
  const adminSevenTech = document.getElementById('admin_seven_tech');

  if (adminSevenTech) {
    ReactDOM.createRoot(adminSevenTech).render(<App />);
  }
});