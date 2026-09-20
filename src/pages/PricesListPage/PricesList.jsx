import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PricesList.module.css'
import useServices from '../../utills/useServices.js'

const PricesList = () => {
  const { t } = useTranslation()
  const { services } = useServices()

  return (
    <div className={styles.pricesList}>
      <h2 className={styles.pricesListTitle}>{t('pricesList.title')}</h2>
      <table className={styles.pricesTable}>
        <thead>
          <tr>
            <th>{t('pricesList.service')}</th>
            <th>{t('pricesList.price')}</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.key}>
              <td>{t(`bookingForm.${service.key}`)}</td>
              <td>{service.price} CZK</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PricesList
