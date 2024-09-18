import React from 'react'
import styles from './AboutPage.module.css'

function AboutPage() {
  return (
    <section className={styles.about}>
      <div className={styles.photoSection}>
        <img
          src="/images/photoSection.jpg"
          alt="Taisiya - professional hairdresser"
          className={styles.photo}
        />
      </div>
      <div className={styles.infoSection}>
        <h2 className={styles.heading}>About Taisiya</h2>
        <p className={styles.biography}>
          I am a hairdresser with over 3 years of experience, helping people
          express themselves through their style. My passion is to help clients
          feel confident and stylish.
        </p>
        <p className={styles.philosophy}>
          <strong>My philosophy:</strong> every client deserves to feel
          confident and amazing, whether it’s a fresh haircut or maintaining
          their favorite style.
        </p>
        <div className={styles.certificates}>
          <h3>Certificates and Achievements</h3>
          <ul>
            <li>Certificate from an International Academy of Style (2022)</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
