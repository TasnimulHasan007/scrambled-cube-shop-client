import { Alert, Snackbar } from '@mui/material'

const Snack = ({ open, duration, handleClose, severity, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%', alignItems: 'center' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Snack
