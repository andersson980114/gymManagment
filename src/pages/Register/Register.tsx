import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Form, Button, Row, Col, Card, Toast } from 'react-bootstrap';
  
import IUser from '../../interfaces/IUser'; 
import { generos, options } from '../../utils';
import { useDataContext } from '../../contexts/DataContext';

function Register() {
  const { register, reset, handleSubmit,  formState: { errors },  } = useForm<IUser>();
  const {addUser} = useDataContext()
 


  const onSubmit:SubmitHandler<IUser> = async(data:IUser) => { 
    const { startDate, endDate } = data;
    const endDateOption = Number(endDate);
    const startDateObj = new Date(startDate); 
    let newEndDate;
    // Aplicar la lógica de sumar días, semanas o meses
    switch (endDateOption) {
      case 1:
         // Sumar un día
        newEndDate = new Date(startDateObj);
        break;
      case 2:
        // Sumar una semana
        newEndDate = new Date(startDateObj);
        newEndDate.setDate(startDateObj.getDate() + 8);
        break;
      default:
        // Sumar un mes
        newEndDate = new Date(startDateObj);
        newEndDate.setMonth(startDateObj.getMonth() + 1);
        break;
    }
  
    // Asignar la nueva fecha a endDate
    const formattedEndDate = newEndDate.toISOString().split('T')[0];
    data.endDate = formattedEndDate  

    console.log( data);
    addUser(data)
    reset()
  };
  
  return (
    <Container className="my-5 ">
    <h1>Registro de Usuario</h1>
    <Card className="mx-5">
      <Card.Body className="my-3">
        <Card.Title>
          <h2>Datos del Usuario</h2>
        </Card.Title>
        <Card.Body className="my-3">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row style={{ 'marginTop': '15px' }}>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Número de Identificación:</Form.Label>
                  <input
                    className="form-control" 
                    type='number'
                    {...register("document", { 
                      required: 'Número de identificación requerido',
                    })}
                  />
                  {errors.document && (
                    <p style={{ color: 'red' }}>{errors.document.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Nombre Completo:</Form.Label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("fullName", { required: 'Nombre completo requerido' })}
                  />
                  {errors.fullName && (
                    <p style={{ color: 'red' }}>{errors.fullName.message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ 'marginTop': '15px' }}>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Edad:</Form.Label>
                  <input
                    className="form-control"
                    type='number'
                    {...register("age", { required: 'Edad requerida' })}
                  />
                  {errors.age && (
                    <p style={{ color: 'red' }}>{errors.age.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Género:</Form.Label>
                  <select
                    className="form-control"
                    id="gender"
                    {...register('gender', { required: 'Género requerido' })}
                  >
                    <option value="">Selecciona una opción</option>
                    {generos.map((genero) => (
                      <option key={genero.id} value={genero.value}>
                        {genero.label}
                      </option>
                    ))}
                  </select>
                  {errors.gender && (
                    <p style={{ color: 'red' }}>{errors.gender.message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ 'marginTop': '15px' }}>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Altura:</Form.Label>
                  <input
                    className="form-control"
                    type='number'
                    {...register("height", { required: 'Altura requerida' })}
                  />
                  {errors.height && (
                    <p style={{ color: 'red' }}>{errors.height.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Peso:</Form.Label>
                  <input
                    className="form-control "
                    type='number'
                    inputMode="numeric"
                    {...register("weight", { required: 'Peso requerido' })}
                  />
                  {errors.weight && (
                    <p style={{ color: 'red' }}>{errors.weight.message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row> 
            <Row style={{ 'marginTop': '15px' }}>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Fecha de Inicio:</Form.Label>
                  <input
                    className="form-control"
                    type="date"
                    {...register("startDate", { required: 'Fecha de Inicio requerida' })}
                  />
                  {errors.startDate && (
                    <p style={{ color: 'red' }}>{errors.startDate.message}</p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6}> 
                <Form.Group>
                  <Form.Label>Fecha de Fin:</Form.Label>
                  <select
                    className="form-control"
                    id="endDate"
                    {...register('endDate', { required: 'Fecha de Fin requerida' })}
                  >
                    <option value="">Selecciona una opción</option>
                    {options.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.endDate && (
                      <p style={{ color: 'red' }}>{errors.endDate.message}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" style={{'marginTop':'15px'}}>Registrar Usuario</Button>
          </Form>

        </Card.Body>
      </Card.Body>
    </Card>
          
  </Container>
  )
}

export default Register