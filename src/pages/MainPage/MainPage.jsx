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
  // Ліцензійні стокові фото з Pexels (вільна комерційна ліцензія, атрибуція
  // не обов'язкова): широкі кадри, що добре обрізаються під слайдер.
  // Реальні роботи салону — у галереї.
  const images = [
    { src: '/images/hero/slide-1.jpg', alt: 'Haircut in a bright salon' },
    { src: '/images/hero/slide-4.jpg', alt: 'Modern hair salon interior' },
    { src: '/images/hero/slide-2.jpg', alt: 'Hair coloring in a modern salon' },
    { src: '/images/hero/slide-5.jpg', alt: 'Haircut with comb and scissors' },
    { src: '/images/hero/slide-3.jpg', alt: 'Blow-dry styling with a round brush' },
    { src: '/images/hero/slide-6.jpg', alt: 'Precision trimming with a comb' },
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
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
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
