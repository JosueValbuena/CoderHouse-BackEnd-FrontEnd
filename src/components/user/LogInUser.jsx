import { AccountCircle, Google, Key } from '@mui/icons-material'
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const LogInUser = () => {
    return (
        <Box>
            <Box sx={{ backgroundColor: '#eee' }} p={2}>
                <Typography>
                    Nos alegra tenerte de vuelta!
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', backgroundColor: '#fafafa' }} py={2}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Ingresa tu Correo" variant="standard" required />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', backgroundColor: '#fafafa' }} py={2}>
                    <Key sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Ingresa tu Clave" type='password' variant="standard" required />
                </Box>
                <Typography>
                    Olvidaste tu contrasenha?
                </Typography>
                <Button variant="contained">Iniciar Session</Button>
                <Typography>
                    O inicia sesion con:
                </Typography>
                <Button variant="contained" color='success' startIcon={<Google />}>Google</Button>
            </Box>
        </Box>
    )
}

export default LogInUser