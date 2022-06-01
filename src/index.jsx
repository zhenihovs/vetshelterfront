import React from 'react';
import AuthProvider from "./hoc/AuthProvider";
import {BrowserRouter as Router}  from "react-router-dom";
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

