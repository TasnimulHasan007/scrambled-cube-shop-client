import { TextField, Button, InputAdornment } from '@mui/material'
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

const AddProduct = () => {
  // authentication stuff
  const { token } = useAuth()
  // styled
  const classes = useStyles()
  // states
  const [snackOpen, setSnackOpen] = useState(false)
  const [severity, setSeverity] = useState('success')
  //react hook form
  const { register, handleSubmit, reset } = useForm()
  // handle add product
  const addProduct = product => {
    // post product to server
    fetch('https://vast-everglades-63169.herokuapp.com/products', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          setSnackOpen(true)
          setSeverity('success')
          reset()
        } else {
          setSnackOpen(true)
          setSeverity('error')
        }
      })
  }
  // handle snackbar close
  const handleSnackClose = () => {
    setSnackOpen(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(addProduct)} className="form">
        <h2 className="form__title">Add a product</h2>
        <TextField
          className={classes.root}
          sx={{ mb: 3, width: '100%' }}
          variant="outlined"
          label="Product Name"
          {...register('name')}
          required
        />
        <TextField
          className={classes.root}
          sx={{ mb: 3, width: '100%' }}
          label="Product Description"
          multiline
          variant="outlined"
          {...register('description')}
          required
          minRows={10}
        />
        <TextField
          className={classes.root}
          sx={{ mb: 3, mr: '2.5%', width: '47.5%' }}
          variant="outlined"
          label="Product Price"
          InputProps={{
            startAdornment: <InputAdornment position="start">৳</InputAdornment>,
          }}
          type="number"
          inputProps={{ min: 0 }}
          {...register('price')}
          required
        />
        <TextField
          className={classes.root}
          sx={{ mb: 3, ml: '2.5%', width: '47.5%' }}
          variant="outlined"
          label="Image URL"
          {...register('img')}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            background:
              'linear-gradient(to left, var(--clr-primary), var(--clr-primary))',
          }}
        >
          Add
        </Button>
      </form>
      <Snack
        open={snackOpen}
        duration={4000}
        handleClose={handleSnackClose}
        severity={severity}
        message={
          severity === 'success'
            ? 'Product added successfully!'
            : 'Failed to add product!'
        }
      />
    </div>
  )
}

export default AddProduct
