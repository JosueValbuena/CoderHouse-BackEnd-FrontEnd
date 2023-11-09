import React from 'react'
import { useForm } from 'react-hook-form';
import { Google } from '@mui/icons-material'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const LogInUser = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch();

    const { register, handleSubmit, /* formState: { errors } */ } = useForm();
    
    const onSubmit = async (data) => {

        const logData = {
            email: data.user,
            password: data.password
        };

        try {
            const res = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logData)
            });

            if (!res.ok) return toast.error("Usuario o contrasenha invalida :/")

            const dataRes = await res.json();
            dispatch(setUser(dataRes.name));
            toast.success(`Bienvenido ${user}`)
            navigate('/');
        } catch (error) {
            console.error('Error al realizar la solicitud', error);
        };
    };

    return (
        <Box sx={{
            minHeight: 'calc(100vh - 5.5rem)',
            backgroundColor: '#eee',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Toaster />
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
                            <TextField type="text" placeholder="Ingresa tu correo" {...register("user", { required: true })} />
                            <TextField type="password" placeholder="Contrasenha" {...register("password", { required: true })} />

                            <Box pt={2}>
                                <Button variant="contained" type='submit'>Iniciar Session</Button>
                            </Box>
                        </Box>

                    </form>

                    <Typography>
                        ¿Olvidaste tu contraseña?
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