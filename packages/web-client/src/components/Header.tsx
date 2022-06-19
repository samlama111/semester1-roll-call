import {
    Box, Divider, List, ListItemIcon, ListItemText 
} from '@material-ui/core'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LoginIcon from '@mui/icons-material/Login'
import MenuIcon from '@mui/icons-material/Menu'
import TocIcon from '@mui/icons-material/Toc'
import { Button, ListItemButton } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

import { auth, logout } from '../firebase'

export const drawerWidth = 240
export default function Header() {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            {user ? (
                <List>
                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Start roll-call" />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/attendance')}>
                        <ListItemIcon>
                            <TocIcon />
                        </ListItemIcon>
                        <ListItemText primary="Attendance" />
                    </ListItemButton>
                </List>
            )
                : (
                    <List>
                        <ListItemButton onClick={() => navigate('/login')}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItemButton>
                        <ListItemButton onClick={() => navigate('/register')}>
                            <ListItemIcon>
                                <HowToRegIcon />
                            </ListItemIcon>
                            <ListItemText primary="Register" />
                        </ListItemButton>
                    </List>
                )}
        </div>
    )
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}>
                <Toolbar color="primary">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                        Attendance Buddy for the Board of Administration
                    </Typography>
                    {user && <Button variant="contained" color="warning" onClick={() => logout()}>Log out</Button>}
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}>
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open>
                    {drawer}
                </Drawer>
                <Toolbar style={{ marginBottom: '1rem' }} />
            </Box>    
        </>
    )
}
