import { AccountCircle, Edit } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

const UserProfile = () => {
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
          <Typography variant='h4'>NOMBRE</Typography>
        </Box>
        <AccountCircle sx={{ fontSize: '4rem' }} />
      </Box>

      <Box sx={{ backgroundColor: '#fff', minWidth: '20rem' }} my={2} p={1}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Datos Personales</Typography>
          <Edit />
        </Box>

        <Box>
          <Typography>Nombre:</Typography>
          <Typography>NOMBRE USUARIO</Typography>
        </Box>

        <Box>
          <Typography>Apellidos:</Typography>
          <Typography>Apellidos Usuario</Typography>
        </Box>

        <Box>
          <Typography>Email</Typography>
          <Typography>EMAIL USUARIO</Typography>
        </Box>

        <Box>
          <Typography>Edad</Typography>
          <Typography>EDAD USUARIO</Typography>
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