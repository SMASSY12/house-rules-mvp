import { Link } from 'react-router-dom'
import { MOCK_VENUES } from '../data/venues'

const featured = MOCK_VENUES.slice(0, 3)

export default function FeaturedVenues() {
  return (
    <section style={{ background: 'var(--color-bg)', padding: '64px 0' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            color: 'var(--color-text)',
          }}>Recent reviews</h2>
          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--color-text-muted)',
            letterSpacing: '-0.008em',
          }}>See what hospitality professionals are saying about Seattle workplaces.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {featured.map(venue => (
            <Link
              key={venue.id}
              to={`/venue/${venue.id}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '20px',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-text-faint)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    letterSpacing: '-0.015em',
                    marginBottom: '4px',
                    color: 'var(--color-text)',
                  }}>{venue.name}</h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    letterSpacing: '-0.008em',
                  }}>{venue.neighbourhood} · {venue.type}</p>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text)',
                  }}>{venue.overallScore.toFixed(1)}</span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-faint)',
                    letterSpacing: '-0.005em',
                  }}>{venue.reviewCount} reviews</span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-faint)',
                    letterSpacing: '-0.005em',
                  }}>{venue.wouldRecommend}% recommend</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/reviews"
          style={{
            fontSize: '0.9375rem',
            color: 'var(--color-cta)',
            textDecoration: 'none',
            letterSpacing: '-0.008em',
          }}
        >
          Browse all reviews →
        </Link>

      </div>
    </section>
  )
}
