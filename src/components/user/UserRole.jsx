import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'

const UserRole = () => {

    const user = useSelector((state) => state.user.user);

    const [file, setFile] = useState(null);

    const handleClick = async () => {
        const role = user.role === 'premium' ? 'user' : 'premium';
        const uid = user.id;
        console.log({ role, uid })
        try {
            const response = await fetch(`https://coderhouse-backend-w8sd.onrender.com/api/users/user-role/premium/${uid}`, {
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
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uid = user.id;
        const type = 'documentation';

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(`https://coderhouse-backend-w8sd.onrender.com/api/users/user/${uid}/documents/${type}`, {
                    method: 'POST',
                    
                    body: formData
                });

                console.log(response);
            } catch (error) {
                console.error('Error al enviar formulario: ' + error);
            };
        } else {
            console.warn('Seleccione un archivo antes de enviar el formulario');
        };
    };

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

                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <input type="file" name='file' onChange={handleFile} />
                        <input type="submit" value='upload file' />
                    </form>
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