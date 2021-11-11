import {
  CircularProgress,
  Container,
  Grid,
  TextField,
  Pagination,
  Box,
} from '@mui/material'
import { useEffect, useState } from 'react'
import PageBanner from '../../components/PageBanner/PageBanner'
import Product from '../../components/Product/Product'
import Header from '../../Shared/Header/Header'

const Products = () => {
  // states
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [displayProducts, setDisplayProducts] = useState([])
  const size = 8
  // load products from server
  useEffect(() => {
    fetch(`http://localhost:5000/products?page=${page}&&size=${size}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setDisplayProducts(data.products)
        const count = data.count
        const pageNumber = Math.ceil(count / size)
        setPageCount(pageNumber)
      })
  }, [page])
  // pagination
  const handleChange = (event, value) => {
    setPage(value - 1)
    setProducts([])
    setDisplayProducts([])
  }
  // search
  const handleSearch = event => {
    const searchText = event.target.value

    const matchedProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    )

    setDisplayProducts(matchedProducts)
  }

  return (
    <>
      <Header />
      <PageBanner pageName="Our Products" />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            onChange={handleSearch}
            placeholder="Search Product"
            sx={{ width: 'min(450px, 100%)' }}
          />
        </Box>
        <Grid container spacing={3} sx={{ my: 4, minHeight: '400px' }}>
          {displayProducts.length ? (
            displayProducts.map(product => (
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
        {products.length === 0 || (
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            count={pageCount}
            page={page + 1}
            onChange={handleChange}
          />
        )}
      </Container>
    </>
  )
}

export default Products
