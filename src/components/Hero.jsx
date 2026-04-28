import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>For hospitality workers, by hospitality workers</p>
        <h1 className={styles.headline}>
          Real reviews from people who actually worked there.
        </h1>
        <p className={styles.subhead}>
          See what a workplace is really like before you commit. More than a rating — real voices from people who were actually there.
        </p>
        <p className={styles.support}>Built for hospitality professionals. Period.</p>
        <div className={styles.actions}>
          <a href="#write" className={styles.btnPrimary}>Write a Review</a>
          <a href="#reviews" className={styles.btnSecondary}>Read Reviews</a>
        </div>
      </div>
    </section>
  )
}
