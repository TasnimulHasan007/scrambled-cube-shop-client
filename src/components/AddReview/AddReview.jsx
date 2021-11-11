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
      photoURL: user?.photoURL,
    }
    console.log(review)

    // post review to server
    fetch('http://localhost:5000/reviews', {
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
      <Typography variant="h5">Add a review</Typography>
      <form onSubmit={handleSubmit(addReview)} className="form">
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
        <Button type="submit" variant="contained" color="primary">
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
