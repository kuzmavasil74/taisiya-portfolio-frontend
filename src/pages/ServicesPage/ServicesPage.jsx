import React from 'react'
import styles from './ServicesPage.module.css' // Ensure this file exists

function ServicesPage() {
  return (
    <section className={styles.services}>
      <div className={styles.serviceCategory}>
        <h2 className={styles.heading}>Our Services</h2>

        <div className={styles.category}>
          <h3 className={styles.subheading}>Haircuts</h3>
          <p className={styles.description}>
            Various haircut styles for any hair type, from classic to modern. We
            help you find the perfect style that suits you.
          </p>
          <p className={styles.features}>
            <strong>Features:</strong> Precise lines, graduated cuts, textured
            ends.
          </p>
          <p className={styles.price}>
            Prices start from 300 CZK. Depends on the length and complexity of
            the haircut. Contact us for a personalized quote.
          </p>
        </div>

        <div className={styles.category}>
          <h3 className={styles.subheading}>Hair Coloring</h3>
          <p className={styles.description}>
            From bold highlights to subtle balayage, we offer a range of hair
            coloring services that will leave your hair looking fresh and
            vibrant.
          </p>
          <p className={styles.features}>
            <strong>Features:</strong> Deep shades, ombre, color highlights.
          </p>
          <p className={styles.price}>
            Prices vary depending on the coloring technique and hair length.
            Contact us for a detailed consultation.
          </p>
        </div>

        <div className={styles.category}>
          <h3 className={styles.subheading}>Styling</h3>
          <p className={styles.description}>
            Various styling options for any event or mood. From everyday looks
            to special occasion styles that fit any situation.
          </p>
          <p className={styles.features}>
            <strong>Features:</strong> Loose waves, sleek straight styles,
            evening hairstyles.
          </p>
          <p className={styles.price}>
            Standard styling starts from 500 CZK. Special or evening styles may
            vary in price.
          </p>
        </div>

        <div className={styles.category}>
          <h3 className={styles.subheading}>Hair Care</h3>
          <p className={styles.description}>
            Comprehensive treatments for hair restoration and strengthening,
            ensuring your hair looks healthy and shiny.
          </p>
          <p className={styles.features}>
            <strong>Features:</strong> Deep conditioning, restorative masks,
            therapeutic treatments.
          </p>
          <p className={styles.price}>
            Prices start from 700 CZK. The cost may vary depending on the
            products and treatments used.
          </p>
        </div>

        <div className={styles.specialOffers}>
          <h3 className={styles.subheading}>Special Offers</h3>
          <p>
            <strong>Promotions:</strong> 20% discount on any service for
            first-time clients. Special loyalty programs for regular clients.
          </p>
        </div>

        <div className={styles.booking}>
          <h3 className={styles.subheading}>Book Your Appointment</h3>
          <a href="#book" className={styles.bookButton}>
            Book Your Appointment Today!
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesPage
