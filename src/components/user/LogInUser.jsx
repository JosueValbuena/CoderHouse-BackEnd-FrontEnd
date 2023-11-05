import React from 'react'
import { useForm } from 'react-hook-form';
import { Google } from '@mui/icons-material'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

const LogInUser = () => {

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
            <Paper sx={{ height: '25rem', marginTop: '1rem' }} elevation={3}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                }} p={4}
                >
                    <Typography>
                        Nos alegra tenerte de vuelta
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} p={2}
                        >
                            <TextField type="text" placeholder="Ingresa tu correo" {...register("Ingresa tu correo", { required: true })} />
                            <TextField type="password" placeholder="Contrasenha" {...register("Contrasenha", { required: true })} />

                            <Box pt={2}>
                                <Button variant="contained" type='submit'>Iniciar Session</Button>
                            </Box>
                        </Box>

                    </form>

                    <Typography>
                        Olvidaste tu contrasenha?
                    </Typography>

                    <Typography>
                        O inicia sesion con:
                    </Typography>
                    <Button variant="contained" color='success' startIcon={<Google />}>Google</Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default LogInUser