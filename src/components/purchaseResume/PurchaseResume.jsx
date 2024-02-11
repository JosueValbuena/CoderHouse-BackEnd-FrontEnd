import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PurchasedResumeCard from './molecules/purchasedResumeCard.jsx/PurchasedResumeCard';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { Home } from '@mui/icons-material';
import { backendURL } from '../API/main';

const PurchaseResume = () => {

    const [purchasedData, setPurchasedData] = useState([]);
    const [loader, setLoader] = useState(true);
    const params = useParams();
    const user = useSelector(state => state.user.user);

    const getTicket = async (user, params) => {
        try {
            const uid = user.id;
            const phid = params.phid
            const response = await fetch(`${backendURL}/api/purchases/getticket/${phid}/user/${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error({ response, message: 'Error consultado compra de usuario' });
                return
            };

            const data = await response.json();
            setPurchasedData(data.payload);
            setLoader(false);
            //console.log({ data: data.payload[0].products, purchasedData, dataState: data.payload });
        } catch (error) {
            throw new Error('Error en consulta compra de usuario', error.message);
        }
    };

    useEffect(() => {
        getTicket(user, params)
    }, [user, params]);

    if (loader) return <PacmanLoader color='#2196f3' />

    return (
        <Grid container>
            <Grid item xs={12} marginBottom={2}>
                <Paper sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem 0'
                }}>
                    <Typography marginBottom={1}>Gracias por realizar tu compra!</Typography>
                    <Button
                        variant="contained"
                        startIcon={<Home />}
                        component={Link}
                        to='/'>
                        Volver al inicio
                    </Button>
                </Paper>
            </Grid>

            <Grid item xs={12} marginBottom={2}>
                <Paper sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                    <Typography>Total: </Typography>
                    <Typography>${purchasedData[0].amount.toLocaleString()}</Typography>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Box>
                    {purchasedData[0].products.map(ele => {
                        return (
                            <PurchasedResumeCard
                                key={ele._id}
                                data={ele}
                            />
                        )
                    })}
                </Box>
            </Grid>
        </Grid>
    )
}

export default PurchaseResume