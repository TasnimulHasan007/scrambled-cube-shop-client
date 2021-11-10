import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import Snack from '../Snack/Snack'

const MakeAdmin = () => {
  // authentication stuff
  const { token } = useAuth()
  // states
  const [snackOpen, setSnackOpen] = useState(false)
  const [severity, setSeverity] = useState('success')
  // react hook form
  const { register, handleSubmit, reset } = useForm()
  // handle make admin
  const makeAdmin = user => {
    fetch('http://localhost:5000/users/admin', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          setSnackOpen(true)
          setSeverity('success')
        } else {
          setSnackOpen(true)
          setSeverity('error')
        }
      })
    reset()
  }
  // handle snackbar close
  const handleSnackClose = () => {
    setSnackOpen(false)
  }
  return (
    <div>
      <Typography variant="h5">Add an Admin</Typography>
      <form onSubmit={handleSubmit(makeAdmin)}>
        <TextField
          variant="standard"
          label="Email"
          type="email"
          placeholder="example@domain.com"
          {...register('email')}
          required
          autoComplete="off"
        />
        <br />
        <br />
        <Button type="submit" variant="contained">
          Make Admin
        </Button>
      </form>
      <Snack
        open={snackOpen}
        duration={4000}
        handleClose={handleSnackClose}
        severity={severity}
        message={
          severity === 'success'
            ? 'Admin added successfully!'
            : 'Failed to add admin!'
        }
      />
    </div>
  )
}

export default MakeAdmin
