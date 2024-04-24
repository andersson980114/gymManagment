import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DataContextProvider } from './contexts/DataContext';
import { UserContextProvider } from './contexts/UserContext';
import './index.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <DataContextProvider>
        {/* <RouterProvider router={router}/> */}
        <App/>
      </DataContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

