import { Switch, Route } from 'react-router-dom'
import Account from './Pages/Account/Account'
import Home from './Pages/Home/Home'

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account" component={Account} />
      </Switch>
    </>
  )
}

export default App
