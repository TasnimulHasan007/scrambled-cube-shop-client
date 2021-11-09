import { useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

const Login = ({ url }) => {
  // react hook form
  const { register, handleSubmit, reset } = useForm()
  // handle register
  const handleLogin = data => {
    console.log(data)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
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
        Login
      </Button>
      <br />
      <br />
      <hr />
      <br />
      <Link to={`${url}/register`}>Create an account</Link>
    </form>
  )
}

export default Login
