import React, { useEffect, useRef } from 'react';
import { Person } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openSideBar } from '../redux/utilsSlice';
import { Link } from 'react-router-dom';
import UserProfile from './user/UserProfile';

const SideBar = () => {
    const isOpenSideBar = useSelector((state) => state.sidebar.open);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const ref = useRef();

    const sideBarVisible = {
        visibleStyle: {
            position: 'absolute',
            zIndex: '2000',
            top: '5.4rem',
            left: '0',
            transition: '0.3s',
            backgroundColor: '#eee',
            width: '100%'

        },
        nonVisibleStyle: {
            position: 'absolute',
            zIndex: '-1000',
            left: '-100%',
            transition: '0.3s'
        }
    };

    useEffect(() => {
        /* function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                dispatch(openSideBar(false));
                console.log('click fuera del componente')
            }
        } */

        /* if(isOpenSideBar){
            document.addEventListener('mousedown', handleSidebar);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleSidebar);
        }; */
    }, [isOpenSideBar, dispatch]);

    const handleSidebar = () => {
        dispatch(openSideBar(!isOpenSideBar));
    }

    return (
        <Box sx={isOpenSideBar ? sideBarVisible.visibleStyle : sideBarVisible.nonVisibleStyle} p={2}>
            <Typography>
                Perfil
            </Typography>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#fafafa',
                borderRadius: '10px'
            }}
                py={2}
                my={1} >
                {user ?
                    <Box>
                        <Link to='/user'>
                            <Button variant="outlined" startIcon={<Person />}>
                                Perfil
                            </Button>
                        </Link>
                    </Box>
                    :
                    <Link to='/login'>
                        <Button variant="outlined" startIcon={<Person />}>
                            Inicia Sesion
                        </Button>
                    </Link>
                }
            </Box>

            <Typography>
                Categorias
            </Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fafafa',
                borderRadius: '10px'
            }}
                py={2}
                my={1}>
                <Button variant="text" onClick={handleSidebar}>Categoria 1</Button>
                <Button variant="text" onClick={handleSidebar}>Categoria 2</Button>
                <Button variant="text" onClick={handleSidebar}>Categoria 3</Button>
                <Button variant="text" onClick={handleSidebar}>Categoria 4</Button>
            </Box>
        </Box>
    )
}

export default SideBar