import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';

const ItemEditForm = ({ data }) => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    console.log(data)
    return (

        <form onSubmit={handleSubmit}>
            <Box>
                {Object.keys(data).map(key => (
                    !["_id", "__v", "user"].includes(key) && (
                        <TextField
                            key={key}
                            type='text'
                            placeholder={key}
                            defaultValue={data[key]}
                            {...register(key, { required: true })}
                            fullWidth
                        />)
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained'>Modificar Producto</Button>
            </Box>
        </form>
    )
}

export default ItemEditForm