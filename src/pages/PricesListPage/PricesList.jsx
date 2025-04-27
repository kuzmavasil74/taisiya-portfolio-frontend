import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PricesList.module.css'

const PricesList = () => {
  const { t } = useTranslation()

  const priceItems = [
    { key: 'haircuts', price: 'priceHaircut' },
    { key: 'maleHaircuts', price: 'priceHaircut' },
    { key: 'keratin', price: 'priceKeratin' },
    { key: 'hotBotox', price: 'priceKeratin' },
    { key: 'coldRestoration', price: 'priceColdRestoration' },
    { key: 'coldBotox', price: 'priceColdBotox' },
    { key: 'polishing', price: 'pricePolishing' },
    { key: 'splitEndsCut', price: 'priceSplitEndsCut' },
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
