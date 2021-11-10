import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import AuthProvider from './Contexts/AuthProvider'
import Account from './Pages/Account/Account'
import Dashborad from './Pages/Dashboard/Dashborad'
import Home from './Pages/Home/Home'

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashborad />
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
