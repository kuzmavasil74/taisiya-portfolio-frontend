import React from 'react'
import styles from './Modal.module.css'

const Modal = ({ onClose, children }) => (
  <div className={styles.overlay} onClick={onClose}>
    <div className={styles.content} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
)

export default Modal
