import { CircularProgress } from '@mui/material'
import { Route, Redirect } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const AdminRoute = ({ children, ...rest }) => {
  const { user, admin, isLoading } = useAuth()
  if (isLoading) {
    return (
      <CircularProgress
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'var(--clr-primary)',
        }}
      />
    )
  }
  return (
    <Route
      {...rest}
      render={() =>
        user.email && admin ? (
          children
        ) : (
          <Redirect to={{ pathname: '/dashboard' }} />
        )
      }
    />
  )
}

export default AdminRoute
