import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, Typography, MenuItem, IconButton, Toolbar, Box, } from '@mui/material';
import { InputBase, Tooltip, Avatar, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import Logo from '../Logo.js';

const drawerWidth = 240;

const settings = ['Profile', 'All PickUps', 'Home', 'Logout'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
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
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(

    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer(props) {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: "lightgreen" }} position="fixed" open={open}>
                <Toolbar sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Box sx={{display:"flex"}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box component="img" src="/website_logo.svg" sx={{ ml: 6, backgroundSize:'cover', height: 48 }} />

                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Search sx={{ mr: 5, }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search> 
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="user" src="data:image/png;base64,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" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Chat', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
                {props.children}
            </Box>
        </Box>
    );
}






