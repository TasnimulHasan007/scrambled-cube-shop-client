import React, { useState } from 'react'
import {
  AppBar,
  Avatar,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { NavLink, useHistory } from 'react-router-dom'
import logo from '../../images/logo.svg'
import './Header.css'
import useAuth from '../../hooks/useAuth'
import MobileMenu from './MobileMenu'

const Header = () => {
  // media query hook
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  // history
  const history = useHistory()
  // authentication stuff
  const { user, logOut } = useAuth()
  // profile dropdown
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar position="sticky" id="header">
      <Container maxWidth="xl">
        <Toolbar>
          <span className="logo">
            <img src={logo} alt="Scrambled" />
            <h2>Scrambled</h2>
          </span>
          {isMobile ? (
            <MobileMenu />
          ) : (
            <>
              <NavLink
                to="/home"
                className={link => (link.isActive ? 'active' : '')}
              >
                <span className="nav-link">Home</span>
              </NavLink>
              <NavLink
                to="/products"
                className={link => (link.isActive ? 'active' : '')}
              >
                <span className="nav-link">Products</span>
              </NavLink>
              {user.email ? (
                <>
                  <NavLink
                    to="/dashboard/myOrders"
                    className={link => (link.isActive ? 'active' : '')}
                  >
                    <span className="nav-link">My Orders</span>
                  </NavLink>
                  <IconButton
                    onClick={handleMenuClick}
                    size="small"
                    sx={{ ml: 2 }}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user?.displayName?.slice(0, 1)}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        textAlign: 'center',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))',
                        mt: 1.5,
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <Avatar
                      sx={{
                        w: 40,
                        h: 40,
                        mb: 1,
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      {user?.displayName?.slice(0, 1)}
                    </Avatar>
                    <Typography variant="body1" sx={{ px: 2 }}>
                      {user?.displayName}
                    </Typography>
                    <Typography variant="body2" sx={{ px: 2 }}>
                      {user?.email}
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                    <MenuItem onClick={() => history.push('/dashboard')}>
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <NavLink
                    to="/account"
                    className={link => (link.isActive ? 'active' : '')}
                  >
                    <span className="nav-link">Account</span>
                  </NavLink>
                </>
              )}
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
