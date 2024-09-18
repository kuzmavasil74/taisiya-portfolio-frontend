import React, { useState } from 'react'
import styles from './GalleryPage.module.css'

const galleryItems = [
  {
    id: 1,
    category: 'Haircuts',
    beforeImage: '/images/haircut-before.jpg',
    afterImage: '/images/haircut-after.jpg',
    description: 'Classic haircut with modern touch.',
  },
  {
    id: 2,
    category: 'Coloring',
    beforeImage: '/images/coloring-before.jpg',
    afterImage: '/images/coloring-after.jpg',
    description: 'Bold balayage for a vibrant look.',
  },
  {
    id: 3,
    category: 'Styling',
    beforeImage: '/images/styling-before.jpg',
    afterImage: '/images/styling-after.jpg',
    description: 'Classic hair styling with a touch of modernity.',
  },
  {
    id: 4,
    category: 'Hair Care',
    beforeImage: '/images/haircare-before.jpg',
    afterImage: '/images/haircare-after.jpg',
    description: 'Natural hair care with a healthy glow.',
  },
]

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)
  return (
    <section className={styles.gallery}>
      <h2 className={styles.heading}>Gallery</h2>
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'All' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Haircuts' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Haircuts')}
        >
          Haircuts
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Coloring' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Coloring')}
        >
          Coloring
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Styling' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Styling')}
        >
          Styling
        </button>
        <button
          className={`${styles.filterButton} ${
            selectedCategory === 'Hair Care' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('Hair Care')}
        >
          Hair Care
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
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.booking}>
        <h3 className={styles.subheading}>Book Your Appointment</h3>
        <a href="#book" className={styles.bookButton}>
          Book Now!
        </a>
      </div>
    </section>
  )
}

export default GalleryPage
