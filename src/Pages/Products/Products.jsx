import { CircularProgress, Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import PageBanner from '../../components/PageBanner/PageBanner'
import Product from '../../components/Product/Product'
import Header from '../../Shared/Header/Header'

const Products = () => {
  // states
  const [products, setProducts] = useState([])
  // load products from server
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <>
      <Header />
      <PageBanner pageName="Our Products" />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {products.length ? (
            products.map(product => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <CircularProgress
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'var(--clr-primary)',
              }}
            />
          )}
        </Grid>
      </Container>
    </>
  )
}

export default Products
