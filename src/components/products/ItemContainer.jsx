import React, { useEffect, useState } from 'react'
import { Button, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import ItemCard from './ItemCard';

const ItemContainer = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/products/all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) return console.log('Fallo peticion');

                const data = await response.json();
                console.log(data);
                setProducts(data.payload.docs);
            } catch (error) {
                console.error('Error consultando productos: ' + error);
            }
        };
        return () => {
            getData()
        };
    }, []);

    return (
        <Grid container spacing={2}>
            {products.map(ele => {
                return <ItemCard key={ele._id} product={ele} />
            })};
        </Grid>
    )
}

export default ItemContainer