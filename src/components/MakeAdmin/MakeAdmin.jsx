import { Button, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import Snack from '../Snack/Snack'

const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--clr-primary)',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: 'var(--clr-primary)',
    },
  },
})

const MakeAdmin = () => {
  // styled
  const classes = useStyles()
  // authentication stuff
  const { token } = useAuth()
  // states
  const [snackOpen, setSnackOpen] = useState(false)
  const [severity, setSeverity] = useState('success')
  // react hook form
  const { register, handleSubmit, reset } = useForm()
  // handle make admin
  const makeAdmin = user => {
    fetch('https://vast-everglades-63169.herokuapp.com/users/admin', {
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
      <form onSubmit={handleSubmit(makeAdmin)} className="form">
        <h2 className="form__title">Add an Admin</h2>
        <TextField
          className={classes.root}
          sx={{ mb: 3, width: '100%' }}
          label="Email"
          type="email"
          placeholder="example@domain.com"
          {...register('email')}
          required
          autoComplete="off"
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{
            background:
              'linear-gradient(to left, var(--clr-primary), var(--clr-primary))',
          }}
        >
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
