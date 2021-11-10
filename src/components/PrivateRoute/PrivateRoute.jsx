import { CircularProgress } from '@mui/material'
import { Route, Redirect } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth()
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
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/account',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
