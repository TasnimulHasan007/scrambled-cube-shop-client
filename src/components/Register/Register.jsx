import { useForm } from 'react-hook-form'
import { Button, TextField, Alert } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
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

const Register = ({ url, destination, history }) => {
  // styled
  const classes = useStyles()
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
    <form onSubmit={handleSubmit(handleRegister)} className="form">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="form__title">Register</h2>
          <TextField
            className={classes.root}
            label="Name"
            placeholder="John Doe"
            sx={{ mb: 3, width: '100%' }}
            variant="outlined"
            {...register('displayName')}
            required
          />
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
            color="primary"
            type="submit"
          >
            Register
          </Button>
          <hr style={{ marginBlock: '20px' }} />
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
