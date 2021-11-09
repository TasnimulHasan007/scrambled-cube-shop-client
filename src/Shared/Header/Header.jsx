import React from 'react'
import { AppBar, Container, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.svg'
import './Header.css'

const Header = () => {
  return (
    <AppBar position="sticky" id="header">
      <Container maxWidth="xl">
        <Toolbar>
          <span className="logo">
            <img src={logo} alt="Scrambled" />
            <h2>Scrambled</h2>
          </span>
          <NavLink to="/" className={link => (link.isActive ? 'active' : '')}>
            <span className="nav-link">Home</span>
          </NavLink>
          <NavLink
            to="/account"
            className={link => (link.isActive ? 'active' : '')}
          >
            <span className="nav-link">Account</span>
          </NavLink>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
