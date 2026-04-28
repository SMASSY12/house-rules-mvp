import styles from './SignalBadge.module.css'

export default function SignalBadge({ label, status, tier }) {
  return (
    <div className={`${styles.badge} ${styles[tier]}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.status}>{status}</span>
    </div>
  )
}
