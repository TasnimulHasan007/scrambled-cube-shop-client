import {
  Container,
  Grid,
  Paper,
  IconButton,
  InputBase,
  Stack,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import './Footer.css'

const icon = {
  color: '#fff',
  background: 'var(--clr-primary)',
  clipPath: 'circle()',
  p: '10px',
  '&:hover': {
    background: 'var(--bg-light)',
    color: 'var(--text-dark)',
  },
}

const Footer = () => {
  return (
    <footer className="footer">
      <Grid container>
        <Grid item xs={12} sm={6} className="newsletter">
          <Container maxWidth="sm">
            <div className="logo">
              <img src={logo} alt="" />
              Scrambled
            </div>
            <p>Subscribe and stay fully connected with us.</p>
            <Stack
              spacing={2}
              direction="row"
              sx={{
                mt: 1.5,
                mb: 6,
              }}
            >
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: 400,
                  background: 'var(--bg-light)',
                }}
              >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <i className="fas fa-envelope"></i>
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Enter your email"
                />
              </Paper>
              <Button
                variant="contained"
                sx={{
                  color: '#fff',
                  background:
                    'linear-gradient(to right, var(--clr-primary), var(--clr-primary))',
                }}
              >
                Subscribe
              </Button>
            </Stack>
            <p>&copy; 2021. All rights reserved.</p>
            <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
              <IconButton sx={icon}>
                <i className="fab fa-facebook-f"></i>
              </IconButton>
              <IconButton aria-label="twitter" sx={icon}>
                <i className="fab fa-twitter"></i>
              </IconButton>
              <IconButton aria-label="instagram" sx={icon}>
                <i className="fab fa-instagram"></i>
              </IconButton>
              <IconButton aria-label="youtube" sx={icon}>
                <i className="fab fa-youtube"></i>
              </IconButton>
            </Stack>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6} className="links">
          <Container
            maxWidth="sm"
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <Stack spacing={1}>
              <h4>About</h4>
              <Link to="/">About US</Link>
              <Link to="/">Contact</Link>
              <Link to="/products">Products</Link>
              <Link to="/">Services</Link>
            </Stack>
            <Stack spacing={1}>
              <h4>Quick Links</h4>
              <Link to="/">Team</Link>
              <Link to="/">Pricing</Link>
              <Link to="/">Testimonials</Link>
              <Link to="/">FAQs</Link>
            </Stack>
            <Stack spacing={1}>
              <h4>Blog</h4>
              <Link to="/">Business</Link>
              <Link to="/">Marketing</Link>
              <Link to="/">Single</Link>
              <Link to="/">Sponsor</Link>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
