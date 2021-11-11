import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, TextField, Alert } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Snack from '../Snack/Snack'
import Loader from '../../Shared/Loader/Loader'

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

const Login = ({ url, destination, history }) => {
  // styled
  const classes = useStyles()
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
    <form onSubmit={handleSubmit(handleLogin)} className="form">
      <h2 className="form__title">Login</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TextField
            className={classes.root}
            label="Email"
            type="email"
            placeholder="example@domain.com"
            sx={{ mb: 3, width: '100%' }}
            variant="outlined"
            {...register('email')}
            required
          />
          <TextField
            className={classes.root}
            label="Password"
            type="password"
            placeholder="******"
            sx={{ mb: 3, width: '100%' }}
            variant="outlined"
            {...register('password')}
            required
          />
          {authError && <Alert severity="error">{authError}</Alert>}
          <br />
          <Button
            variant="contained"
            sx={{
              background:
                'linear-gradient(to left, var(--clr-primary), var(--clr-primary))',
            }}
            type="submit"
          >
            Login
          </Button>
          <hr style={{ marginBlock: '20px' }} />
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
