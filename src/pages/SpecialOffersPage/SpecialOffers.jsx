import React from 'react'
import styles from './SpecialOffers.module.css'
import { useTranslation } from 'react-i18next'

const SpecialOffers = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.specialOffers}>
      <h2 className={styles.specialOffersTitle}>{t('specialOffers.title')}</h2>
      <div className={styles.offersContainer}>
        <div className={styles.offerItem}>
          <h3>{t('specialOffers.offer1.title')}</h3>
          <p>{t('specialOffers.offer1.description')}</p>
        </div>
        <div className={styles.offerItem}>
          <h3>{t('specialOffers.offer2.title')}</h3>
          <p>{t('specialOffers.offer2.description')}</p>
        </div>
        <div className={styles.offerItem}>
          <h3>{t('specialOffers.offer3.title')}</h3>
          <p>{t('specialOffers.offer3.description')}</p>
        </div>
      </div>
    </div>
  )
}

export default SpecialOffers
