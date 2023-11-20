import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import UserProfile from '../components/user/UserProfile'
import CreateAccount from '../components/user/CreateAccount'
import LogInUser from '../components/user/LogInUser'
import ProtectedRoutes from './ProtectedRoutes'
import { useSelector } from 'react-redux'
import { Box, Container, Grid } from '@mui/material'
import ItemDetail from '../components/products/ItemDetail'

const Router = () => {

    const user = useSelector((state) => state.user.user);

    return (
        <Box sx={{ width: { xs: '100%', sm: '70%', md: '75%', lg: '80%' }, display: 'flex', justifyContent: 'center' }}>
            <Container>
                <Grid container justifyContent='center'>
                    <Routes>
                        <Route path='/' element={<Home />} />;
                        <Route path='/createacount' element={<CreateAccount />} />
                        <Route path='/login' element={<LogInUser />} />
                        <Route path='/product-detail/:id' element={<ItemDetail />} />
                        <Route element={<ProtectedRoutes user={user} />}>
                            <Route path='/user' element={<UserProfile />} />;
                        </Route>
                    </Routes>
                </Grid>
            </Container>
        </Box>
    )
}

export default Router