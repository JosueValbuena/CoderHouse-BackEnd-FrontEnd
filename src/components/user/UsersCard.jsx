import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

const UsersCard = ({ data, setUserData, handleOpen }) => {
    console.log(data)
    const handleClick = () => {
        handleOpen();
        setUserData(data)
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: '0.5rem 1rem', margin: '1rem 0rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Avatar src="/broken-image.jpg" />
                    <Typography>{data.first_name} {data.last_name}</Typography>
                </Box>
                <Box>
                    <Typography>Rol: {data.role}</Typography>
                    <Typography>Correo: {data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button variant="text" color='secondary'>Editar</Button>
                    <Button variant="text" color='error' onClick={handleClick}>Eliminar</Button>
                </Box>
            </Paper>
        </Grid>
    )
}

export default UsersCard