import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import AuthProvider from './context/AuthContext';
import ChatProvider from './context/ChatContext';
import ContactProvider from './context/ContactContext';
import SocketIoProvider from './context/SocketIoContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ContactProvider>
        <ChatProvider>
          <SocketIoProvider>
            <App />
          </SocketIoProvider>
        </ChatProvider>
      </ContactProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

