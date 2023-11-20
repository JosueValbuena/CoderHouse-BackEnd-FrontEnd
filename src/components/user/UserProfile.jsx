import { AccountCircle, Edit } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const UserProfile = () => {

  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem('token');

    const getData = async () => {
      try {
        const response = await fetch('https://coderhouse-backend-w8sd.onrender.com/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) return toast.error('Error al obtener perfil del usuario :/');

        const dataRes = await response.json();

        setUserData(dataRes.user);
        setLoader(false);
      } catch (error) {
        console.error('Error en la solicitud', error.message);
      }
    };

    return () => {
      getData()
    }
  }, []);

  if (loader) {
    return <Typography> Cargando... </Typography>
  }

  return (
    <Box sx={{
      backgroundColor: '#eee',
      minHeight: 'calc(100vh - 5.5rem)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>

      <Box sx={{
        backgroundColor: '#fff',
        minWidth: '20rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }} my={2} p={1}>
        <Box>
          <Typography variant='h5'>Hola</Typography>
          <Typography variant='h4'>{userData.first_name}</Typography>
        </Box>
        <AccountCircle sx={{ fontSize: '4rem' }} />
      </Box>

      <Box sx={{ backgroundColor: '#fff', minWidth: '20rem' }} my={2} p={1}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Datos Personales</Typography>
          <Edit />
        </Box>

        <Box>
          <Typography>Nombre(s):</Typography>
          <Typography>{userData.first_name} {userData.middle_name && userData.middle_name}</Typography>
        </Box>

        <Box>
          <Typography>Apellido(s):</Typography>
          <Typography>{userData.last_name && userData.last_name} {userData.second_last_name && userData.second_last_name}</Typography>
        </Box>

        <Box>
          <Typography>Email</Typography>
          <Typography>{userData.email}</Typography>
        </Box>

        <Box>
          <Typography>Edad</Typography>
          <Typography>{userData.age && userData.age}</Typography>
        </Box>
      </Box>



      <Box sx={{ backgroundColor: '#fff', minWidth: '20rem' }} my={2} p={1}>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Datos de envio</Typography>
          <Edit />
        </Box>

        <Box>
          <Typography>Calle:</Typography>
          <Typography>Calle USUARIO</Typography>
        </Box>

        <Box>
          <Typography>Numero:</Typography>
          <Typography>Numero Usuario</Typography>
        </Box>

        <Box>
          <Typography>Casa / Habitacion / Local</Typography>
          <Typography>Numero USUARIO</Typography>
        </Box>

        <Box>
          <Typography>Ciudad</Typography>
          <Typography>Ciudad Usuario</Typography>
        </Box>
      </Box>


    </Box>
  )
}

export default UserProfile