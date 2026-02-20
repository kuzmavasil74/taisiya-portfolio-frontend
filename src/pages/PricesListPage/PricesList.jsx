import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PricesList.module.css'

const PricesList = () => {
  const { t } = useTranslation()

  const priceItems = [
    { key: 'womenHaircuts', price: 'priceWomenHaircut' },
    { key: 'menHaircuts', price: 'priceMenHaircut' },
    { key: 'rootColoring', price: 'priceRootColoring' },
    { key: 'fullColoring', price: 'priceFullColoring' },
    { key: 'toning', price: 'priceToning' },
    { key: 'balayage', price: 'priceBalayage' },
    { key: 'polishing', price: 'pricePolishing' },
  ]

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
          {priceItems.map((item, index) => (
            <tr key={index}>
              <td>{t(`pricesList.${item.key}`)}</td>
              <td>{t(`pricesList.${item.price}`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PricesList
