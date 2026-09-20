import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './DashboardProfile.module.css'
import apiFetch from '../../../../utills/api.js'

const DashboardProfile = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const cachedUser = JSON.parse(localStorage.getItem('user'))

  const [profile, setProfile] = useState(cachedUser)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiFetch('/users/me')
        if (!res.ok) return
        const data = await res.json()
        setProfile(data)
      } catch {
        // залишаємось на кешованому профілі
      }
    }
    fetchProfile()
  }, [])

  const handleCopyReferral = () => {
    if (!profile?.referralCode) return
    navigator.clipboard?.writeText(profile.referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeleteAccount = async () => {
    setDeleting(true)
    try {
      const res = await apiFetch('/users/me', { method: 'DELETE' })
      if (res.ok) {
        localStorage.clear()
        navigate('/')
      }
    } finally {
      setDeleting(false)
      setShowConfirmDelete(false)
    }
  }

  if (!profile) return <p>{t('dashboard.profile.notFound')}</p>

  return (
    <div className={styles.profile}>
      <h2 className={styles.title}>{t('dashboard.profile.title')}</h2>

      <div className={styles.row}>
        <span className={styles.label}>{t('dashboard.profile.name')}:</span>
        <span>{profile.name}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>{t('dashboard.profile.email')}:</span>
        <span>{profile.email}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>{t('dashboard.profile.role')}:</span>
        <span>{t(`dashboard.role-names.${profile.role}`)}</span>
      </div>
      {profile.phone && (
        <div className={styles.row}>
          <span className={styles.label}>{t('dashboard.profile.phone')}:</span>
          <span>{profile.phone}</span>
        </div>
      )}

      <div className={styles.loyaltyBox}>
        <h3>{t('dashboard.loyalty.title')}</h3>
        <p className={styles.points}>
          {t('dashboard.loyalty.points', { count: profile.points || 0 })}
        </p>
        <p className={styles.hint}>{t('dashboard.loyalty.hint')}</p>
      </div>

      {profile.referralCode && (
        <div className={styles.referralBox}>
          <h3>{t('dashboard.referral.title')}</h3>
          <p className={styles.hint}>{t('dashboard.referral.hint')}</p>
          <div className={styles.referralCodeRow}>
            <code className={styles.referralCode}>{profile.referralCode}</code>
            <button className={styles.copyBtn} onClick={handleCopyReferral}>
              {copied ? t('dashboard.referral.copied') : t('dashboard.referral.copy')}
            </button>
          </div>
        </div>
      )}

      <div className={styles.dangerZone}>
        <h3>{t('dashboard.deleteAccount.title')}</h3>
        <p className={styles.hint}>{t('dashboard.deleteAccount.hint')}</p>
        <button
          className={styles.deleteBtn}
          onClick={() => setShowConfirmDelete(true)}
        >
          {t('dashboard.deleteAccount.button')}
        </button>
      </div>

      {showConfirmDelete && (
        <div
          className={styles.confirmModal}
          onClick={() => !deleting && setShowConfirmDelete(false)}
        >
          <div
            className={styles.confirmContent}
            onClick={(e) => e.stopPropagation()}
          >
            <p>{t('dashboard.deleteAccount.confirm')}</p>
            <div className={styles.confirmBtns}>
              <button
                className={styles.deleteBtn}
                disabled={deleting}
                onClick={handleDeleteAccount}
              >
                {t('dashboard.deleteAccount.confirmButton')}
              </button>
              <button
                className={styles.cancelBtn}
                disabled={deleting}
                onClick={() => setShowConfirmDelete(false)}
              >
                {t('bookings.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardProfile
