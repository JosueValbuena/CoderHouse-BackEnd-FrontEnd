import { Favorite, ShoppingCart } from '@mui/icons-material'
import { Button, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { /* useDispatch, */ useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCart } from '../../views/Home'

const ItemCard = ({ product }) => {

    const user = useSelector(state => state.user.user);
    const [favorite, setFavorite] = useState(false);
    const navigate = useNavigate();
    //const dispatch = useDispatch();

    const handleClickProductDetail = (id) => {
        navigate(`product-detail/${id}`)
    }

    //llamadas API
    const addToCart = async () => {
        const uid = user.id;
        const pid = product._id;
        try {
            const response = await fetch(`http://localhost:3001/api/carts/addtocart/user/${uid}/product/${pid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            if (!response.ok) {
                return console.error({ response });
            };

            const data = await response.json();
            await getCart();
            console.log(data);
        } catch (error) {
            throw new Error('Error en consulta agregar producto al carrito', error);
        };
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart();
    };

    const handleFavorite = (e) => {
        e.stopPropagation();
        setFavorite(!favorite)
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} onClick={() => handleClickProductDetail(product._id)}>
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
                    <Button variant='outlined' size="small" startIcon={<ShoppingCart />} onClick={(e) => handleAddToCart(e)}>Agregar</Button>
                    <Button variant='outlined' size="small" sx={{ color: favorite ? 'red' : 'gray' }} onClick={(e) => handleFavorite(e)}><Favorite /></Button>
                </CardActions>
            </Paper>
        </Grid>
    )
}

export default ItemCard