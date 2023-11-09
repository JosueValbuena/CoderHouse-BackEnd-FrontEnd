import React from 'react';
import { useForm } from 'react-hook-form';
import { Google } from '@mui/icons-material';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

const CreateAccount = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 5.5rem)',
      backgroundColor: '#eee',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Paper sx={{ height: '40rem', marginTop: '1rem' }} elevation={3}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }} p={4}
        >
          <Typography variant={'h4'} component={'h2'}>
            Ingresa tus datos
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }} p={2}
            >
              <TextField type="text" placeholder="Nombre" {...register("Nombre", { required: true })} />
              <TextField type="password" placeholder="Apellidos" {...register("Apellidos", { required: true })} />
              <TextField type="email" placeholder="Correo" {...register("Correo", { required: true })} />
              <TextField type="datetime" placeholder="Edad" {...register("Edad", { required: true })} />
              <TextField type="password" placeholder="Contraseña" {...register("Contraseña", { required: true })} />
              <TextField type="password" placeholder="Repita Contraseña" {...register("Repita Contraseña", { required: true })} />

              <Box pt={2}>
                <Button variant="contained" type='submit'>Crear Cuenta</Button>
              </Box>
            </Box>

          </form>

          <Typography>
            O inicia sesion con:
          </Typography>
          <Button variant="contained" color='success' startIcon={<Google />}>Google</Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default CreateAccount