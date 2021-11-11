import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import AuthProvider from './Contexts/AuthProvider'
import Account from './Pages/Account/Account'
import Dashborad from './Pages/Dashboard/Dashborad'
import Home from './Pages/Home/Home'
import Products from './Pages/Products/Products'
import Purchase from './Pages/Purchase/Purchase'
import { ConfirmProvider } from 'material-ui-confirm'

function App() {
  return (
    <>
      <AuthProvider>
        <ConfirmProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route path="/account">
                <Account />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <PrivateRoute path="/purchase/:productId">
                <Purchase />
              </PrivateRoute>
              <PrivateRoute path="/dashboard">
                <Dashborad />
              </PrivateRoute>
            </Switch>
          </Router>
        </ConfirmProvider>
      </AuthProvider>
    </>
  )
}

export default App
