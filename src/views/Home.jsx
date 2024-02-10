import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import ItemContainer from '../components/products/ItemContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '../redux/cartSlice'
import { setTotalItems } from '../redux/totalItemCart'

export const getCart = async (dispatch, user) => {

    if (!user) {
        return console.log('Usuario no autenticado')
    }
    try {
        const uid = user.id;

        const response = await fetch(`http://localhost:3001/api/carts/usercart/${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Error consultando informacion de carrito de usuario');
        };

        const data = await response.json();
        const totalItemsInCart = data.payload.length !== 0
            ? data.payload[0].products.map(item => item.qty).reduce((acc, sum) => acc + sum, 0)
            : 0;
        console.log({ totalItemsInCart });
        dispatch(setTotalItems(totalItemsInCart));
        dispatch(setCart(data.payload));
    } catch (error) {
        throw new Error('Error en consulta de carrito de usuario', error);
    };
};

const Home = () => {

    //const totalItemsInCart = useSelector(state => state.totalItemCart.totalItems);

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        getCart(dispatch, user);
    }, [dispatch, user])


    return (
        <Box>
            <ItemContainer />
        </Box>
    )
}

export default Home