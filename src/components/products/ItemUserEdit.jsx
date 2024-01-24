import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners';
import ItemEditForm from '../common/ItemEditForm';

const ItemUserEdit = ({ user }) => {
    const { pid } = useParams();
    console.log({ user, pid })

    const [product, setProduct] = useState({});
    const [loader, setLoader] = useState(true);

    const getProduct = async (pid) => {
        try {
            const response = await fetch(`http://localhost:3001/api/products/product/${pid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) return toast.error('Error consultando datos del producto');
            const data = await response.json();
            setProduct(data.payload);
            setLoader(false);
        } catch (error) {
            throw new Error('Error en consulta de producto');
        };
    };

    const handleEditProduct = async (newData) => {
        try {
            
        } catch (error) {
            throw new Error('Error en consulta editar producto');
        };
    };

    useEffect(() => {
        getProduct(pid)
    }, []);


    if (loader) return <PacmanLoader color='#2196f3' />

    return (
        <Paper>
            <Typography>Editar Producto</Typography>
            <ItemEditForm data={product} />
        </Paper>
    )
}

export default ItemUserEdit