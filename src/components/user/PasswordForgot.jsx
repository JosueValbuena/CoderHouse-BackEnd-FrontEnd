import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const PasswordForgot = () => {

  const [message, setMessage] = useState(false);
  const { register, handleSubmit, /* formState: { errors } */ watch } = useForm();
  const { user } = watch();

  const onSubmit = async (data) => {
    const email = data.user;
    try {
      const response = await fetch('https://coderhouse-backend-w8sd.onrender.com/api/users/password-forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.status === 400) return toast.error('Email invalido');

      if (!response.ok) return toast.error('Error al enviar enlace de recuperacion');

      await response.json();
      setMessage(true);
      toast.success('Enlace de recuperacion enviado con exito');
    } catch (error) {
      toast.error('Error en la consulta al enviar enlace de recuperacion')
      console.error('Error en la consulta al enviar enlace de recuperacion' + error.message);
    }
  };

  return (
    <Box>
      <Paper sx={{ padding: '1rem 3rem' }}>
        <Typography>Para recuperar tu contraseña, ingresa tu correo electrónico. Posteriormente, recibirás un enlace de recuperación que tendrá validez por 1 hora.</Typography>
        <Box sx={{ width: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }} p={2}
            >
              <TextField type="text" placeholder="Ingresa tu correo" {...register("user", { required: true })} />

              <Box pt={2}>
                <Button
                  variant="contained"
                  type='submit'
                  disabled={!user}>Enviar Enlace</Button>
              </Box>
            </Box>

          </form>
          {message && <Typography sx={{ textAlign: 'center' }}>Enlace enviado, revisa tu bandeja de entrada en tu correo</Typography>}
        </Box>
      </Paper>
    </Box>
  )
}

export default PasswordForgot