import { Add, DeleteForever, Remove } from '@mui/icons-material'
import { Box, Grid, Paper, Rating, Typography } from '@mui/material'
import React from 'react'

const CartItem = ({ product }) => {
    return (
        <Grid item xs={12} md={8}>
            <Paper sx={{ padding: '1rem' }}>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant='body2'>Marca</Typography>
                        <Typography variant='h5'>{product.product.title}</Typography>
                        <Box display='flex' alignItems='center'>
                            <Rating name="read-only" value={0} readOnly />
                            <Typography variant='body2' px={2}> (0 reseñas) </Typography>
                        </Box>
                        <Typography variant='body2'>Vendido por: VENDEDOR</Typography>
                    </Box>
                    <Box>
                        <DeleteForever color='error' />
                    </Box>
                </Grid>

                <Grid>
                    <Box py={2}>
                        <img style={{ width: '100%' }} src="https://images.unsplash.com/photo-1515974256630-babc85765b1d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </Box>
                </Grid>

                <Grid width='100%'>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>CLP: {product.product.price}</Typography>

                        <Box display='flex' alignItems='center'>
                            <Remove />
                            <Typography>{product.qty}</Typography>
                            <Add />
                        </Box>
                    </Box>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default CartItem