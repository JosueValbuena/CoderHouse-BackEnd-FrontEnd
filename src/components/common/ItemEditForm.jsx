import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';

const ItemEditForm = ({ product, handleEditProduct }) => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    console.log(errors)
    const data = watch();
    const isAnyFieldEmpty = Object.values(data).some(value => value === '');

    const handleEditData = (data) => {
        const newProduct = {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock,
            category: data.category
        };
        handleEditProduct(newProduct);
    };

    return (

        <form onSubmit={handleSubmit(handleEditData)}>
            <Box>
                {Object.keys(product).map(key => (
                    !["_id", "__v", "user"].includes(key) && (
                        <TextField
                            key={key}
                            type='text'
                            placeholder={key}
                            defaultValue={product[key]}
                            {...register(key, { required: true })}
                            fullWidth
                        />)
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' type='submit' disabled={isAnyFieldEmpty}>Modificar Producto</Button>
            </Box>
        </form>
    )
}

export default ItemEditForm