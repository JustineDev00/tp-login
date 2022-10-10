import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from './contexts/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </React.StrictMode>
);
//AuthProvider ==> l'élément JSX AuthProvider encadre l'élément App, App est donc l'enfant de AuthProvider. Par défaut App reçoit la valeur initiale de value {auth, setAuth}, où auth = {role : 0}. Cependant tous les enfants peuvent recevoir auth et setAuth!




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
