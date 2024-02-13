import React, { useState } from 'react';
import { Container, Table, Badge, InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import IUser from '../../interfaces/IUser';
import { useDataContext } from '../../contexts/DataContext';

  
function Home() {
  const { users} = useDataContext();
  const [searchData, setSearchData] = useState<IUser[]>(users!);
  const [inputSearchData, setInputSearchData] = useState({ search: '' });

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchData({
      ...inputSearchData,
      [e.target.name]: e.target.value,
    });

    if (e.target.value === undefined || e.target.value === '') {
      setSearchData(users!);
    } else {
      const dataCopy: IUser[] = users!.filter((item) => {
        return (
          item.fullName.toLowerCase().includes(inputSearchData.search.toLowerCase()) ||
          item.document.toLowerCase().includes(inputSearchData.search.toLowerCase())
        );
      });
      setSearchData(dataCopy);
    }
  };

  const getBadgeColor = (endDate: Date | number | string) => {
    // Convertir endDate a un objeto Date
    const endDateObj = new Date(endDate);
    const currentDate = new Date();
    const differenceInDays = Math.floor((endDateObj.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    
    if (endDateObj < currentDate) {
      return 'danger';
    } else if (differenceInDays <= 5) {
      return 'warning';
    } else {
      return 'success';
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
            <tr key={user.document}>
              <td>{user.document}</td>
              <td>{user.fullName}</td>
              <td>{user.startDate.toString()}</td>
              <td>{user.endDate.toString()}</td>
              <td>
                <Badge pill  bg={getBadgeColor(user.endDate)}>
                {getBadgeColor(user.endDate) !== "danger" ? "Activo" : "Inactivo"}
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
