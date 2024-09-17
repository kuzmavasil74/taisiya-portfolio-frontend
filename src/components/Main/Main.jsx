import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Main.module.css'

function Main() {
  const images = [
    '/images/slideer_img_1.jpg',
    '/images/slideer_img_5.jpg',
    '/images/slideer_img_2.jpg',
    '/images/slideer_img_6.jpg',
    '/images/slideer_img_7.jpg',
    '/images/slideer_img_8.jpg',
    '/images/slideer_img_9.jpg',
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              className={styles.sliderImg}
              src={image}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Slider>
      <div className={styles.sliderCaption}>
        <h2 className={styles.greeting}>
          Welcome to TaisiyaStyle - where every haircut becomes a masterpiece!
        </h2>
        <a href="/services" className={styles.ctaButton}>
          Explore Our Services
        </a>
      </div>
    </div>
  )
}

export default Main
