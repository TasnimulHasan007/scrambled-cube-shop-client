import React from 'react'
import ReactDOM from 'react-dom'
import { ConfirmProvider } from 'material-ui-confirm'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ConfirmProvider>
      <App />
    </ConfirmProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
