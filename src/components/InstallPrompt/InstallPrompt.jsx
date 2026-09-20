import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './InstallPrompt.module.css'

const DISMISSED_KEY = 'pwa-install-dismissed'

function InstallPrompt() {
  const { t } = useTranslation()
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      try {
        if (localStorage.getItem(DISMISSED_KEY)) return
      } catch {
        // localStorage недоступний (наприклад, приватний режим) — просто показуємо промпт
      }
      setDeferredPrompt(e)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setVisible(false)
  }

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISSED_KEY, '1')
    } catch {
      // ігноруємо — банер просто зʼявиться знову наступного разу
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner}>
      <span>{t('pwa.installPrompt')}</span>
      <div className={styles.actions}>
        <button className={styles.installBtn} onClick={handleInstall}>
          {t('pwa.install')}
        </button>
        <button className={styles.dismissBtn} onClick={handleDismiss}>
          {t('pwa.dismiss')}
        </button>
      </div>
    </div>
  )
}

export default InstallPrompt
