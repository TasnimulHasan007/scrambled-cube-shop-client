import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, TextField, CircularProgress, Alert } from '@mui/material'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Snack from '../Snack/Snack'

const Login = ({ url, destination, history }) => {
  // states
  const [openLoginSnackbar, setOpenLoginSnackbar] = useState(false)
  // authentication stuff
  const { user, loginUser, isLoading, authError } = useAuth()
  // react hook form
  const { register, handleSubmit, reset } = useForm()
  // handle register
  const handleLogin = data => {
    const { email, password } = data
    loginUser(email, password, destination, history)
    setOpenLoginSnackbar(true)
    reset()
  }
  // snakbar close
  const handleSnackbarClose = () => {
    setOpenLoginSnackbar(false)
  }
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
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
            Login
          </Button>
          <br />
          <br />
          <hr />
          <br />
          <Link to={`${url}/register`}>Create an account</Link>
        </>
      )}
      {user.email && (
        <Snack
          open={openLoginSnackbar}
          duration={30000}
          handleClose={handleSnackbarClose}
          severity="success"
          message="Login Successful!"
        />
      )}
    </form>
  )
}

export default Login
