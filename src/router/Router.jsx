import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import UserProfile from '../components/user/UserProfile'
import CreateAccount from '../components/user/CreateAccount'
import LogInUser from '../components/user/LogInUser'
import ProtectedRoutes from './ProtectedRoutes'
import { useSelector } from 'react-redux'
import { Box, Container, Grid } from '@mui/material'
import ItemDetail from '../components/products/ItemDetail'
import PasswordForgot from '../components/user/PasswordForgot'
import PasswordRecovery from '../components/user/PasswordRecovery'
import UserRole from '../components/user/UserRole'
import UsersManager from '../components/user/UsersManager'
import UserInfoEditByAdmin from '../components/user/UserInfoEditByAdmin'
import ItemCreate from '../components/products/ItemCreate'
import UserAllItems from '../components/user/UserAllItems'
import ItemUserEdit from '../components/products/ItemUserEdit'

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
                        <Route path='/password-forgot' element={<PasswordForgot />} />
                        <Route path='/user-role' element={<UserRole />} />
                        <Route path='/password-recovery/:codeRecovery' element={<PasswordRecovery />} />
                        <Route element={<ProtectedRoutes user={user} />}>
                            <Route path='/userprofile' element={user ? <UserProfile /> : <Navigate to='/' />} />;
                            <Route path='/usersmanager' element={user && user.role && user.role === 'admin' ? <UsersManager /> : <Navigate to='/' />} />;
                            <Route path='/admin/edituser/:uid' element={user && user.role && user.role === 'admin' ? <UserInfoEditByAdmin /> : <Navigate to='/' />} />
                            <Route path='/user/itemcreate' element={user ? <ItemCreate /> : <Navigate to='/' />} />
                            <Route path='/user/allproducts' element={user ? <UserAllItems user={user} /> : <Navigate to='/' />} />
                            <Route path='/user/product/:pid' element={user ? <ItemUserEdit user={user} /> : <Navigate to='/' />} />
                        </Route>
                    </Routes>
                </Grid>
            </Container>
        </Box>
    )
}

export default Router