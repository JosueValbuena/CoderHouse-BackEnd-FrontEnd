import { Add, Remove } from '@mui/icons-material';
import { Box, Button, Grid, Paper, Rating, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { backendURL } from '../API/main';

const ItemDetail = () => {

    const [product, setProduct] = useState({});
    const [loader, setLoader] = useState(true);
    const productParams = useParams();

    const getData = useCallback(async () => {
        const id = productParams.id;
        try {
            const response = await fetch(`${backendURL}/api/products/product/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            console.log(response)

            if (!response.ok) {
                toast.error('En estos momentos tenemos problemas para consultar este producto :(')
                throw new Error('Error al consultar producto');
            }

            const data = await response.json();
            console.log(data)
            setProduct(data.payload);
            setLoader(false)
        } catch (error) {
            throw new Error('Error al consultar productos: ' + error)
        }
    }, [productParams.id]);

    const handleAddToCart = () => {
        console.log(product)
    };

    useEffect(() => {
        getData()
    }, [getData]);

    if (loader) {
        return <PacmanLoader color='#2196f3' />
    }

    return (
        <Paper>
            <Grid container p={2}>
                <Grid>
                    <Box>
                        <Typography variant='body2'>Marca</Typography>
                        <Typography variant='h5'>{product.title}</Typography>
                        <Box display='flex' alignItems='center'>
                            <Rating name="read-only" value={0} readOnly />
                            <Typography variant='body2' px={2}> (0 reseñas) </Typography>
                        </Box>
                        <Typography variant='body2'>Vendido por: VENDEDOR</Typography>
                    </Box>
                </Grid>

                <Grid>
                    <Box py={2}>
                        <img style={{ width: '100%' }} src="https://images.unsplash.com/photo-1515974256630-babc85765b1d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </Box>
                </Grid>

                <Grid width='100%'>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>CLP: {product.price}</Typography>

                        <Box display='flex' alignItems='center'>
                            <Remove />
                            <Typography>1</Typography>
                            <Add />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }} pt={2}>
                        <Button variant="contained" size="medium" onClick={handleAddToCart}>
                            Agregar al carro
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ItemDetail