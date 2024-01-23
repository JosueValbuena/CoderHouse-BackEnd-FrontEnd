import { Button, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

const ItemUserDetail = ({ product }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} /* onClick={() => handleClickProductDetail(product._id)}*/>
                <CardMedia
                    sx={{ height: 140 }}
                    image="https://images.unsplash.com/photo-1515974256630-babc85765b1d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    title="green iguana"
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Marca
                    </Typography>

                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>

                    <Typography variant="body1">
                        CLP: {product.price}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-around' }}>
                    <Button variant='text' color='secondary' size="small">Editar</Button>
                    <Button variant='text' color='error' size="small">Eliminar</Button>
                </CardActions>
            </Paper>
        </Grid>
    );
};

export default ItemUserDetail