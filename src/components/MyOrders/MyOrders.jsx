import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useFirebase'
import { useConfirm } from 'material-ui-confirm'
import Snack from '../Snack/Snack'

const MyOrders = () => {
  // states
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [snackOpen, setSnackOpen] = useState(false)
  const [severity, setSeverity] = useState('success')
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
  // confirm
  const confirm = useConfirm()
  // handler cancel order
  const handleCancelOrder = orderId => {
    confirm({
      title: 'Are you sure?',
      description: 'This will cancel your order',
    })
      .then(() => {
        fetch(`http://localhost:5000/orders/${orderId}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              if (data.deletedCount) {
                setOrders(orders.filter(order => order._id !== orderId))
                setSeverity('success')
                setSnackOpen(true)
              } else {
                setSeverity('error')
                setSnackOpen(true)
              }
            }
          })
      })

      .catch(() => {})
  }
  // handle snackbar close
  const handleSnackClose = () => {
    setSnackOpen(false)
  }

  // return
  return (
    <>
      <Snack
        open={snackOpen}
        duration={4000}
        handleClose={handleSnackClose}
        severity={severity}
        message={
          severity === 'success'
            ? 'Order deleted successfully!'
            : 'Failed to delete order!'
        }
      />
      {loading ? (
        <CircularProgress
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'var(--clr-primary)',
          }}
        />
      ) : (
        <Grid container spacing={3}>
          {orders.length ? (
            orders.map(order => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                xl={3}
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
                      onClick={() => handleCancelOrder(order._id)}
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
      )}
    </>
  )
}

export default MyOrders
