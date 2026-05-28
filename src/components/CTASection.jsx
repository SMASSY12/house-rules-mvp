import styles from './CTASection.module.css'

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Been there?</p>
        <h2 className={styles.title}>
          Tell the next person what you wish you'd known.
        </h2>
        <p className={styles.body}>
          Your honest review may help other professionals find workplaces that treat them right. It only takes a few minutes and stays anonymous.
        </p>
        <a href="/write" className={styles.btn}>Write a review</a>
      </div>
    </section>
  )
}
