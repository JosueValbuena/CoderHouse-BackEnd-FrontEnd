import React, { useEffect, useState } from 'react'
import { Grid, Typography } from "@mui/material";
import ItemCard from './ItemCard';

const ItemContainer = () => {

    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(true);

    const getData = async () => {
        try {
            const response = await fetch('https://coderhouse-backend-w8sd.onrender.com/api/products/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) throw new Error('Error consultando productos');

            const data = await response.json();
            setProducts(data.payload.docs);
            setLoader(false);
        } catch (error) {
            console.error('Error consultando productos: ' + error);
            throw new Error('Error consultando productos');
        }
    };

    useEffect(() => {
        getData()
    }, []);

    if (loader) {
        return <Typography> Cargando... </Typography>
    }

    return (
        <Grid container spacing={2}>
            {products.map(ele => {
                return <ItemCard key={ele._id} product={ele} />
            })}
        </Grid>
    )
}

export default ItemContainer