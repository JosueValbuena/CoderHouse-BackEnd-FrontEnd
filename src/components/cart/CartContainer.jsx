import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './molecules/CartItem';
import { PacmanLoader } from 'react-spinners';
import CartResume from './molecules/CartResume';

const CartContainer = () => {

    const [cartItems, setCartItems] = useState([]);
    const [loader, setLoader] = useState(true);
    const getCartItems = useSelector(state => state.cart.cart);
    const getCartTotalPayment = getCartItems.length !== 0
        ? getCartItems[0].products
            .map(ele => ele.product.price * ele.qty)
            .reduce((acc, sum) => acc + sum, 0)
        : 0;
    //const user = useSelector(state => state.user.user);

    const setItemsData = (getCartItems) => {
        if (getCartItems.length !== 0) {
            setCartItems(getCartItems[0].products)
            setLoader(false);
        } else {
            setLoader(false)
        }
    };

    useEffect(() => {
        setItemsData(getCartItems)
    }, [getCartItems])

    if (loader) return <PacmanLoader color='#2196f3' />

    return (
        <Grid sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: { xs: 'column', lg: 'row' }
        }}>
            <Grid container spacing={2}>
                {cartItems.length > 0
                    ? cartItems.map(ele => {
                        return <CartItem key={ele._id} product={ele} />
                    })
                    : <Typography>¡Explora y suma productos a tu carrito de compras!</Typography>}
            </Grid>

            <Grid>
                <CartResume totalPayment={getCartTotalPayment} />
            </Grid>
        </Grid>
    )
}

export default CartContainer