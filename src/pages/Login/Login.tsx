import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { images } from '../../utils';
import styled from 'styled-components';

import { useUserContext } from '../../contexts/UserContext';

interface IFormData {
  username: string;
  password: string;
}

const Login = () => {
  const { isLogin, Login, LogOut} = useUserContext()
  const { handleSubmit, control, formState: { errors } } = useForm<IFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: IFormData) => {
    Login(data.username, data.password)
  };

  return (
    <LoginContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Logo src={images.gym1w.path} alt="Logo" />
        <FormGroup>
          <FormLabel>User :</FormLabel>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
            render={({ field }) => <Form.Control {...field}   />}
          />
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <FormLabel>Password :</FormLabel>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => <Form.Control type="password" {...field} />}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>
        <Button variant="danger" style={{ width: '200px' }} type="submit">Login</Button>
      </FormContainer>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled(Form)`
  width: 20vw;
  padding: 20px;
  background-color: #0c0c0cc5;
  border-radius: 15px;
  box-shadow: 0 0 15px #b30303;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 30vh;  
  position: relative;  
`;

const Logo = styled.img`
  width: 18vw;
  height: 20vh;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 15vw;
  position: relative; 
`;

const FormLabel = styled(Form.Label)`
  color: white;
  display: block;
  margin-bottom: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
  position: absolute;  
  bottom: -20px;  
  left: 0;
`;

export default Login;
