import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Form, Button, Row,  Card, Toast } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDataContext } from '../contexts/DataContext';
import { options } from '../utils';

interface updateUser {
    document: string;
    endDate: number;
}

interface FormUpdateUserProps {
    onCloseModal: () => void;
}

const FormUpdateUser: React.FC<FormUpdateUserProps> = ({ onCloseModal }) => {
    let navigate = useNavigate();
    const {updateUser, getUser} = useDataContext()
    const { register, reset, handleSubmit, control,  formState: { errors },  } = useForm<updateUser>();
   
    

    const onSubmit: SubmitHandler<updateUser> = async (data:updateUser) => { 
        const { document, endDate } = data;
        const endDateOption = Number(endDate); 
        const today = new Date();

        let newEndDate: Date;

        switch (endDateOption) {
            case 1:
               // Sumar un día
              newEndDate = new Date(today);
              break;
            case 2:
              // Sumar una semana
              newEndDate = new Date(today);
              newEndDate.setDate(today.getDate() + 8);
              break;
            default:
              // Sumar un mes
              newEndDate = new Date(today);
              newEndDate.setMonth(today.getMonth() + 1);
              break;
        }

        const formattedEndDate = newEndDate.toISOString().split('T')[0];

        try {
            
            const user= await updateUser(data.document, formattedEndDate) 

            if (user) {
                
                reset()
    
            } else { 
                console.log("error al actualizar")
            }  
        } catch (error) {
            console.log("error update user:", error)
        }
    };

    return (
        <Container className="my-5"> 
            <Card className="my-5">
                <Card.Body className="my-3">
                <Card.Title>
                    <h2>Renovar membresia</h2>
                </Card.Title>
                <Card.Body className="my-3">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row style={{ 'marginTop': '15px' }}> 
                            <Form.Group>
                            <Form.Label>Número de Identificación:</Form.Label>
                            <input
                                className="form-control"
                                type="text"
                                {...register("document", { required: 'Número de identificación requerido' })}
                            />
                            {errors.document && (
                                <p style={{ color: 'red' }}>{errors.document.message}</p>
                            )}
                            </Form.Group> 
                        </Row>
                        <Row> 
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
                        </Row>
                        <Row>
                            <Button type="submit" style={{'marginTop':'25px'}}>Actualizar Usuario</Button>
                        </Row>

                    </Form>

                </Card.Body>
                </Card.Body>
            </Card>
                
                
        </Container>
    );
}

export default FormUpdateUser;