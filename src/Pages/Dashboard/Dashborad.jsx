import { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import useAuth from '../../hooks/useAuth'
import { NavLink, Link, useRouteMatch, Switch, Route } from 'react-router-dom'
import Pay from '../../components/Pay/Pay'
import MyOrders from '../../components/MyOrders/MyOrders'
import Review from '../../components/Review/Review'
import ManageOrders from '../../components/ManageOrders/ManageOrders'
import AddProduct from '../../components/AddProduct/AddProduct'
import MakeAdmin from '../../components/MakeAdmin/MakeAdmin'
import ManageProducts from '../../components/ManageProducts/ManageProducts'
import AdminRoute from '../../components/AdminRoute/AdminRoute'

const drawerWidth = 240

const Dashborad = props => {
  // authentication stuff
  const { user, logOut, admin } = useAuth()
  // router
  const { path, url } = useRouteMatch()

  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
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
      <List>
        {admin ? (
          <>
            <Link to={`${url}/manageOrders`} style={{ width: '100%' }}>
              <ListItem button>
                <ListItemText primary="Manage All Orders" />
              </ListItem>
            </Link>
            <Link to={`${url}/addProduct`} style={{ width: '100%' }}>
              <ListItem button>
                <ListItemText primary="Add A Product" />
              </ListItem>
            </Link>
            <Link to={`${url}/makeAdmin`} style={{ width: '100%' }}>
              <ListItem button>
                <ListItemText primary="Make Admin" />
              </ListItem>
            </Link>
            <Link to={`${url}/manageProducts`} style={{ width: '100%' }}>
              <ListItem button>
                <ListItemText primary="Manage Products" />
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link to={`${url}/pay`} style={{ width: '100%' }}>
              <ListItem button>
                <ListItemText primary="Pay" />
              </ListItem>
            </Link>
            <Link to={`${url}/myOrders`} style={{ width: '100%' }}>
              <ListItem button>
                <ListItemText primary="My Orders" />
              </ListItem>
            </Link>
            <Link to={`${url}/review`} style={{ width: '100%' }}>
              <ListItem button>
                <ListItemText primary="Review" />
              </ListItem>
            </Link>
          </>
        )}
        <ListItem button onClick={logOut}>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }} id="dashboard">
      <CssBaseline />
      <AppBar
        className="header"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <i className="fas fa-bars"></i>
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 'auto' }}>
              Dashboard
            </Typography>
            <NavLink to="/" className={link => (link.isActive ? 'active' : '')}>
              <span className="nav-link">Home</span>
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          py: 5,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar />
          <Switch>
            <Route exact path={`${path}`}>
              <Pay />
            </Route>
            <Route path={`${path}/pay`}>
              <Pay />
            </Route>
            <Route path={`${path}/myOrders`}>
              <MyOrders />
            </Route>
            <Route path={`${path}/review`}>
              <Review />
            </Route>
            <AdminRoute path={`${path}/manageOrders`}>
              <ManageOrders />
            </AdminRoute>
            <AdminRoute path={`${path}/addProduct`}>
              <AddProduct />
            </AdminRoute>
            <AdminRoute path={`${path}/makeAdmin`}>
              <MakeAdmin />
            </AdminRoute>
            <AdminRoute path={`${path}/manageProducts`}>
              <ManageProducts />
            </AdminRoute>
          </Switch>
        </Container>
      </Box>
    </Box>
  )
}

export default Dashborad
