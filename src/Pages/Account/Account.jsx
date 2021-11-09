import { Container } from '@mui/material'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import Login from '../../components/Login/Login'
import PageBanner from '../../components/PageBanner/PageBanner'
import Register from '../../components/Register/Register'
import Header from '../../Shared/Header/Header'
import './Account.css'

const Account = () => {
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
              <Login url={url} />
            </Route>
            <Route path={`${path}/login`}>
              <Login url={url} />
            </Route>
            <Route path={`${path}/register`}>
              <Register url={url} />
            </Route>
          </Switch>
        </div>
      </Container>
    </div>
  )
}

export default Account