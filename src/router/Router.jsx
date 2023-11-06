import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import UserProfile from '../components/user/UserProfile'
import CreateAccount from '../components/user/CreateAccount'
import LogInUser from '../components/user/LogInUser'
import ProtectedRoutes from './ProtectedRoutes'
import { useSelector } from 'react-redux'

const Router = () => {

    const user = useSelector((state) => state.user.user);

    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />;
                <Route path='/createacount' element={<CreateAccount />} />
                <Route path='/login' element={<LogInUser />} />
                <Route element={<ProtectedRoutes user={ user } />}>
                    <Route path='/user' element={<UserProfile />} />;
                </Route>
            </Routes>
        </div>
    )
}

export default Router