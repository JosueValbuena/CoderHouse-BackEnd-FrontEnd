import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordRecovery = () => {

    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
    const { password, passwordConfirm } = watch();
    const navigate = useNavigate();

    const tokenParams = useParams();

    const onSubmit = async (data) => {

        if (password !== passwordConfirm) {
            setError('passwordConfirm', {
                type: 'manual',
                message: 'Las contraseñas no coinciden'
            })
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/users/password-recovery', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: data.password, token: tokenParams.codeRecovery })
            });

            if (!response.ok) {
                toast.error('La contraseña es invalidad o igual a la anterior')
                return console.error('La contraseña es invalidad o igual a la anterior')
            }

            const dataResponse = await response.json();

            if (dataResponse.status === 'Error') {
                toast.error(dataResponse.message)
                return console.error(dataResponse.message)
            }

            toast.success('Contraseña cambiada con exito');
            navigate('/login');
        } catch (error) {
            toast.error(error.message);
            console.error('Error al recuperar la contraseña' + error.message);
        }
    };

    return (
        <Box>
            <Paper sx={{ padding: '1rem 3rem' }}>
                <Typography sx={{ textAlign: 'center' }}>Escribe tu nueva contraseña</Typography>
                <Box sx={{ width: '100%' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} p={2}
                        >
                            <TextField type="password" placeholder="Ingresa tu contraseña" {...register("password", { required: true })} />
                            <TextField type="password" placeholder="Repite tu contraseña" {...register("passwordConfirm", { required: true })} />
                            {errors.passwordConfirm && (
                                <Typography sx={{ textAlign: 'center' }}>{errors.passwordConfirm.message}</Typography>
                            )}
                            <Box pt={2}>
                                <Button
                                    variant="contained"
                                    type='submit'
                                    disabled={!password || !passwordConfirm}>Cambiar contraseña</Button>
                            </Box>
                        </Box>

                    </form>
                </Box>
            </Paper>
        </Box>
    )
}

export default PasswordRecovery