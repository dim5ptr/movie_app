import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

// Use ReactDOM.render
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
