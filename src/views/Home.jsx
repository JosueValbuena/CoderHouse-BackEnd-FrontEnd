import { Box } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import ItemContainer from '../components/products/ItemContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '../redux/cartSlice'

const Home = () => {

    const user = useSelector(state => state.user.user);
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    const getCart = useCallback(
        async () => {
            const uid = user.id;
            try {
                const response = await fetch(`http://localhost:3001/api/carts/usercart/${uid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    console.error('Error consultando informacion de carrito de usuario');
                    throw new Error('Error consultando informacion de carrito de usuario');
                };

                const data = await response.json();
                dispatch(setCart(data.payload));
            } catch (error) {
                throw new Error('Error en consulta de carrito de usuario', error);
            };
        }, [user, dispatch]);

    useEffect(() => {
        user && getCart();
    }, [getCart, user, cart])


    return (
        <Box>
            <ItemContainer />
        </Box>
    )
}

export default Home