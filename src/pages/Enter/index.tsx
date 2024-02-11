import React, { useContext, useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Container, Row, Col, Form, Button, Card, Modal} from 'react-bootstrap'; 
import { useDataContext } from '../../contexts/DataContext';
import FormUpdateUser from '../../components/FormUpdateUser';
 

type FormData = {
  document: string;
};

const currentDate = new Date();

function Index() {
  const {getUser, updateUser} = useDataContext()
  const { control, handleSubmit, formState: { errors }, } = useForm<FormData>(); 
  const [userData, setUserData] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  let document: string;

  const onSubmit: SubmitHandler<FormData> = async (data) => {  
      if (data.document) {
          document= data.document
          try { 
              const user = await  getUser(data.document)
              setUserData(user)
              console.log(user)
             
              /* setUserData(Validation); */
          } catch (error) {
              console.log(error)
          }  

      }
  };

  const handleCloseModal = () => {
      setShowModal(false); 
  };

  useEffect(() => {
    if (userData && new Date(userData.endDate) <= currentDate) {
        setShowModal(true); 
    }
}, [userData])


  return (
    <Container className='my-5'>
      <h1 >Validación de ingreso </h1>
      <Card className='my-5'>
          <Card.Body className='my-3'>
          <Card.Title> <h2>Datos del usuario</h2> </Card.Title> 
          <Card.Body className='my-3'>
              <Card.Title>Número de Identificación:</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group> 
                    <Row>
                      <Col xs={6} >
                          <Controller
                            name="document"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Número de identificación requerido' }}
                            render={({ field }) => <Form.Control {...field} />}
                          />
                          {errors.document && <p>{errors.document.message}</p>}
                      </Col>
                      <Col xs={6}>
                          <Button type="submit">Validar Ingreso</Button>
                      </Col>
                    </Row>
                </Form.Group>
              </Form>

              <Card className='mt-4'>
              <Card.Body className='my-3'>
                  <Card.Title className='mb-4'>Información del Usuario</Card.Title>
                  <Row>
                  <Col xs={6}>
                      <Card.Text>Nombre Completo: {userData && userData.fullName}</Card.Text>
                      <Card.Text>Edad: {userData && userData.age}</Card.Text>
                      <Card.Text>Género: {userData && userData.gender}</Card.Text>
                      <Card.Text>Cédula: {userData && userData.document}</Card.Text>
                  </Col>
                  <Col xs={6}>
                      <Card.Text>Altura: {userData && userData.height} cm</Card.Text>
                      <Card.Text>Peso: {userData && userData.weight} kg</Card.Text>
                      <Card.Text>Fecha de Inicio: {userData &&  userData.startDate}</Card.Text>
                      <Card.Text>Fecha de Fin: {userData &&  userData.endDate}</Card.Text>
                  </Col>
                  </Row>
              </Card.Body>
              </Card>
          </Card.Body> 
          </Card.Body>
          
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
            <FormUpdateUser onCloseModal={handleCloseModal}/>
          </Modal.Body>
      </Modal>
    
    </Container>
  )
}

export default Index
