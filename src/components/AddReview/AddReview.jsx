import { TextField, Typography, Button, Rating } from '@mui/material'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@mui/styles'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
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

const AddReview = () => {
  // authentication stuff
  const { token, user } = useAuth()
  // styled
  const classes = useStyles()
  // states
  const [snackOpen, setSnackOpen] = useState(false)
  const [severity, setSeverity] = useState('success')
  const [rating, setRating] = useState(0)
  //react hook form
  const { register, handleSubmit, reset } = useForm()
  // submit handler
  const addReview = data => {
    const review = {
      ...data,
      rating,
      userName: user?.displayName,
      photoURL: user?.photoURL || '',
    }
    console.log(review)

    // post review to server
    fetch('https://vast-everglades-63169.herokuapp.com/reviews', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(review),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          setSeverity('success')
          reset()
          setRating(0)
        } else {
          setSeverity('error')
        }
        setSnackOpen(true)
      })
  }
  // handle snackbar close
  const handleSnackClose = () => {
    setSnackOpen(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(addReview)} className="form">
        <h2 className="form__title">Add a review</h2>
        <Typography variant="h6" sx={{ fontWeight: '500', fontSize: '14px' }}>
          Rating
        </Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          precision={0.5}
          onChange={(event, newRating) => {
            setRating(newRating)
          }}
        />
        <TextField
          className={classes.root}
          sx={{ my: 3, width: '100%' }}
          label="Write a review"
          multiline
          variant="outlined"
          {...register('description')}
          required
          minRows={5}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            background:
              'linear-gradient(to left, var(--clr-primary), var(--clr-primary))',
          }}
          color="primary"
        >
          Post Review
        </Button>
      </form>
      <Snack
        open={snackOpen}
        duration={4000}
        handleClose={handleSnackClose}
        severity={severity}
        message={
          severity === 'success'
            ? 'Review added successfully!'
            : 'Failed to add review!'
        }
      />
    </div>
  )
}

export default AddReview
