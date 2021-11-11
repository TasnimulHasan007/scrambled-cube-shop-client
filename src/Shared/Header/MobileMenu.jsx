import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const MobileMenu = () => {
  // auth stuff
  const { user, logOut } = useAuth()
  // states
  const [openDrawer, setOpenDrawer] = useState(false)
  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }
  return (
    <>
      <Drawer
        // container={container}
        variant="temporary"
        open={openDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {user.email && (
          <>
            <Avatar
              sx={{
                w: 40,
                h: 40,
                mt: 4,
                mb: 2,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              {user.displayName.slice(0, 1)}
            </Avatar>
            <Typography variant="body1" sx={{ px: 2, textAlign: 'center' }}>
              {user.displayName}
            </Typography>
            <Typography variant="body2" sx={{ px: 2, textAlign: 'center' }}>
              {user.email}
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </>
        )}
        <List>
          <NavLink
            className={link => (link.isActive ? 'active' : '')}
            to={'/home'}
            style={{ width: '100%' }}
          >
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>
          <Divider />
          <NavLink
            className={link => (link.isActive ? 'active' : '')}
            to={'/products'}
            style={{ width: '100%' }}
          >
            <ListItem button>
              <ListItemText primary="Products" />
            </ListItem>
          </NavLink>
          <Divider />
          {user.email ? (
            <>
              <NavLink
                className={link => (link.isActive ? 'active' : '')}
                to={'/dashboard/myOrders'}
                style={{ width: '100%' }}
              >
                <ListItem button>
                  <ListItemText primary="My Orders" />
                </ListItem>
              </NavLink>
              <Divider />
              <NavLink
                className={link => (link.isActive ? 'active' : '')}
                to={'/dashboard'}
                style={{ width: '100%' }}
              >
                <ListItem button>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </NavLink>
              <Divider />
              <ListItem button onClick={logOut}>
                <ListItemText primary="Log Out" />
              </ListItem>
              <Divider />
            </>
          ) : (
            <>
              <NavLink
                className={link => (link.isActive ? 'active' : '')}
                to={'/account'}
                style={{ width: '100%' }}
              >
                <ListItem button>
                  <ListItemText primary="Account" />
                </ListItem>
              </NavLink>
              <Divider />
            </>
          )}
        </List>
      </Drawer>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <i className="fas fa-bars"></i>
      </IconButton>
    </>
  )
}

export default MobileMenu
