import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.wordmark}>House Rules</span>
        <p className={styles.tagline}>Workplace reviews for the hospitality industry.</p>
      </div>
    </footer>
  )
}
