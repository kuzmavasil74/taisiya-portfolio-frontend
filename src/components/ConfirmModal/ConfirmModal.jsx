import React from 'react'
import Modal from '../Modal/Modal.jsx'
import styles from './ConfirmModal.module.css'

const ConfirmModal = ({
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  confirmDisabled = false,
}) => (
  <Modal onClose={onCancel}>
    <p className={styles.message}>{message}</p>
    <div className={styles.actions}>
      <button
        className={styles.confirmBtn}
        disabled={confirmDisabled}
        onClick={onConfirm}
      >
        {confirmLabel}
      </button>
      <button className={styles.cancelBtn} onClick={onCancel}>
        {cancelLabel}
      </button>
    </div>
  </Modal>
)

export default ConfirmModal
