import React from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';

const PurchasedResumeCard = ({ data }) => {
    return (
        <Card sx={{ display: 'flex', margin: '1rem 0' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://images.unsplash.com/photo-1515974256630-babc85765b1d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Card IMG"
            />
            <Box sx={{
                flex: '1 0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: '0 1rem'
            }}>
                <Typography component="div" variant="h5">
                    {data.product.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Precio: ${data.product.price.toLocaleString()}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Cantidad: {data.qty}
                </Typography>
            </Box>
        </Card>
    )
}

export default PurchasedResumeCard