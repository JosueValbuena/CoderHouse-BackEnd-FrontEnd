import React from 'react';
import { useForm } from 'react-hook-form';
import { Google } from '@mui/icons-material';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { backendURL } from '../API/main';

const CreateAccount = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {

    const registerData = {
      first_name: data.Nombre,
      last_name: data.Apellidos,
      email: data.Correo,
      age: data.Edad,
      password: data.Contraseña
    };

    try {
      const response = await fetch(`${backendURL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      if (!response.ok) {
        toast.error('error al registrar usuario')
        throw new Error('error al registrar usuario')
      }

      await response.json();
      toast.success('Usuario registrado con exito')
      navigate('/login');
    } catch (error) {
      throw new Error('Error al registrar usuario');
    }

  };
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
              <TextField type="text" placeholder="Apellidos" {...register("Apellidos", { required: true })} />
              <TextField type="email" placeholder="Correo" {...register("Correo", { required: true })} />
              <TextField type="number" placeholder="Edad" {...register("Edad", { required: true })} />
              <TextField type="password" placeholder="Contraseña" {...register("Contraseña", { required: true })} />
              <TextField type="password" placeholder="Repita Contraseña" {...register("ConfirmarContraseña", { required: true })} />

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