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
    id: 5,
    category: 'Male Haircuts',
    beforeImage: '/images/gallery/male-haircut_6.jpg',
    afterImage: '/images/gallery/male-haircut_6.jpg',
    description: 'Male Haircuts',
  },
  {
    id: 6,
    category: 'Male Haircuts',
    beforeImage: '/images/gallery/male-haircut_1.jpg',
    afterImage: '/images/gallery/male-haircut_1.jpg',
    description: 'Male Haircuts',
  },
  {
    id: 7,
    category: 'Male Haircuts',
    beforeImage: '/images/gallery/male-haircut_2.jpg',
    afterImage: '/images/gallery/male-haircut_2.jpg',
    description: 'Male Haircuts',
  },
  {
    id: 8,
    category: 'Male Haircuts',
    beforeImage: '/images/gallery/male-haircut_3.jpg',
    afterImage: '/images/gallery/male-haircut_3.jpg',
    description: 'Male Haircuts',
  },
  {
    id: 9,
    category: 'Male Haircuts',
    beforeImage: '/images/gallery/male-haircut_4.jpg',
    afterImage: '/images/gallery/male-haircut_4.jpg',
    description: 'Male Haircuts',
  },
  {
    id: 10,
    category: 'Male Haircuts',
    beforeImage: '/images/gallery/male-haircut_5.jpg',
    afterImage: '/images/gallery/male-haircut_5.jpg',
    description: 'Male Haircuts',
  },
  {
    id: 11,
    category: 'Cold Botox',
    beforeImage: '/images/gallery/Hair-Care_1.jpg',
    afterImage: '/images/gallery/Hair-Care_1.jpg',
    description: 'Cold Botox',
  },
  {
    id: 12,
    category: 'Cold Botox',
    beforeImage: '/images/gallery/Hair-Care_2.jpg',
    afterImage: '/images/gallery/Hair-Care_2.jpg',
    description: 'Cold Botox',
  },
  {
    id: 13,
    category: 'Cold Botox',
    beforeImage: '/images/gallery/Hair-Care_3.jpg',
    afterImage: '/images/gallery/Hair-Care_3.jpg',
    description: 'Cold Botox',
  },
  {
    id: 14,
    category: 'Cold Botox',
    beforeImage: '/images/gallery/Hair-Care_4.jpg',
    afterImage: '/images/gallery/Hair-Care_4.jpg',
    description: 'Cold Botox',
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
            selectedCategory === 'Male Haircuts' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Male Haircuts')}
        >
          {t('gallery.maleHaircuts')}
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Keratin' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Keratin')}
        >
          {t('gallery.keratin')}
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'HotBotox' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('HotBotox')}
        >
          {t('gallery.hotBotox')}
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Cold Restoration' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Cold Restoration')}
        >
          {t('gallery.coldRestoration')}
        </button>

        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Cold Botox' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Cold Botox')}
        >
          {t('gallery.coldBotox')}
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Hair Polishing' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Hair Polishing')}
        >
          {t('gallery.polishing')}
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
        <a href="/booking" className={styles.bookButton}>
          {t('gallery.bookNow')}
        </a>
      </div>
    </section>
  )
}

export default GalleryPage
