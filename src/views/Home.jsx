import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import ItemContainer from '../components/products/ItemContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setCart, setCartID } from '../redux/cartSlice'
import { setTotalItems } from '../redux/totalItemCart'
import { backendURL } from '../components/API/main'

export const getCart = async (dispatch, user) => {

    if (!user) {
        return console.log('Usuario no autenticado')
    }
    try {
        const uid = user.id;

        const response = await fetch(`${backendURL}/api/carts/usercart/${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Error consultando informacion de carrito de usuario');
            console.error({ response })
            return
        };

        const data = await response.json();
        console.log({ data })

        if (data.payload && data.payload[0] && data.payload.length !== 0) {
            const totalItemsInCart = data.payload[0].products.map(item => item.qty).reduce((acc, sum) => acc + sum, 0)
            const cardID = data.payload[0]._id;

            dispatch(setTotalItems(totalItemsInCart));
            dispatch(setCart(data.payload));
            dispatch(setCartID(cardID));
        } else {
            dispatch(setTotalItems(0));
            dispatch(setCart([]));
            dispatch(setCartID(0));
        }
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