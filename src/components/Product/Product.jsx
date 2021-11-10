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

const Product = ({ product: { name, description, price, img } }) => {
  console.log(name, description, price, img)
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea>
          <CardMedia component="img" height="240" image={img} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            {/* <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={{
                __html: description.replace(/\\n/g, '<br /></br />'),
              }}
            ></Typography> */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ hyphens: 'auto' }}
            >
              {description.slice(0, 100)}...
            </Typography>
            <Typography
              variant="body1"
              sx={{ pt: 2, color: 'var(--clr-primary)' }}
            >
              ৳{price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button size="small">Learn More</Button>
          <Button size="small">Add To Cart</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Product
