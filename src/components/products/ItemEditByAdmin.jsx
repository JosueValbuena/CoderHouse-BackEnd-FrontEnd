import { Box, Grid, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { PacmanLoader } from 'react-spinners';
import ItemUserDetail from './ItemUserDetail';
import { backendURL } from '../API/main';

const ItemEditByAdmin = () => {

    const [products, setproducts] = useState([]);
    const [loader, setLoader] = useState(true);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurretPage] = useState(1);

    const getData = async (newlink) => {

        const baselink = `${backendURL}/api/products/all`;
        const linkToFetch = newlink || baselink;

        try {
            const response = await fetch(linkToFetch, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                toast.error('Error consultando todos los productos');
                return console.error(response);
            };

            const data = await response.json();
            setproducts(data.payload.docs);
            const paginationInfo = data;
            delete paginationInfo.payload.docs;
            setPagination(paginationInfo);
            setLoader(false);

        } catch (error) {
            throw new Error('Error en consulta todos los productos');
        };
    };

    const handlePagination = (e, page) => {
        let newPage = page;
        if (newPage > currentPage) {
            setLoader(true);
            getData(pagination.nextLinkPage && pagination.nextLinkPage)
            setCurretPage(newPage);
        } else {
            setLoader(true);
            getData(pagination.prevLink && pagination.prevLink)
            setCurretPage(newPage);
        };
    }

    useEffect(() => {
        getData();
    }, []);

    if (loader) return <PacmanLoader color='#2196f3' />

    return (
        <Box>
            <Grid container spacing={2}>
                {products.map(ele => <ItemUserDetail product={ele} />)}
            </Grid>

            <Box display='flex' justifyContent='center' py={2}>
                <Pagination
                    count={pagination.payload.totalPages}
                    variant="outlined"
                    color="primary"
                    page={pagination.payload.page}
                    onChange={(e, page) => handlePagination(e, page)}
                />
            </Box>
        </Box>
    )
}

export default ItemEditByAdmin