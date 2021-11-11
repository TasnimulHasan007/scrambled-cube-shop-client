import { Button, ButtonGroup, Container, Grid } from '@mui/material'
import './MainBanner.css'

const MainBanner = () => {
  return (
    <Container maxWidth="xl">
      <div className="banner">
        <Grid container>
          <Grid item md={6} xs={12} className="content">
            <h1>
              Don't miss the amazing <br /> discount deals
            </h1>
            <p>Get 50% off on you first order</p>
            <div>
              <ButtonGroup
                className="button-group"
                variant="text"
                color="inherit"
                sx={{ background: 'var(--bg-light)' }}
              >
                <Button>
                  <input placeholder="Your Email Here..." />
                </Button>
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
              </ButtonGroup>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default MainBanner
