import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './molecules/CartItem';
import { PacmanLoader } from 'react-spinners';
import CartResume from './molecules/CartResume';

const CartContainer = () => {

    const [cartItems, setCartItems] = useState([]);
    const [loader, setLoader] = useState(true);
    const user = useSelector(state => state.user.user);
    console.log(cartItems);

    const getItemsCart = async () => {
        const uid = user.id;
        try {
            const response = await fetch(`http://localhost:3001/api/carts/usercart/${uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                return console.error(response);
            }

            const data = await response.json();
            console.log(data);
            setCartItems(data.payload[0].products);
            setLoader(false);
        } catch (error) {
            throw new Error('Error en consulta informacion de items del carrito', error);
        };
    };

    useEffect(() => {
        getItemsCart();
    }, []);

    if (loader) return <PacmanLoader color='#2196f3' />

    return (
        <Grid sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
            <Grid container spacing={2}>
                {cartItems.map(ele => {
                    return <CartItem key={ele._id} product={ele} />
                })}
            </Grid>

            <Grid>
                <CartResume />
            </Grid>
        </Grid>
    )
}

export default CartContainer