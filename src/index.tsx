import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom'
import { router } from './routers'; 
import { UserContextProvider } from './contexts/UserContext';
import { DataContextProvider } from './contexts/DataContext';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <DataContextProvider>
        <RouterProvider router={router}/>
      </DataContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

