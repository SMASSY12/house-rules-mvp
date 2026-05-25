import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The inside word on hospitality workplaces.</p>
        <h1 className={styles.headline}>
          Where professionals go before they say yes.
        </h1>
        <p className={styles.subhead}>
          Verified reviews from people who actually worked the shifts. Pay, management, culture, scheduling — the stuff job posts never tell you.
        </p>
        <div className={styles.actions}>
          <a href="/reviews" className={styles.btnPrimary}>Read reviews</a>
          <a href="/write" className={styles.btnSecondary}>Write a review</a>
        </div>
      </div>
    </section>
  )
}
