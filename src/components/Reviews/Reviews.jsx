import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import './Reviews.css'
import { Rating } from '@mui/material'
import Loader from '../../Shared/Loader/Loader'

import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from 'swiper'
SwiperCore.use([EffectCoverflow, Pagination, Autoplay])

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  // load reviews from database
  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
  }, [])
  return (
    <div id="reviews">
      <div className="testimonials">
        <h1>What People Say About Us</h1>
        {reviews.length === 0 && <Loader />}
        <div className="swiper-container">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            autoplay={true}
            pagination={true}
            className="swiper-wrapper"
          >
            {reviews.map(review => (
              <SwiperSlide key={review._id} className="swiper-slide">
                <div className="card">
                  <div className="layer"></div>
                  <div className="content">
                    <p>{review?.description}</p>
                    <div className="imgBx">
                      <Avatar
                        style={{
                          margin: '10px auto',
                          border: '4px solid #fff',
                          width: '80px',
                          height: '80px',
                          fontSize: '40px',
                        }}
                      >
                        {review.photoURL ? (
                          <img
                            src={review.photoURL}
                            alt=""
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <>{review.userName.slice(0, 1)}</>
                        )}
                      </Avatar>
                      <Rating
                        color="inherit"
                        sx={{ color: '#fff' }}
                        name="read-only"
                        value={review?.rating}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <div className="details">
                      <h2>{review?.userName}</h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Reviews
