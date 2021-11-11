import {
  Button,
  TextField,
  Typography,
  Backdrop,
  Box,
  Modal,
  Fade,
} from '@mui/material'
import useAuth from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Snack from '../Snack/Snack'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
}

const OrderModal = ({
  openModal,
  handleCloseModal,
  product: { name, price },
  quantity,
}) => {
  // states
  const [snackOpen, setSnackOpen] = useState(false)
  const [severity, setSeverity] = useState('success')
  // auth stuff
  const { user, token } = useAuth()
  // react hook form
  const { register, handleSubmit, reset } = useForm()
  // order handler
  const handlePlaceOrder = data => {
    const orderDetails = {
      ...data,
      productName: name,
      price,
      quantity,
      status: 'Pending',
    }
    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderDetails),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.insertedId) {
          reset()
          handleCloseModal()
          setSnackOpen(true)
          setSeverity('success')
        } else {
          setSnackOpen(true)
          setSeverity('error')
        }
      })
  }
  // handle snackbar close
  const handleSnackClose = () => {
    setSnackOpen(false)
  }
  //return
  return (
    <>
      <Snack
        open={snackOpen}
        duration={4000}
        handleClose={handleSnackClose}
        severity={severity}
        message={
          severity === 'success'
            ? 'Order placed successfully!'
            : 'Failed to place order!'
        }
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography
              sx={{ mb: 3 }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              {name}
            </Typography>
            <form onSubmit={handleSubmit(handlePlaceOrder)}>
              <TextField
                sx={{ width: '100%', mb: 2 }}
                label="Your Name"
                {...register('userName')}
                size="small"
                defaultValue={user.displayName}
                required
              />
              <TextField
                sx={{ width: '100%', mb: 2 }}
                label="Your Email"
                {...register('userEmail')}
                size="small"
                defaultValue={user.email}
                type="email"
                required
              />
              <TextField
                sx={{ width: '100%', mb: 2 }}
                label="Your Phone Number"
                {...register('userPhone')}
                size="small"
                type="tel"
              />
              <TextField
                sx={{ width: '100%', mb: 2 }}
                label="Shipping Address"
                {...register('address')}
                size="small"
                type="address"
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background:
                    'linear-gradient(to right, var(--clr-primary), var(--clr-primary))',
                }}
              >
                Place Order
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default OrderModal
