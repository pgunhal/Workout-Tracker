import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { ToastContainer, toast } from 'react-toastify';
// import { BrowserRouter } from 'react-router-dom'
import { WorkoutsContextProvider } from './context/WorkoutsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
    <App />
    </WorkoutsContextProvider>
  </React.StrictMode>
);

