import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import UserProfile from '../components/user/UserProfile'
import CreateAccount from '../components/user/CreateAccount'
import LogInUser from '../components/user/LogInUser'

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />;
                <Route path='/user' element={<UserProfile />} />;
                <Route path='/createacount' element={<CreateAccount />} />
                <Route path='/login' element={<LogInUser />} />
            </Routes>
        </div>
    )
}

export default Router