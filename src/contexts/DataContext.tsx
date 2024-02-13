import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import IUser from '../interfaces/IUser';
import Swal from 'sweetalert2';

interface DataContextProviderProps {
  children: ReactNode;
}

interface DataContextType {
  users: IUser[] | null,
  addUser: (data: IUser) => Promise<boolean>,
  getAllUsers: () => Promise<IUser[]>,
  getUser: (document: string) => Promise<IUser | undefined>,
  updateUser: (document: string, date: string) => Promise<boolean>,
}

export const INITIAL_STATE: DataContextType = {
  users: null,
  addUser: async (data: IUser) => false,
  getAllUsers: async () => [],
  getUser: async (document: string) => undefined,
  updateUser: async (document: string, date: string) => false,
};

export const DataContext = createContext(INITIAL_STATE);

export function useDataContext() {
  return useContext(DataContext);
}

export const DataContextProvider: React.FC<DataContextProviderProps> = ({ children }) => {

  const [users, setUsers] = useState<IUser[]>([]); 
   
  useEffect(() => {
    //  cargar los usuarios desde localStorage
    getStorageUsers()
  }, []);


  const getStorageUsers =()=>{
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      //console.log(JSON.parse(storedUsers))
      setUsers(JSON.parse(storedUsers).reverse());
    }
  }

  const saveUsersToLocalStorage = (updatedUsers: IUser[]) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const addUser = async (data: IUser) => {
    
    try {
      //  agregar un usuario
      // Verificar si el usuario ya existe por su documento
      const userExists = users.some((user) => user.document === data.document);

      if (userExists) {
        console.error('Usuario con el mismo documento ya existe');
        Swal.fire({
          title: "Usuario existente",
          text: "Usuario con el mismo documento ya existe",
          icon: "error"
        })
        return false;
      }

      // Agregar el nuevo usuario si no existe
      const updatedUsers = [...users, data];
      setUsers(updatedUsers);
      saveUsersToLocalStorage(updatedUsers);
      getStorageUsers()
      console.log(users)
      Swal.fire({
        title: "Usuario registrado",
        text: "Usuario registrado con exito",
        icon: "success"
      })

      return true;
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      Swal.fire({
        title: "Error",
        text: "Error al agregar usuario",
        icon: "warning"
      })
      return false;
    } 
   
  };

  const getAllUsers = async () => {
    getStorageUsers()
    try {
      //  obtener todos los usuarios
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  };

  const getUser = async (document: string): Promise<IUser | undefined> => {
    try {
      // obtener un usuario por documento
      const user = users.find((u) => u.document === document);
      return user;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      Swal.fire({
        title: "Error",
        text: "Error al obtener el usuario "+document,
        icon: "error"
      })
      return undefined;
    }
  };

  const updateUser = async (document: string, date: string) => {
    try {
      //  actualizar un usuario por documento
      const updatedUsers = users.map((user) =>
        user.document === document ? { ...user, endDate: date } : user
      );
      setUsers(updatedUsers);
      saveUsersToLocalStorage(updatedUsers);
      Swal.fire({
        title: "Usuario actualizado",
        text: "Usuario "+document+ " actualizado correctamente",
        icon: "success"
      })
      return true;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Swal.fire({
        title: "Error",
        text: "Error al actualizar el usuario "+document,
        icon: "error"
      })
      return false;
    }
  };

  const values: DataContextType = {
    users,
    addUser,
    getAllUsers,
    getUser,
    updateUser,
  };

  return (
    <DataContext.Provider value={values}>
      {children}
    </DataContext.Provider>
  );
};
