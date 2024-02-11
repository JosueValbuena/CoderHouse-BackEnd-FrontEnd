import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { /* Navigate ,*/ useNavigate, useParams } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners';
import { backendURL } from '../API/main';

const UserInfoEditByAdmin = () => {

    const [loader, setLoader] = useState(true);
    const [userInfo, setUserInfo] = useState();

    const { uid } = useParams();

    const navegate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);

    const getUserInfo = async (uid) => {
        try {
            const response = await fetch(`${backendURL}/api/users/user/${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                toast.error('Fallo en respuesta de consulta de informacio de usuario por ID');
                throw new Error('Fallo en respuesta consulta de informacio de usuario por ID');
            }

            const data = await response.json();
            console.log(data);
            setUserInfo(data.result);
            setLoader(false);
        } catch (error) {
            throw new Error('Error en consulta de informacio de usuario por ID', error.message);
        };
    };

    const handleEditUser = async (data) => {
        const newUserData = {
            first_name: data.Nombre,
            last_name: data.Apellido,
            email: data.Email,
            role: data.Rol
        };

        try {
            const response = await fetch(`${backendURL}/api/users/useredit/${uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserData)
            });
            if (!response.ok) return toast.error('Error al editar usuario');

            const data = await response.json();
            toast.success('Usuario editado exitosamente');
            if (data.payload.modifiedCount === 1) return navegate('/usersmanager');
        } catch (error) {
            toast.error('Error en consulta editar datos de usuario');
            throw new Error('Error en consulta editar datos de usuario', error.message);
        }
    };

    useEffect(() => {
        getUserInfo(uid);
    }, [uid]);

    if (loader) return <PacmanLoader color="#2196f3" />

    return (
        <Box>
            <Paper sx={{ padding: { xs: '.5rem 1rem', sm: '1rem 2rem', md: '2rem 4rem', lg: '3rem 6rem' } }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography>Editar Datos</Typography>
                </Box>

                <form onSubmit={handleSubmit(handleEditUser)}>
                    <Box sx={{
                        width: { xs: '15rem', sm: '23rem', md: '28rem', lg: '30rem' }
                    }}>
                        <TextField
                            type='text'
                            placeholder='Nombre'
                            defaultValue={userInfo && userInfo.first_name}
                            {...register("Nombre", { required: true })}
                            fullWidth
                        />
                        <TextField
                            type='text'
                            placeholder='Apellido'
                            defaultValue={userInfo && userInfo.last_name}
                            {...register("Apellido", { required: true })}
                            fullWidth
                        />
                        <TextField
                            type='text'
                            placeholder='Email'
                            defaultValue={userInfo && userInfo.email}
                            {...register("Email", { required: true })}
                            fullWidth
                        />
                        <TextField
                            type='text'
                            placeholder='Rol'
                            defaultValue={userInfo && userInfo.role}
                            {...register("Rol", { required: true })}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '2.5rem'
                    }}>
                        <Button variant='contained' type='submit'>Editar usuario</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    )
}

export default UserInfoEditByAdmin