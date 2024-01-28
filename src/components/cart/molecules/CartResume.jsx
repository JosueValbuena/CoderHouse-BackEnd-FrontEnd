import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'

const CartResume = () => {
    return (
        <Paper sx={{ margin: { xs: '1rem 0', md: '0' }, padding: '1rem', width: { lg: '17rem' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '.5rem 0' }}>
                <Typography>Total</Typography>
                <Typography>CLP: 876874234</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '.5rem 0' }}>
                <Button variant='contained'>Realizar Compra</Button>
            </Box>
        </Paper>
    )
}

export default CartResume