import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Badge, InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faTriangleExclamation, faRotateRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import IUser from '../../interfaces/IUser';

const users: IUser[] = [
  {
    fullName: 'John Doe',
    age: '30',
    gender: 'Male',
    document: '123456789',
    height: '180',
    weight: '75',
    startDate: new Date('2022-01-01'),
    endDate: new Date('2022-12-31'),
    _id: '1',
  },
  {
    fullName: 'Jane Doe',
    age: '25',
    gender: 'Female',
    document: '987654321',
    height: '165',
    weight: '88',
    startDate: new Date('2022-02-01'),
    endDate: new Date('2022-11-30'),
    _id: '2',
  },
  {
    fullName: 'Andersson Cordoba',
    age: '25',
    gender: 'Male',
    document: '123123123',
    height: '165',
    weight: '78',
    startDate: new Date('2022-02-01'),
    endDate: new Date('2022-11-30'),
    _id: '3',
  },
  {
    fullName: 'Jane Doe',
    age: '25',
    gender: 'Female',
    document: '234234',
    height: '176',
    weight: '67',
    startDate: new Date('2022-02-01'),
    endDate: new Date('2022-11-30'),
    _id: '4',
  },
];

function Home() {
  const [searchData, setSearchData] = useState<IUser[]>([]);
  const [inputSearchData, setInputSearchData] = useState({ search: '' });

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchData({
      ...inputSearchData,
      [e.target.name]: e.target.value,
    });

    if (e.target.value === undefined || e.target.value === '') {
      setSearchData([]);
    } else {
      const dataCopy: IUser[] = users.filter((item) => {
        return (
          item.fullName.toLowerCase().includes(inputSearchData.search.toLowerCase()) ||
          item.document.toLowerCase().includes(inputSearchData.search.toLowerCase())
        );
      });
      setSearchData(dataCopy);
    }
  };

  return (
    <Container className="text-center">
      <h1>LISTA DE USUARIOS</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar usuario"
          aria-label="Buscar usuario"
          aria-describedby="basic-addon2"
          value={inputSearchData.search}
          name="search"
          onChange={handleData}
        />
        <Button variant="outline-secondary" id="button-addon2">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginInline: '5px' }} />
        </Button>
      </InputGroup>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Identificación</th>
            <th>Nombre Completo</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {searchData.map((user) => (
            <tr key={user._id}>
              <td>{user.document}</td>
              <td>{user.fullName}</td>
              <td>{user.startDate.toLocaleDateString()}</td>
              <td>{user.endDate.toString()}</td>
              <td>
                <Badge pill style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', fontSize: 15 }}>
                  {/* Aquí puedes agregar la lógica para el estado */}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
