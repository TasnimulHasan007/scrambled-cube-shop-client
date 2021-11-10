import { useForm } from 'react-hook-form'
import { Button, TextField, CircularProgress, Alert } from '@mui/material'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
import Snack from '../Snack/Snack'

const Register = ({ url, destination, history }) => {
  // states
  const [openRegisterSnackbar, setOpenRegisterSnackbar] = useState(false)
  // authentication stuff
  const { user, registerUser, isLoading, authError } = useAuth()
  // react hook form
  const { register, handleSubmit, reset } = useForm()
  // handle register
  const handleRegister = data => {
    const { displayName, email, password } = data
    registerUser(email, password, displayName, destination, history)
    reset()
    setOpenRegisterSnackbar(true)
  }
  // snakbar close
  const handleSnackbarClose = () => {
    setOpenRegisterSnackbar(false)
  }
  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            label="Name"
            placeholder="John Doe"
            variant="standard"
            {...register('displayName')}
            required
          />
          <br />
          <br />
          <TextField
            label="Email"
            type="email"
            placeholder="example@domain.com"
            variant="standard"
            {...register('email')}
            required
          />
          <br />
          <br />
          <TextField
            label="Password"
            type="password"
            placeholder="******"
            variant="standard"
            {...register('password')}
            required
          />
          <br />
          {authError && <Alert severity="error">{authError}</Alert>}
          <br />
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
          <br />
          <br />
          <hr />
          <br />
          <Link to={`${url}/login`}>Already Registered?</Link>
        </>
      )}
      {user.email && (
        <Snack
          open={openRegisterSnackbar}
          duration={3000}
          handleClose={handleSnackbarClose}
          severity="success"
          message="Registration Successful!"
        />
      )}
    </form>
  )
}

export default Register
