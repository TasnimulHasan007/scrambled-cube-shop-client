import {
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../../Shared/Header/Header'
import OrderModal from '../../components/OrderModal/OrderModal'
import Footer from '../../Shared/Footer/Footer'

const Purchase = () => {
  const { productId } = useParams()
  // states
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [openOrderModal, setOpenOrderModal] = useState(false)
  // modal
  const handleOpenOrderModal = () => setOpenOrderModal(true)
  const handleCloseOrderModal = () => setOpenOrderModal(false)
  // load product
  useEffect(() => {
    fetch(`http://localhost:5000/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [productId])
  return (
    <>
      <OrderModal
        openModal={openOrderModal}
        handleCloseModal={handleCloseOrderModal}
        product={product}
        quantity={quantity}
      />
      <Header />
      <Container
        maxWidth="xl"
        sx={{ py: 6, position: 'relative', minHeight: '400px' }}
      >
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          {product.name ? (
            <>
              <Grid item xs={12} md={6}>
                <img src={product.img} alt={product.name} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4">{product.name}</Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ pt: 2, pb: 4, textAlign: 'justify', hyphens: 'auto' }}
                  dangerouslySetInnerHTML={{
                    __html: product.description?.replace(/\\n/g, '<br />'),
                  }}
                ></Typography>
                <Typography variant="body1" sx={{ pt: 2 }}>
                  Price
                </Typography>
                <Typography variant="h6" sx={{ color: 'var(--clr-primary)' }}>
                  ৳{product.price * quantity}
                </Typography>
                <Typography variant="body1" sx={{ pt: 2 }}>
                  Quantity
                </Typography>
                <ButtonGroup
                  disableElevation
                  variant="outlined"
                  color="inherit"
                  sx={{
                    display: 'block',
                    pt: 0.5,
                    color: 'var(--clr-primary)',
                  }}
                >
                  <Button
                    onClick={() => {
                      if (quantity > 1) setQuantity(quantity - 1)
                    }}
                  >
                    -
                  </Button>
                  <Button>{quantity}</Button>
                  <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                </ButtonGroup>
                <Button
                  onClick={handleOpenOrderModal}
                  variant="contained"
                  sx={{
                    mt: 4,
                    background:
                      'linear-gradient(to left, var(--clr-primary), var(--clr-primary))',
                  }}
                >
                  Order Now
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <CircularProgress
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'var(--clr-primary)',
                }}
              />
            </>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default Purchase
