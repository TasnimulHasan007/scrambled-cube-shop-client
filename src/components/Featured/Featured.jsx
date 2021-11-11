import { Container, Typography, Grid, Stack, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import Product from '../Product/Product'
import Loader from '../../Shared/Loader/Loader'
import './Featured.css'
import { Link } from 'react-router-dom'

const Featured = () => {
  // states
  const [products, setProducts] = useState([])
  // load products from server
  useEffect(() => {
    fetch(`https://vast-everglades-63169.herokuapp.com/products?page=0&&size=6`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
      })
  }, [])
  return (
    <div className="featured">
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 6 }}
        >
          <Typography variant="h4" sx={{ fontWeight: '700' }}>
            Recommended For You
          </Typography>
          <Link to="/products">
            <Button
              variant="contained"
              color="inherit"
              sx={{
                color: '#fff',
                background:
                  'linear-gradient(to right, var(--clr-primary), var(--clr-primary))',
              }}
            >
              View All
            </Button>
          </Link>
        </Stack>
        <Grid container spacing={3} columns={{ xs: 12, sm: 12, md: 12, lg: 9 }}>
          {products.length ? (
            products.map(product => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <Loader />
          )}
        </Grid>
      </Container>
    </div>
  )
}

export default Featured
