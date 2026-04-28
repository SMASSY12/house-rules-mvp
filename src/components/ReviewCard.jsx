import { useState } from 'react'
import StarRating from './StarRating'
import { generateTags } from '../utils/generateTags'
import styles from './ReviewCard.module.css'

const VISIBLE_TAG_LIMIT = 4

function typeToTier(type) {
  if (type === 'positive') return 'good'
  if (type === 'negative') return 'bad'
  return 'neutral'
}

// Picks up to VISIBLE_TAG_LIMIT tags with a balanced type mix:
// 1 positive, 1 neutral, then fills remaining slots with negatives.
// Falls back to any remaining tags if a type bucket runs out.
function selectVisibleTags(tags) {
  const positive = tags.filter(t => t.type === 'positive')
  const neutral = tags.filter(t => t.type === 'neutral')
  const negative = tags.filter(t => t.type === 'negative')
  const selected = []
  const used = new Set()

  function take(arr) {
    const tag = arr.find(t => !used.has(t.label))
    if (tag) { selected.push(tag); used.add(tag.label) }
  }

  take(positive)
  take(neutral)
  while (selected.length < VISIBLE_TAG_LIMIT && negative.some(t => !used.has(t.label))) {
    take(negative)
  }
  while (selected.length < VISIBLE_TAG_LIMIT) {
    const tag = tags.find(t => !used.has(t.label))
    if (!tag) break
    selected.push(tag)
    used.add(tag.label)
  }

  return {
    visible: selected,
    rest: tags.filter(t => !used.has(t.label)),
  }
}

export default function ReviewCard({ review }) {
  const [signalsExpanded, setSignalsExpanded] = useState(false)
  const [reviewExpanded, setReviewExpanded] = useState(false)
  const { primaryTags, contextTags } = generateTags(review.answers)
  const { visible, rest } = selectVisibleTags(primaryTags)
  const hasMore = rest.length > 0 || contextTags.length > 0

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <h3 className={styles.restaurant}>{review.restaurant}</h3>
          <span className={styles.location}>{review.location}</span>
        </div>
        <div className={styles.ratingRow}>
          <StarRating rating={review.rating} />
          <span className={styles.ratingLabel}>{review.rating}/5</span>
        </div>
      </header>

      <div className={styles.roleLine}>
        <span className={styles.role}>{review.role}</span>
        <span className={styles.dot}>·</span>
        <span className={styles.date}>{review.date}</span>
      </div>

      <p className={styles.quickTake}>{review.quickTake}</p>
      <p className={styles.voiceLine}>A snapshot from someone who worked here.</p>

      <div className={styles.primaryTags}>
        {visible.map(tag => (
          <span key={tag.label} className={`${styles.tag} ${styles[typeToTier(tag.type)]}`}>
            {tag.label}
          </span>
        ))}
      </div>

      {signalsExpanded && (
        <div className={styles.expandedSignals}>
          {rest.map(tag => (
            <span key={tag.label} className={`${styles.tag} ${styles[typeToTier(tag.type)]}`}>
              {tag.label}
            </span>
          ))}
          {contextTags.map(tag => (
            <span key={tag.label} className={styles.contextTag}>
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {hasMore && (
        <button
          type="button"
          className={styles.signalsBtn}
          onClick={() => setSignalsExpanded(v => !v)}
        >
          {signalsExpanded ? 'Hide signals' : 'View all signals'}
        </button>
      )}

      {reviewExpanded && (
        <div className={styles.fullReview}>
          <p>{review.fullReview}</p>
        </div>
      )}

      <button
        type="button"
        className={styles.expandBtn}
        onClick={() => setReviewExpanded(v => !v)}
        aria-expanded={reviewExpanded}
      >
        {reviewExpanded ? 'Collapse review ↑' : 'Read full review →'}
      </button>
    </article>
  )
}
