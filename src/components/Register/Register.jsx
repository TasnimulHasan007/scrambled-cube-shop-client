import { useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

const Register = ({ url }) => {
  // react hook form
  const { register, handleSubmit, reset } = useForm()
  // handle register
  const handleRegister = data => {
    console.log(data)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(handleRegister)}>
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
      <br />
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
      <br />
      <br />
      <hr />
      <br />
      <Link to={`${url}/login`}>Already Registered?</Link>
    </form>
  )
}

export default Register
