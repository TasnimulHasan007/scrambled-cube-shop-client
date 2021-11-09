import { Container } from '@mui/material'
import './PageBanner.css'

const PageBanner = ({ pageName }) => {
  return (
    <div id="page_banner">
      <Container maxWidth="xl">
        <h1>{pageName}</h1>
      </Container>
    </div>
  )
}

export default PageBanner
