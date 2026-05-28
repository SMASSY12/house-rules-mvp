import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()

  function handleHowItWorks(e) {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.wordmark}>House Rules</a>
        <nav className={styles.links}>
          <Link to="/reviews">Reviews</Link>
          <a href="/#how-it-works" onClick={handleHowItWorks}>How it works</a>
          <Link to="/write" className={styles.cta}>Write a review</Link>
        </nav>
      </div>
    </header>
  )
}
