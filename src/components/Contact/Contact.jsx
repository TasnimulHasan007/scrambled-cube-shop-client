import {
  Container,
  Grid,
  Stack,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import Snack from '../Snack/Snack'
import './Contact.css'

const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      background: 'var(--bg-light)',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--clr-primary)',
    },
    '& .MuiOutlinedInput-input': {
      color: 'var(--text-dark)',
      fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: 'var(--text-dark)',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: 'var(--clr-primary)',
    },
  },
})

const Contact = () => {
  // states
  const [snackOpen, setSnackOpen] = useState(false)
  const [severity, setSeverity] = useState('warning')
  // handle snackbar close
  const handleSnackClose = () => {
    setSnackOpen(false)
  }
  // react hook form
  const { register, handleSubmit, reset } = useForm()
  // user
  const { user } = useAuth()
  // style
  const classes = useStyles()
  //render
  return (
    <>
      <Container maxWidth="md" className="contact">
        <h1>Get in touch!</h1>
        <p>We will be glad to here from you</p>
        <Grid container sx={{ my: 4 }} spacing={2}>
          <Grid item xs={12} sm={4} className="showcase">
            <i className="fas fa-phone-alt"></i>
            <span>Phone</span>
            <p>+88 01234-567890</p>
            <p>+88 01987-654321</p>
          </Grid>
          <Grid item xs={12} sm={4} className="showcase">
            <i className="fas fa-envelope"></i>
            <span>Email</span>
            <p>contact@scrambled.com</p>
            <p>pat@scrambled.com</p>
          </Grid>
          <Grid item xs={12} sm={4} className="showcase">
            <i className="fas fa-map-marker-alt"></i>
            <span>Address</span>
            <p>Eastern Housing, Pallabi</p>
            <p>Mirpur, Dhaka 1216</p>
          </Grid>
        </Grid>
        <form>
          <Grid container sx={{ my: 4 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1.65}>
                <TextField
                  className={classes.root}
                  placeholder={user?.displayName || 'Name'}
                  {...register('name')}
                />
                <TextField
                  className={classes.root}
                  placeholder={user?.email || 'Email'}
                  {...register('email')}
                />
                <TextField
                  className={classes.root}
                  placeholder="Subject"
                  {...register('subject')}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  className={classes.root}
                  placeholder="Message"
                  {...register('message')}
                  multiline
                  rows={7}
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              sx={{ color: 'var(--text-dark)' }}
              control={
                <Checkbox
                  sx={{
                    color: 'var(--clr-primary)',
                    '&.Mui-checked': {
                      color: 'var(--clr-primary)',
                    },
                  }}
                />
              }
              label="I agree to the terms and services"
              {...register('agree')}
            />
            <Button
              color="inherit"
              variant="contained"
              sx={{
                color: '#fff',
                background:
                  'linear-gradient(to right, var(--clr-primary), var(--clr-primary))',
              }}
              type="submit"
              onClick={handleSubmit(info => {
                const data = { ...info }
                setSnackOpen(true)
                if (data.agree === true && data.message) {
                  reset()
                  setSeverity('success')
                } else {
                  setSeverity('warning')
                }
              })}
            >
              Send
            </Button>
          </Stack>
        </form>
      </Container>
      <Snack
        open={snackOpen}
        duration={3000}
        handleClose={handleSnackClose}
        severity={severity}
        message={
          severity === 'success'
            ? 'Message Sent Successfully'
            : 'Please Fill Out All the fields'
        }
      />
    </>
  )
}

export default Contact
