import React, { useEffect, useState } from 'react'
import { Grid } from "@mui/material";
import ItemCard from './ItemCard';
import { PacmanLoader } from 'react-spinners';
import { backendURL } from '../API/main';

const ItemContainer = () => {

    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(true);

    console.log({ process: process.env, url: process.env.REACT_APP_API })

    const getData = async () => {
        try {
            const response = await fetch(`${backendURL}/api/products/all`, {
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
        return <PacmanLoader color='#2196f3' />
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