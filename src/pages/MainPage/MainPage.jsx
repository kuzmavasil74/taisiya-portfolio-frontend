import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Main.module.css'

function Main() {
  const images = [
    {
      small: '/images/slider/slideer_img_1_mob.jpg',
      medium: '/images/slider/slideer_img_1_tablet.jpg',
      large: '/images/slider/slideer_img_1_desc.jpg',
    },
    {
      small: '/images/slider/slideer_img_3_mob.jpg',
      medium: '/images/slider/slideer_img_3_tablet.jpg',
      large: '/images/slider/slideer_img_3_desc.jpg',
    },
    {
      small: '/images/slider/slideer_img_5_mob.jpg',
      medium: '/images/slider/slideer_img_5_tablet.jpg',
      large: '/images/slider/slideer_img_5_desc.jpg',
    },
    {
      small: '/images/slider/slideer_img_6_mob.jpg',
      medium: '/images/slider/slideer_img_6_tablet.jpg',
      large: '/images/slider/slideer_img_6_desc.jpg',
    },
    {
      small: '/images/slider/slideer_img_7_mob.jpg',
      medium: '/images/slider/slideer_img_7_tablet.jpg',
      large: '/images/slider/slideer_img_7_desc.jpg',
    },
    {
      small: '/images/slider/slideer_img_8_mob.jpg',
      medium: '/images/slider/slideer_img_8_tablet.jpg',
      large: '/images/slider/slideer_img_8_desc.jpg',
    },
    {
      small: '/images/slider/slideer_img_9_mob.jpg',
      medium: '/images/slider/slideer_img_9_tablet.jpg',
      large: '/images/slider/slideer_img_9_desc.jpg',
    },
    {
      small: '/images/slider/slideer_img_10_mob.jpg',
      medium: '/images/slider/slideer_img_10_tablet.jpg',
      large: '/images/slider/slideer_img_10_desc.jpg',
    },
    {
      small: '/images/slider/slideer_img_11_mob.jpg',
      medium: '/images/slider/slideer_img_11_tablet.jpg',
      large: '/images/slider/slideer_img_11_desc.jpg',
    },
    {
      small: '/images/slider/slideer_img_12_mob.jpg',
      medium: '/images/slider/slideer_img_12_tablet.jpg',
      large: '/images/slider/slideer_img_12_desc.jpg',
    },
  ]
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              className={styles.sliderImg}
              src={image.small}
              srcSet={`${image.small} 768w, ${image.medium} 1024w, ${image.large} 1440w`}
              sizes="(max-width: 768px) 768px, (max-width: 1024px) 1024px, 1440px"
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
