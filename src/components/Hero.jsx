import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The inside word on hospitality workplaces</p>
        <h1 className={styles.headline}>
          Where professionals go before they say yes.
        </h1>
        <p className={styles.subhead}>
          Verified reviews from people who worked the shifts. Pay, management, culture, scheduling — the stuff job posts never tell you.
        </p>
        <div className={styles.actions}>
          <Link to="/write" className={styles.btnPrimary}>Write a review</Link>
          <Link to="/reviews" className={styles.btnSecondary}>Read reviews</Link>
        </div>
      </div>
    </section>
  )
}
