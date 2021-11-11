import Contact from '../../components/Contact/Contact'
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
      <Contact />
    </>
  )
}

export default Home
