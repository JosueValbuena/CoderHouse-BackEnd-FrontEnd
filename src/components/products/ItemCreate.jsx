import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { backendURL } from '../API/main';

const ItemCreate = () => {

    const user = useSelector((state) => state.user.user);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    console.log(errors);

    const { title, description, code, price, stock, category } = watch();

    const handleCreateProduct = async (data) => {
        const uid = user.id;
        const newProduct = {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock,
            category: data.category,
            user: uid
        };
        try {
            const response = await fetch(`${backendURL}/api/products/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) return toast.error('No se ha podido crear el producto');

            const data = await response.json();
            if (data.status === 'Success') return toast.success('Producto creado exitosamente');
        } catch (error) {
            throw new Error('Error en la consulta crear producto');
        }
    };

    return (
        <Paper sx={{ padding: '0.5rem 1rem', maxWidth: { lg: '30rem' } }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography>Crear Producto</Typography>
            </Box>

            <form onSubmit={handleSubmit(handleCreateProduct)}>
                <Box sx={{ padding: '0.5rem 1rem' }}>
                    <TextField
                        type='text'
                        placeholder='Titulo'
                        {...register("title", { required: true })}
                        fullWidth
                    />
                    <TextField
                        type='text'
                        placeholder='Descripcion'
                        {...register("description", { required: true })}
                        fullWidth
                    />
                    <TextField
                        type='text'
                        placeholder='Codigo'
                        {...register("code", { required: true })}
                        fullWidth
                    />
                    <TextField
                        type='text'
                        placeholder='Precio'
                        {...register("price", { required: true })}
                        fullWidth
                    />
                    <TextField
                        type='text'
                        placeholder='Cantidad existencia'
                        {...register("stock", { required: true })}
                        fullWidth
                    />
                    <TextField
                        type='text'
                        placeholder='Categoria'
                        {...register("category", { required: true })}
                        fullWidth
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: '1.5rem' }}>
                    <Button
                        variant='contained'
                        type='submit'
                        disabled={
                            !title ||
                            !description ||
                            !code ||
                            !price ||
                            !stock ||
                            !category
                        }>Crear producto</Button>
                </Box>
            </form>
        </Paper>
    )
}

export default ItemCreate