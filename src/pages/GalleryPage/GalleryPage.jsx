import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './GalleryPage.module.css'

const galleryItems = [
  {
    id: 1,
    category: 'Haircuts',
    beforeImage: '/images/gallery/haircut-before.jpg',
    afterImage: '/images/gallery/haircut-after.jpg',
    description: 'haircuts',
  },
  {
    id: 2,
    category: 'Coloring',
    beforeImage: '/images/gallery/coloring-before.jpg',
    afterImage: '/images/gallery/coloring-after.jpg',
    description: 'coloring',
  },
  {
    id: 3,
    category: 'Styling',
    beforeImage: '/images/gallery/styling-before.jpg',
    afterImage: '/images/gallery/styling-after.jpg',
    description: 'styling',
  },
  {
    id: 4,
    category: 'Hair Care',
    beforeImage: '/images/gallery/haircare-before.jpg',
    afterImage: '/images/gallery/haircare-after.jpg',
    description: 'hairCare',
  },
]

function GalleryPage() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <section className={styles.gallery}>
      <h2 className={styles.heading}>{t('gallery.heading')}</h2>
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'All' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('All')}
        >
          {t('gallery.all')}
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Haircuts' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Haircuts')}
        >
          {t('gallery.haircuts')}
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Coloring' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Coloring')}
        >
          {t('gallery.coloring')}
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Styling' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Styling')}
        >
          {t('gallery.styling')}
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Hair Care' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Hair Care')}
        >
          {t('gallery.hairCare')}
        </button>
      </div>

      <div className={styles.galleryGrid}>
        {filteredItems.map((item) => (
          <div key={item.id} className={styles.galleryItem}>
            <div className={styles.imageContainer}>
              <img
                src={item.beforeImage}
                alt={`Before - ${item.category}`}
                className={styles.beforeImage}
              />
              <img
                src={item.afterImage}
                alt={`After - ${item.category}`}
                className={styles.afterImage}
              />
            </div>
            <p className={styles.description}>
              {t(`galleryItems.${item.description}`)}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.booking}>
        <h3 className={styles.subheading}>{t('gallery.bookNow')}</h3>
        <a href="#book" className={styles.bookButton}>
          {t('gallery.bookNow')}
        </a>
      </div>
    </section>
  )
}

export default GalleryPage
