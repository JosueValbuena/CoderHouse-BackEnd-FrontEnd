import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'

const UserRole = () => {

    const user = useSelector((state) => state.user.user);

    const handleClick = async () => {
        const role = user.role === 'premium' ? 'user' : 'premium';
        const uid = user.id;
        console.log({ role, uid })
        try {
            const response = await fetch(`http://localhost:3001/api/users/user-role/premium/${uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(role)
            });

            if (!response.ok) {
                toast.error('Error en consulta de cambio de rol');
                console.error('Error en consulta de cambio de rol');
            }

            await response.json();
            toast.success('Rol de usuario cambiado correctamente');
        } catch (error) {
            toast.error('Error al cambiar el rol del usuario');
            console.error('Error al cambiar el rol del usuario ' + error.message);
        }
    }

    return (
        <Box>
            {user.role !== 'premium' &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography>¿Deseas Cambiarte a Premium?</Typography>
                    <Button variant='contained'>Cambiar mi Rol</Button>
                </Box>
            }

            {user.role === 'premium' &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography>¿Quieres dejar de ser Premium?</Typography>
                    <Button variant='contained' onClick={handleClick}>Cambiar mi Rol</Button>
                </Box>
            }
        </Box>
    )
}

export default UserRole