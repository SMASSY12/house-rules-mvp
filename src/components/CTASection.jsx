import styles from './CTASection.module.css'

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Share your experience</p>
        <h2 className={styles.title}>
          Help the next industry professional know what to expect.
        </h2>
        <p className={styles.body}>
          Honest, structured reviews from people who've been there. Takes less than 5 minutes and makes a real difference for someone trying to make a smart decision.
        </p>
        <a href="#write" className={styles.btn}>Write a Review</a>
        <p className={styles.note}>Reviews are tied to a real account to protect workers and ensure credibility.</p>
      </div>
    </section>
  )
}
