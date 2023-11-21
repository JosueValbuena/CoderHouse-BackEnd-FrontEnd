import React from 'react'
import { useForm } from 'react-hook-form';
import { Google } from '@mui/icons-material'
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const LogInUser = () => {

    const navigate = useNavigate();
    /* const user = useSelector((state) => state.user.user) */
    const dispatch = useDispatch();

    const { register, handleSubmit, /* formState: { errors } */ } = useForm();

    const onSubmit = async (data) => {

        const logData = {
            email: data.user,
            password: data.password
        };

        try {
            const response = await fetch('https://coderhouse-backend-w8sd.onrender.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logData)
            });

            if (!response.ok) return toast.error("Usuario o contrasenha invalida :/")

            const dataRes = await response.json();
            dispatch(setUser(dataRes.name));
            localStorage.setItem('token', dataRes.token);
            toast.success(`Bienvenido ${dataRes.name}`);
            navigate('/');
        } catch (error) {
            console.error('Error al realizar la solicitud', error);
        };
    };

    return (
        <Grid item>
            <Box sx={{
                minHeight: 'calc(100vh - 5.5rem)',
                backgroundColor: '#eee'
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
                        <Divider />
                        <Typography>
                            O inicia sesion con:
                        </Typography>
                        <Button variant="contained" color='success' startIcon={<Google />}>Google</Button>
                    </Box>
                </Paper>
            </Box>
        </Grid>
    )
}

export default LogInUser