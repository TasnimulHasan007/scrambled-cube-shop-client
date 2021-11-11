import { CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <CircularProgress
      style={{
        zIndex: '9999',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'var(--clr-primary)',
      }}
    />
  )
}

export default Loader
