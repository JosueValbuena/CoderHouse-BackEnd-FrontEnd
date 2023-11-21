import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'

const ItemDetail = () => {

    const [product, setProduct] = useState({});
    const [loader, setLoader] = useState(true);
    const productParams = useParams();

    const getData = useCallback(async () => {
        const id = productParams.id;
        try {
            const response = await fetch(`https://coderhouse-backend-w8sd.onrender.com/api/products/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                toast.error('En estos momentos tenemos problemas para consultar este producto :(')
                throw new Error('Error al consultar producto');
            }

            const data = await response.json();
            setProduct(data.result);
            setLoader(false)
        } catch (error) {
            throw new Error('Error al consultar productos: ' + error)
        }
    }, [productParams.id]);

    useEffect(() => {
        getData()
    }, [getData]);

    if (loader) {
        return <Typography>Cargando...</Typography>
    }

    return (
        <Box>
            <Box>
                <Typography>Marca</Typography>
                <Typography>{product.title}</Typography>
            </Box>

            <Box>
                {/* <img src="https://images.unsplash.com/photo-1515974256630-babc85765b1d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /> */}
            </Box>

            <Box>
                <Typography>{product.price}</Typography>
            </Box>
        </Box>
    )
}

export default ItemDetail