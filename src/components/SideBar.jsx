import React, { useCallback, useEffect, useRef } from 'react';
import { Person } from '@mui/icons-material';
import { Box, Button, Typography, createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openSideBar } from '../redux/utilsSlice';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const SideBar = () => {
    const isOpenSideBar = useSelector((state) => state.sidebar.open);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const ref = useRef();
    //const refSideBar = useRef(isOpenSideBar);

    const theme = createTheme({
        breakpoints: {
            values: {
                laptop: 1023
            }
        }
    });

    const SideBar = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: '5.4rem',
        left: isOpenSideBar ? '0' : '-100%',
        transition: '0.5s',
        backgroundColor: '#eee',
        width: '100%',
        padding: '1rem 2rem',
        [theme.breakpoints.up('sm')]: {
            left: '0',
            zIndex: '1000',
            top: '5.5rem',
            width: '35%'
        },
        [theme.breakpoints.up('md')]: {
            top: '5.5rem',
            width: '25%'
        },
        [theme.breakpoints.up('lg')]: {
            top: '4rem',
            width: '25%'
        }
    }));

    const handleSidebar = useCallback(() => {
        //refSideBar.current = isOpenSideBar;
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
        <SideBar ref={ref}>
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
        </SideBar>
    )
}

export default SideBar