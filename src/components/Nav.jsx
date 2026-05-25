import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  const location = useLocation()

  function handleHowItWorks(e) {
    if (location.pathname === '/') {
      e.preventDefault()
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.wordmark}>House Rules</a>
        <nav className={styles.links}>
          <Link to="/reviews">Reviews</Link>
          <a href="/#how-it-works" onClick={handleHowItWorks}>How it works</a>
          <Link to="/write" className={styles.cta}>Write a Review</Link>
        </nav>
      </div>
    </header>
  )
}
