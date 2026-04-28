import ReviewCard from './ReviewCard'
import { reviews } from '../data/reviews'
import styles from './ReviewsSection.module.css'

export default function ReviewsSection() {
  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Real Voices from the Floor</h2>
          <p className={styles.subtitle}>
            Written by the people who actually worked the shifts.
          </p>
        </div>
        <div className={styles.grid}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
