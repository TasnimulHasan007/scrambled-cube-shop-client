import Featured from '../../components/Featured/Featured'
import MainBanner from '../../components/MainBanner/MainBanner'
import Reviews from '../../components/Reviews/Reviews'
import Header from '../../Shared/Header/Header'

const Home = () => {
  return (
    <>
      <Header />
      <MainBanner />
      <Featured />
      <Reviews />
    </>
  )
}

export default Home
