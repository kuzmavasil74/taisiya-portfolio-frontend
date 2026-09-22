import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SpecialOffers from '../SpecialOffersPage/SpecialOffers.jsx'
import styles from './Main.module.css'
import { useTranslation } from 'react-i18next'
import FeedbackList from '../FeedbackPage/FeedbackList'
import { FaCalendarCheck } from 'react-icons/fa'

function Main() {
  const { t } = useTranslation()
  // Реальні фото з нашого салону (Instagram @glossy.bytais та галерея робіт)
  // замість попередніх стокових фото чужих закладів.
  const images = [
    { src: '/images/gallery/haircut-after.jpg' },
    { src: '/images/gallery/haircut-before.jpg' },
    { src: '/images/gallery/male-haircut_5.jpg' },
    { src: '/images/gallery/Hair-Care_3.jpg' },
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
    <>
      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className={styles.slideWrapper}>
              <img
                className={styles.sliderImg}
                src={image.src}
                alt={`Taisiya Style ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
        <div className={styles.sliderCaption}>
          <h2 className={styles.greeting}>{t('main.greeting')}</h2>
          {/* <a href="/services" className={styles.bookButton}>
            {t('main.services')}
          </a> */}
          <a href="/booking" className={styles.bookButton}>
            <FaCalendarCheck />
            {t('services.booking.button')}
          </a>
        </div>
      </div>
      <SpecialOffers />
      {/* <FeedbackList /> */}
    </>
  )
}

export default Main
