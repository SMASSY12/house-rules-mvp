import { useState, useRef, useEffect } from 'react'
import styles from './Nav.module.css'
import { reviews } from '../data/reviews'

export default function Nav() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  const trimmed = query.trim()
  const results = trimmed
    ? reviews.filter(r =>
        r.restaurant.toLowerCase().includes(trimmed.toLowerCase()) ||
        r.location.toLowerCase().includes(trimmed.toLowerCase())
      )
    : []

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function handleSelect() {
    setQuery('')
    setOpen(false)
    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (trimmed) handleSelect()
  }

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <span className={styles.wordmark}>House Rules</span>
        <nav className={styles.links}>
          <a href="#how-it-works">How it works</a>

          <div className={styles.searchWrap} ref={wrapRef}>
            <form onSubmit={handleSubmit} role="search" className={styles.searchForm}>
              <span className={styles.searchIcon} aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.25"/>
                  <path d="M9 9L11.5 11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                className={`${styles.searchInput} ${open && trimmed ? styles.searchInputOpen : ''}`}
                type="search"
                value={query}
                onChange={e => { setQuery(e.target.value); setOpen(true) }}
                onFocus={() => setOpen(true)}
                placeholder="Search"
                aria-label="Search workplaces"
                autoComplete="off"
              />
            </form>

            {open && trimmed.length > 0 && (
              <div className={styles.searchResults} role="listbox">
                {results.length > 0 ? results.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    className={styles.searchResult}
                    onClick={handleSelect}
                    role="option"
                  >
                    <span className={styles.resultName}>{r.restaurant}</span>
                    <span className={styles.resultMeta}>{r.location}</span>
                  </button>
                )) : (
                  <p className={styles.searchEmpty}>No results for &ldquo;{trimmed}&rdquo;</p>
                )}
              </div>
            )}
          </div>

          <a href="#write" className={styles.cta}>Write a Review</a>
        </nav>
      </div>
    </header>
  )
}
