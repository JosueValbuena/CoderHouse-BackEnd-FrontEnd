import React, { useCallback, useEffect, useRef } from 'react';
import { Person } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openSideBar } from '../redux/utilsSlice';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const isOpenSideBar = useSelector((state) => state.sidebar.open);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const ref = useRef();
    const refSideBar = useRef(isOpenSideBar);

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
        },
        mdStyle: {
            left: '50%',
            backgroundColor: '#000',
        }
    };

    const handleSidebar = useCallback (() => {
        refSideBar.current = isOpenSideBar;
        dispatch(openSideBar(!isOpenSideBar));
    }, [isOpenSideBar, dispatch]);

    useEffect(() => {

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && isOpenSideBar) {
                handleSidebar();
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpenSideBar, handleSidebar]);

    return (
        <Box ref={ref} sx={isOpenSideBar ? sideBarVisible.visibleStyle : sideBarVisible.nonVisibleStyle} md={sideBarVisible.mdStyle} p={2}>
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
                        <Button variant="outlined" startIcon={<Person />} onClick={handleSidebar}>
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