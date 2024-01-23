import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { PacmanLoader } from 'react-spinners';
import ItemUserDetail from '../products/ItemUserDetail';

const UserAllItems = ({ user }) => {

    const [loader, setLoader] = useState(true);
    const [dataProducts, setDataProducts] = useState([]);

    const getUserItems = async () => {
        const uid = user.id;
        try {
            const response = await fetch(`http://localhost:3001/api/products/allproductsuser/${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) return toast.error('No se han podido cargar los productos');

            const data = await response.json();
            setDataProducts(data.payload);
            setLoader(false);
        } catch (error) {
            throw new Error('Erro en consulta mostrar items de usuario');
        };
    };

    useEffect(() => {
        getUserItems()
    }, []);

    if (loader) return <PacmanLoader color='#2196f3' />

    return (
        <Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography> Tus productos </Typography>
            </Box>
            <Grid container spacing={2}>
                {dataProducts.map(ele => {
                    return <ItemUserDetail
                        key={ele._id}
                        product={ele}
                    />
                })}
            </Grid>
        </Grid>
    )
}

export default UserAllItems