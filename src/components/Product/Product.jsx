import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  const { name, description, price, img } = product
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <Link to={`/purchase/${product._id}`}>
          <CardActionArea>
            <CardMedia component="img" height="240" image={img} />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ fontSize: '18px', fontWeight: 'bold' }}
              >
                {name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ hyphens: 'auto' }}
              >
                {description.slice(0, 100)}...
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ color: 'var(--clr-primary)' }}>
            ৳{price}
          </Typography>
          <Link to={`/purchase/${product._id}`}>
            <Button size="small">Learn More</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Product
