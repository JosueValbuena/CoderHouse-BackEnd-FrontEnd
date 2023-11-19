import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Close, ShoppingCart } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openSideBar } from '../redux/utilsSlice';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    /* const [openSideBarIcon, setOpenSidebarIcon] = React.useState(false); */
    const isOpenSideBar = useSelector((state) => state.sidebar.open);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSidebarOpen = () => {
        /* setOpenSidebarIcon(!openSideBarIcon); */
        dispatch(openSideBar(!isOpenSideBar));
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {user ?
                <Box>
                    <Button
                        color='inherit'
                        component={Link}
                        to='user'
                        xs={{ display: 'block' }}>
                        <MenuItem onClick={handleMenuClose}>Hola {user}</MenuItem>
                    </Button>

                    <Button
                        color='inherit'
                        component={Link}
                        to='login'
                        xs={{ display: 'block' }}>
                        <MenuItem onClick={handleMenuClose}>Cerrar Sesion</MenuItem>
                    </Button>
                </Box>
                :
                <Box>
                    <Button
                        color='inherit'
                        component={Link}
                        to='login'
                        xs={{ display: 'block' }}>
                        <MenuItem onClick={handleMenuClose}>Inicia Sesion</MenuItem>
                    </Button>

                    <Button
                        color='inherit'
                        component={Link}
                        to='createacount'
                        xs={{ display: 'block' }}>
                        <MenuItem onClick={handleMenuClose}>Crea Una Cuenta</MenuItem>
                    </Button>
                </Box>
            }
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1, marginBottom: '1rem' }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Grid item xs={6} lg={3} order={{ xs: 1, lg: 1 }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                            >
                                <Button
                                    color='inherit'
                                    component={Link}
                                    to='/'
                                >
                                    CoderHouse Store
                                </Button>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} lg={6} order={{ xs: 3, lg: 2 }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Grid>


                        <Grid item xs={6} lg={3} order={{ xs: 2, lg: 3 }}>

                            <Box sx={{ display: { xs: 'flex' }, justifyContent: 'flex-end' }}>

                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleSidebarOpen}
                                    sx={{ display: { sm: 'none' } }}
                                >
                                    {isOpenSideBar ? <Close /> : <MenuIcon />}
                                </IconButton>

                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>

                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    aria-label="open drawer"
                                >
                                    <ShoppingCart />
                                </IconButton>

                            </Box>
                        </Grid>


                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box >
    );
}
