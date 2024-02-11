import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners';
import ItemEditForm from '../common/ItemEditForm';
import { backendURL } from '../API/main';

const ItemUserEdit = ({ user }) => {
    const { pid } = useParams();
    console.log({ user, pid })

    const [product, setProduct] = useState({});
    const [loader, setLoader] = useState(true);

    const navegate = useNavigate();

    const getProduct = async (pid) => {
        try {
            const response = await fetch(`${backendURL}/api/products/product/${pid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log({ response })
            if (!response.ok) return toast.error('Error consultando datos del producto');
            const data = await response.json();
            setProduct(data.payload);
            setLoader(false);
        } catch (error) {
            throw new Error('Error en consulta de producto');
        };
    };

    const handleEditProduct = async (newProduct) => {

        const uid = user.id
        const isAdmin = user.role === 'admin' ? true : false;
        const URL = isAdmin
            ? `${backendURL}/api/products/product/${pid}/useradmin`
            : `${backendURL}/api/products/product/${pid}/user/${uid}`;

        try {
            const response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) return toast.error('No se ha podido modificar el producto');

            const data = await response.json();

            if (data.payload.modifiedCount === 1) {
                isAdmin ? navegate('/admin/productsmanager') : navegate('/user/allproducts');
                toast.success('Producto modificado exitosamente');
            }
        } catch (error) {
            throw new Error('Error en consulta editar producto');
        };
    };

    useEffect(() => {
        getProduct(pid)
    }, [pid]);


    if (loader) return <PacmanLoader color='#2196f3' />

    return (
        <Paper>
            <Typography>Editar Producto</Typography>
            <ItemEditForm
                product={product}
                handleEditProduct={handleEditProduct}
            />
        </Paper>
    )
}

export default ItemUserEdit