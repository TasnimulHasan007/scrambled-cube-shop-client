import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  useRouteMatch,
  Switch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom'
import Login from '../../components/Login/Login'
import PageBanner from '../../components/PageBanner/PageBanner'
import Register from '../../components/Register/Register'
import Footer from '../../Shared/Footer/Footer'
import Header from '../../Shared/Header/Header'
import './Account.css'

const Account = () => {
  // states
  const [destination, setDestination] = useState('/')
  // history & location
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    const from = location.state?.from || '/'
    setDestination(from)
  }, [])
  // useRouteMatch for nested routes
  const { path, url } = useRouteMatch()
  return (
    <div id="account">
      <Header />
      <PageBanner pageName={'Account'} />
      <Container maxWidth="xl">
        <div className="form-container">
          <Switch>
            <Route exact path={path}>
              <Login url={url} history={history} destination={destination} />
            </Route>
            <Route path={`${path}/login`}>
              <Login url={url} history={history} destination={destination} />
            </Route>
            <Route path={`${path}/register`}>
              <Register url={url} history={history} destination={destination} />
            </Route>
          </Switch>
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default Account
