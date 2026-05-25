import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.wordmark}>House Rules</a>
        <nav className={styles.links}>
          <Link to="/reviews">Reviews</Link>
          <a href="#how-it-works">How it works</a>
          <Link to="/write" className={styles.cta}>Write a Review</Link>
        </nav>
      </div>
    </header>
  )
}
