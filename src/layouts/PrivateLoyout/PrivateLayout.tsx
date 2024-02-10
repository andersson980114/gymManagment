import React from 'react' 
import { Outlet, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar'

import { useUserContext } from '../../contexts/UserContext';

const PrivateLayout = () => {
  
  const { isLogin  } = useUserContext()
  return isLogin ? (
    <>
      <main style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}> 
        <div>  
          <NavBar />
        </div>
        <div style={{flexGrow:1, padding:20}}>
          <Outlet />
        </div>  
    </main>
    </>
  ) : (
    <Navigate to="/" />
  );
}



export default PrivateLayout
