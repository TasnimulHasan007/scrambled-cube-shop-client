import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Box,
  LinearProgress,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useFirebase'
import Header from '../../Shared/Header/Header'
import PageBanner from '../PageBanner/PageBanner'

const MyOrders = () => {
  // states
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  // auth stuff
  const { user, token } = useAuth()
  // load orders
  useEffect(() => {
    if (user.email && token) {
      fetch(`http://localhost:5000/orders/${user.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setOrders(data)
          setLoading(false)
        })
    }
  }, [user, token])

  // return
  return (
    <>
      <Header />
      {loading && (
        <Box>
          <LinearProgress color="inherit" />
        </Box>
      )}
      <PageBanner pageName="My Orders" />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {orders.length ? (
            orders.map(order => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={order._id}
                sx={{ textAlign: 'center' }}
              >
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Order #{order._id}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'var(--clr-primary)',
                      }}
                      component="div"
                    >
                      {order.productName}
                    </Typography>
                    <Table sx={{ width: '100%', my: 2 }}>
                      <TableBody>
                        <TableRow>
                          <TableCell>Quantity</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Price</TableCell>
                          <TableCell>৳{order.price}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Total</TableCell>
                          <TableCell>৳{order.price * order.quantity}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell sx={{ textTransform: 'capitalize' }}>
                            {order.status}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <span
                        style={{
                          color: 'var(--clr-primary)',
                          fontWeight: 'bold',
                        }}
                      >
                        Shipping Address:
                      </span>{' '}
                      {order.address}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{
                      background: 'var(--clr-primary)',
                      justifyContent: 'center',
                      padding: '0',
                    }}
                  >
                    <Button
                      color="inherit"
                      style={{ color: '#fff', width: '100%' }}
                    >
                      Cancel Order
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <p>No orders to show</p>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default MyOrders
