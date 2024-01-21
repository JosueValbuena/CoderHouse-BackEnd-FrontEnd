import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import UsersCard from './UsersCard';
import { PacmanLoader } from 'react-spinners';

const UsersManager = () => {

    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);

    const getUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3001/api/users/allusers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                toast.error('Error al solicitar informacion de usuarios');
                throw new Error('Error al solicitar informacion de usuarios');
            };

            const data = await response.json();
            setUsers(data.payload);
            setLoader(false);
        } catch (error) {
            throw new Error('Error en solicitud de usuarios', error.message);
        };
    };

    useEffect(() => {
        getUsers()
    }, [])

    if (loader) {
        return <PacmanLoader color="#2196f3" />
    }

    return (
        <Grid>
            <Typography>Administrador de usuarios</Typography>

            <Grid container spacing={2}>
                {users.map(user => {
                    return <UsersCard key={user.id} data={user} />
                })}
            </Grid>
        </Grid>
    )
}

export default UsersManager