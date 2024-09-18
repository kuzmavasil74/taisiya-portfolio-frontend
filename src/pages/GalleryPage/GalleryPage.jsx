import React from 'react'
import styles from './GalleryPage.module.css' // Make sure this file exists

const galleryItems = [
  {
    id: 1,
    category: 'Haircuts',
    beforeImage: '/images/gallery/haircut-before.jpg',
    afterImage: '/images/gallery/haircut-after.jpg',
    description: 'Classic haircut with modern touch.',
  },
  {
    id: 2,
    category: 'Coloring',
    beforeImage: '/images/gallery/coloring-before.jpg',
    afterImage: '/images/gallery/coloring-after.jpg',
    description: 'Bold balayage for a vibrant look.',
  },
  // Add more items here
]

function GalleryPage() {
  return (
    <section className={styles.gallery}>
      <h2 className={styles.heading}>Gallery</h2>

      <div className={styles.filters}>
        <button className={styles.filterButton}>All</button>
        <button className={styles.filterButton}>Haircuts</button>
        <button className={styles.filterButton}>Coloring</button>
        <button className={styles.filterButton}>Styling</button>
        <button className={styles.filterButton}>Hair Care</button>
      </div>

      <div className={styles.galleryGrid}>
        {galleryItems.map((item) => (
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
