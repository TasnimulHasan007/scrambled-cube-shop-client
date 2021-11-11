import { Container, Typography, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import Product from '../Product/Product'
import Loader from '../../Shared/Loader/Loader'
import './Featured.css'

const Featured = () => {
  // states
  const [products, setProducts] = useState([])
  // load products from server
  useEffect(() => {
    fetch(`http://localhost:5000/products?page=0&&size=6`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
      })
  }, [])
  return (
    <div className="featured">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: '700' }}>
          Recommended For You
        </Typography>
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
