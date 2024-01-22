import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import UsersCard from './UsersCard';
import { PacmanLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const UsersManager = () => {

    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState({});
    const navegate = useNavigate();

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleEditUser = (uid) => {
        navegate(`/admin/edituser/${uid}`)
    };

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

    const deleteUser = async () => {
        const uid = userData.id;
        try {
            const response = await fetch(`http://localhost:3001/api/users/userDelete/${uid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) throw new Error('Error en cosnulta eliminar usuario');

            const updatedUsers = users.filter(user => user.id !== uid);
            setUsers(updatedUsers);
            toast.success('Usuario eliminado')
            handleClose();
        } catch (error) {

        };
    };

    console.log(userData);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        getUsers()
    }, [])

    if (loader) {
        return <PacmanLoader color="#2196f3" />
    }

    return (
        <Grid>
            <Box sx={{ textAlign: 'center' }}>
                <Typography>Administrador de usuarios</Typography>
            </Box>

            <Grid container spacing={2}>
                {users.map(user => {
                    return <UsersCard
                        key={user.id}
                        data={user}
                        setUserData={setUserData}
                        handleOpen={handleOpen}
                        handleEditUser={handleEditUser}
                    />
                })}
            </Grid>

            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        ¿Estas seguro de eliminar a este usuario?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Estas a punto de eliminar al usuario {userData.first_name} {userData.last_name}, {userData.email}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="text" color='primary' onClick={handleClose}>Cancelar</Button>
                        <Button variant="text" color='error' onClick={deleteUser}>Eliminar</Button>
                    </Box>
                </Box>
            </Modal>
        </Grid>
    )
}

export default UsersManager