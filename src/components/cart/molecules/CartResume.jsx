import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartResume = ({ totalPayment }) => {

    const navegate = useNavigate();
    const cid = useSelector(state => state.cart.cartID);
    const user = useSelector(state => state.user.user);

    const handlePurchase = async () => {

        const uid = user.id;
        console.log({ uid });

        try {
            const response = await fetch(`http://localhost:3001/api/purchases/createpurchase/cart/${cid}/user/${uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) return console.error({ response });

            const data = await response.json();
            console.log({ data });
            const phid = data.payload._id;
            navegate(`/user/purchased/${phid}`);
        } catch (error) {
            throw new Error('Error en consulta crear compra', error);
        };
    };

    return (
        <Paper sx={{ margin: { xs: '1rem 0', md: '0' }, padding: '1rem', width: { lg: '17rem' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '.5rem 0' }}>
                <Typography>Total:</Typography>
                <Typography>$ {totalPayment.toLocaleString('es')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '.5rem 0' }}>
                <Button variant='contained' onClick={handlePurchase}>Realizar Compra</Button>
            </Box>
        </Paper>
    )
}

export default CartResume