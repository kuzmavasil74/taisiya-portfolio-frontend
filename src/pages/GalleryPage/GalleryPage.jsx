import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './GalleryPage.module.css'

// Реальні фото робіт. Для жіночої стрижки є справжня пара до/після — решта
// показані як окремі фото результату (окремих "до" знімків для них немає).
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
    image: '/images/gallery/male-haircut_1.jpg',
    description: 'menHaircuts',
  },
  {
    id: 3,
    category: 'menHaircuts',
    image: '/images/gallery/male-haircut_2.jpg',
    description: 'menHaircuts',
  },
  {
    id: 4,
    category: 'menHaircuts',
    image: '/images/gallery/male-haircut_3.jpg',
    description: 'menHaircuts',
  },
  {
    id: 5,
    category: 'menHaircuts',
    image: '/images/gallery/male-haircut_4.jpg',
    description: 'menHaircuts',
  },
  {
    id: 6,
    category: 'menHaircuts',
    image: '/images/gallery/male-haircut_5.jpg',
    description: 'menHaircuts',
  },
  {
    id: 7,
    category: 'menHaircuts',
    image: '/images/gallery/male-haircut_6.jpg',
    description: 'menHaircuts',
  },
  {
    id: 8,
    category: 'toning',
    image: '/images/gallery/Hair-Care_1.jpg',
    description: 'toning',
  },
  {
    id: 9,
    category: 'rootColoring',
    image: '/images/gallery/Hair-Care_2.jpg',
    description: 'rootColoring',
  },
  {
    id: 10,
    category: 'balayage',
    image: '/images/gallery/Hair-Care_3.jpg',
    description: 'balayage',
  },
  {
    id: 11,
    category: 'polishing',
    image: '/images/gallery/Hair-Care_4.jpg',
    description: 'polishing',
  },
]

const categories = [
  'All',
  'womenHaircuts',
  'menHaircuts',
  'rootColoring',
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
              {item.beforeImage ? (
                <>
                  <img
                    src={item.beforeImage}
                    alt={`Before - ${item.category}`}
                    className={styles.beforeImage}
                    loading="lazy"
                  />
                  <img
                    src={item.afterImage}
                    alt={`After - ${item.category}`}
                    className={styles.afterImage}
                    loading="lazy"
                  />
                </>
              ) : (
                <img
                  src={item.image}
                  alt={item.category}
                  className={styles.singleImage}
                  loading="lazy"
                />
              )}
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
