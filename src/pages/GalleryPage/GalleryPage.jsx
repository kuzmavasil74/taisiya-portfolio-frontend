import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './GalleryPage.module.css'

const galleryItems = [
  {
    id: 1,
    category: 'womenHaircuts',
    beforeImage: '/images/gallery/haircut-before.jpg',
    afterImage: '/images/gallery/haircut-after.jpg',
    description: 'womenHaircuts',
  },
  {
    id: 2,
    category: 'menHaircuts',
    beforeImage: '/images/gallery/male-haircut_1.jpg',
    afterImage: '/images/gallery/male-haircut_1.jpg',
    description: 'menHaircuts',
  },
  {
    id: 3,
    category: 'rootColoring',
    beforeImage: '/images/gallery/root-coloring_1.jpg',
    afterImage: '/images/gallery/root-coloring_1.jpg',
    description: 'rootColoring',
  },
  {
    id: 4,
    category: 'fullColoring',
    beforeImage: '/images/gallery/full-coloring_1.jpg',
    afterImage: '/images/gallery/full-coloring_1.jpg',
    description: 'fullColoring',
  },
  {
    id: 5,
    category: 'toning',
    beforeImage: '/images/gallery/toning_1.jpg',
    afterImage: '/images/gallery/toning_1.jpg',
    description: 'toning',
  },
  {
    id: 6,
    category: 'balayage',
    beforeImage: '/images/gallery/balayage_1.jpg',
    afterImage: '/images/gallery/balayage_1.jpg',
    description: 'balayage',
  },
  {
    id: 7,
    category: 'polishing',
    beforeImage: '/images/gallery/polishing_1.jpg',
    afterImage: '/images/gallery/polishing_1.jpg',
    description: 'polishing',
  },
]

const categories = [
  'All',
  'womenHaircuts',
  'menHaircuts',
  'rootColoring',
  'fullColoring',
  'toning',
  'balayage',
  'polishing',
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
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterButton} ${
              selectedCategory === cat ? styles.active : ''
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {t(`gallery.${cat}`)}
          </button>
        ))}
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
        <a href="/booking" className={styles.bookButton}>
          {t('gallery.bookNow')}
        </a>
      </div>
    </section>
  )
}

export default GalleryPage
