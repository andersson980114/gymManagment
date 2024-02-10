import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { useUserContext } from '../../contexts/UserContext';

export default function PublicLayout() {
  const { isLogin  } = useUserContext()
  return isLogin ? (
    <Navigate to="/home" />
  ) : (
    <PublicLayoutContainer>
      <Outlet />
    </PublicLayoutContainer>
  );
}

const PublicLayoutContainer = styled.div`
  height: 100vh;   
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('images/backgroundLogin.jpg');  
  background-size: cover;
  background-position: center; 
`;