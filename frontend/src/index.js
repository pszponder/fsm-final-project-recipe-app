import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import Provider for Context Related to Authorization
import { AuthProvider } from './context/AuthProvider';

// Import Provider for Context Related to Data
import { DataProvider } from './context/DataProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
