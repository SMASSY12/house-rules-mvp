import { useState } from 'react'
import { useParams } from 'react-router-dom'
import StarRating from './StarRating'
import styles from './VenueDetail.module.css'

const MOCK_VENUE = {
  id: 'the-anchor-and-rail',
  name: 'The Anchor & Rail',
  neighbourhood: 'Fitzroy',
  city: 'Melbourne',
  overallScore: 2.7,
  reviewCount: 8,
  verified: true,
  roles: ['Server', 'Bartender', 'Host', 'Support staff', 'Barista'],
}

const MOCK_REVIEWS = [
  {
    id: 'r1',
    role: 'Server', experienceDuration: '6–12 months', recency: '3 weeks ago',
    overallScore: 2.5, wouldRecommend: false,
    wishKnown: 'Management changes constantly — every few months there\'s a new manager with different expectations. By the time you\'re settled in, you\'re starting over.',
    tellFriend: 'The coworkers make it genuinely good some shifts. But the instability from the top wears you down faster than you\'d expect.',
    signals: [
      { name: 'Tip transparency',           score: 2.5, note: 'Pool system but never posted.' },
      { name: 'Management under pressure',  score: 1.5, note: 'Blamed staff publicly on a bad Saturday.' },
      { name: 'Feedback response',          score: 1.5, note: null },
      { name: 'Staff culture',              score: 4.5, note: 'Crew looks out for each other.' },
      { name: 'Fair treatment',             score: 3.0, note: null },
      { name: 'BOH/FOH dynamic',            score: 3.5, note: 'Better than most places.' },
      { name: 'Management attrition',       score: 1.5, note: 'Fourth manager in two years.' },
      { name: 'Recognition',                score: 2.0, note: null },
      { name: 'Scheduling',                 score: 2.8, note: 'Roster usually out 48hrs before.' },
      { name: 'Shift fairness',             score: 2.5, note: null },
      { name: 'Training',                   score: 3.0, note: 'Thrown in but teammates covered.' },
      { name: 'Off the clock',              score: 3.5, note: 'No contact outside shifts.' },
      { name: 'Time off',                   score: 3.0, note: null },
      { name: 'Side work',                  score: 2.5, note: null },
      { name: 'Guest culture',              score: 3.5, note: null },
      { name: 'Alcohol & drug use',         score: 2.5, note: 'Occasionally, mainly management.' },
      { name: 'Cleanliness',               score: 4.0, note: null },
      { name: 'Growth',                    score: 2.0, note: null },
      { name: 'Turnover',                  score: 1.5, note: null },
      { name: 'Shift meal',                score: 4.0, note: 'Hot meal before every service.' },
      { name: 'Benefits',                  score: 1.5, note: 'None offered.' },
      { name: 'Uniforms',                  score: 4.0, note: null },
      { name: 'POS system',                score: 3.0, note: 'Toast — easy to learn.' },
      { name: 'Pay consistency',           score: 2.0, note: 'Tips weren\'t always split right.' },
      { name: 'Management overall',        score: 2.0, note: null },
      { name: 'Safe to speak up',          score: 1.5, note: 'Raised an issue once. Regretted it.' },
      { name: 'Management communication',  score: 2.0, note: 'Group text, last minute always.' },
    ],
  },
  {
    id: 'r2',
    role: 'Bartender', experienceDuration: '1–2 years', recency: '1 month ago',
    overallScore: 3.2, wouldRecommend: false,
    wishKnown: 'Scheduling is a mess. You\'ll get your roster the day before.',
    tellFriend: null,
    signals: [
      { name: 'Staff culture',    score: 5.0, note: null },
      { name: 'Cleanliness',      score: 4.0, note: null },
      { name: 'Fair treatment',   score: 3.0, note: null },
      { name: 'Scheduling',       score: 2.0, note: null },
      { name: 'Pay consistency',  score: 3.0, note: null },
      { name: 'Management',       score: 2.0, note: null },
      { name: 'Safe to speak up', score: 2.0, note: null },
    ],
  },
  {
    id: 'r3',
    role: 'Host', experienceDuration: '3–6 months', recency: '2 months ago',
    overallScore: 2.0, wouldRecommend: false,
    wishKnown: 'They retaliate when you raise concerns. HR is not your friend here.',
    tellFriend: 'Pass on this one unless you need the experience badly.',
    signals: [
      { name: 'Staff culture',    score: 3.0, note: null },
      { name: 'Cleanliness',      score: 5.0, note: null },
      { name: 'Fair treatment',   score: 2.0, note: null },
      { name: 'Scheduling',       score: 2.0, note: null },
      { name: 'Pay consistency',  score: 2.0, note: null },
      { name: 'Management',       score: 1.0, note: null },
      { name: 'Safe to speak up', score: 1.0, note: null },
    ],
  },
  {
    id: 'r4',
    role: 'Server', experienceDuration: '2+ years', recency: '3 months ago',
    overallScore: 3.5, wouldRecommend: true,
    wishKnown: 'The regulars make or break your night — learn them early.',
    tellFriend: 'If you can handle the chaos it\'s actually a good crew.',
    signals: [
      { name: 'Staff culture',    score: 5.0, note: null },
      { name: 'Cleanliness',      score: 4.0, note: null },
      { name: 'Fair treatment',   score: 4.0, note: null },
      { name: 'Scheduling',       score: 3.0, note: null },
      { name: 'Pay consistency',  score: 3.0, note: null },
      { name: 'Management',       score: 3.0, note: null },
      { name: 'Safe to speak up', score: 3.0, note: null },
    ],
  },
  {
    id: 'r5',
    role: 'Bartender', experienceDuration: '6–12 months', recency: '4 months ago',
    overallScore: 2.8, wouldRecommend: false,
    wishKnown: 'Tips are inconsistent and the tip pool system isn\'t transparent.',
    tellFriend: null,
    signals: [
      { name: 'Staff culture',    score: 4.0, note: null },
      { name: 'Cleanliness',      score: 4.0, note: null },
      { name: 'Fair treatment',   score: 3.0, note: null },
      { name: 'Scheduling',       score: 3.0, note: null },
      { name: 'Pay consistency',  score: 2.0, note: null },
      { name: 'Management',       score: 2.0, note: null },
      { name: 'Safe to speak up', score: 2.0, note: null },
    ],
  },
  {
    id: 'r6',
    role: 'Support staff', experienceDuration: '3–6 months', recency: '5 months ago',
    overallScore: 2.2, wouldRecommend: false,
    wishKnown: 'Pay was consistently late — had to chase it twice.',
    tellFriend: 'Not worth it for the stress.',
    signals: [
      { name: 'Staff culture',    score: 3.0, note: null },
      { name: 'Cleanliness',      score: 5.0, note: null },
      { name: 'Fair treatment',   score: 2.0, note: null },
      { name: 'Scheduling',       score: 2.0, note: null },
      { name: 'Pay consistency',  score: 1.0, note: null },
      { name: 'Management',       score: 2.0, note: null },
      { name: 'Safe to speak up', score: 2.0, note: null },
    ],
  },
  {
    id: 'r7',
    role: 'Server', experienceDuration: '1–2 years', recency: '7 months ago',
    overallScore: 3.8, wouldRecommend: true,
    wishKnown: 'Takes a few months to get the good sections — stick it out.',
    tellFriend: 'Better than most places in the neighbourhood. Team is solid.',
    signals: [
      { name: 'Staff culture',    score: 5.0, note: null },
      { name: 'Cleanliness',      score: 4.0, note: null },
      { name: 'Fair treatment',   score: 4.0, note: null },
      { name: 'Scheduling',       score: 4.0, note: null },
      { name: 'Pay consistency',  score: 4.0, note: null },
      { name: 'Management',       score: 3.0, note: null },
      { name: 'Safe to speak up', score: 3.0, note: null },
    ],
  },
  {
    id: 'r8',
    role: 'Barista', experienceDuration: 'Less than 3 months', recency: '10 months ago',
    overallScore: 1.8, wouldRecommend: false,
    wishKnown: 'They schedule you for a shift and cancel it the morning of — no pay, no notice.',
    tellFriend: null,
    signals: [
      { name: 'Staff culture',    score: 3.0, note: null },
      { name: 'Cleanliness',      score: 3.0, note: null },
      { name: 'Fair treatment',   score: 2.0, note: null },
      { name: 'Scheduling',       score: 1.0, note: null },
      { name: 'Pay consistency',  score: 2.0, note: null },
      { name: 'Management',       score: 1.0, note: null },
      { name: 'Safe to speak up', score: 1.0, note: null },
    ],
  },
]

function signalTier(score) {
  if (score >= 3.5) return 'green'
  if (score >= 2.5) return 'neutral'
  return 'red'
}

function aggregateSignals(reviews) {
  const map = {}
  for (const r of reviews) {
    for (const s of r.signals) {
      if (!map[s.name]) map[s.name] = { total: 0, count: 0 }
      map[s.name].total += s.score
      map[s.name].count++
    }
  }
  return Object.entries(map)
    .map(([name, { total, count }]) => ({ name, score: total / count }))
    .sort((a, b) => b.score - a.score)
}

function scrollToReviews(e) {
  e.preventDefault()
  document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })
}

export default function VenueDetail() {
  const { id } = useParams()
  const venue = MOCK_VENUE
  const reviews = MOCK_REVIEWS

  const [activeTab, setActiveTab]       = useState('words')
  const [expanded, setExpanded]         = useState(new Set())
  const [visibleCount, setVisibleCount] = useState(5)

  const mostRecent   = reviews[0]
  const aggregated   = aggregateSignals(reviews)
  const recommendPct = Math.round(
    (reviews.filter(r => r.wouldRecommend).length / reviews.length) * 100
  )

  function toggleExpanded(reviewId) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(reviewId) ? next.delete(reviewId) : next.add(reviewId)
      return next
    })
  }

  return (
    <div className={styles.page}>

      {/* ── Venue header ── */}
      <div className={styles.headerSection}>
        <div className={styles.inner}>
          <h1 className={styles.venueName}>{venue.name}</h1>
          <p className={styles.venueLocation}>{venue.neighbourhood} · {venue.city}</p>
          <div className={styles.scoreRow}>
            <span className={styles.scoreNumber}>{venue.overallScore.toFixed(1)}</span>
            <StarRating rating={venue.overallScore} />
            <a href="#reviews" className={styles.reviewCountLink} onClick={scrollToReviews}>
              {venue.reviewCount} reviews
            </a>
          </div>
          <div className={styles.metaRow}>
            {venue.verified && <span className={styles.verifiedBadge}>Verified</span>}
            {venue.roles.map(r => <span key={r} className={styles.roleTag}>{r}</span>)}
          </div>
        </div>
      </div>

      {/* ── Tabbed card ── */}
      <div className={styles.cardSection}>
        <div className={styles.inner}>
          <div className={styles.card}>

            <div className={styles.tabBar}>
              {[
                { key: 'words',   label: 'Their words' },
                { key: 'signals', label: 'Signals' },
                { key: 'track',   label: 'Track record' },
              ].map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'words' && (
              <div className={styles.tabContent}>
                <div className={styles.wordsBlock}>
                  <p className={styles.wordsLabel}>What they wish they'd known</p>
                  <p className={styles.wordsBody}>{mostRecent.wishKnown}</p>
                </div>
                {mostRecent.tellFriend && (
                  <div className={styles.wordsBlock}>
                    <p className={styles.wordsLabel}>What they'd tell a friend</p>
                    <p className={styles.wordsBody}>{mostRecent.tellFriend}</p>
                  </div>
                )}
                <p className={styles.wordsAttribution}>{mostRecent.role} · {mostRecent.recency}</p>
              </div>
            )}

            {activeTab === 'signals' && (
              <div className={styles.tabContent}>
                {[...mostRecent.signals]
                  .sort((a, b) => b.score - a.score)
                  .map(signal => (
                    <div key={signal.name} className={styles.signalRow}>
                      <div className={styles.signalMeta}>
                        <span className={styles.signalName}>{signal.name}</span>
                        <span className={`${styles.signalScore} ${styles[signalTier(signal.score)]}`}>
                          {signal.score.toFixed(1)}
                        </span>
                      </div>
                      <div className={styles.barTrack}>
                        <div
                          className={`${styles.barFill} ${styles[signalTier(signal.score)]}`}
                          style={{ width: `${(signal.score / 5) * 100}%` }}
                        />
                      </div>
                      {signal.note && <p className={styles.signalNote}>{signal.note}</p>}
                    </div>
                  ))}
                <p className={styles.wordsAttribution}>{mostRecent.role} · {mostRecent.recency}</p>
              </div>
            )}

            {activeTab === 'track' && (
              <div className={styles.tabContent}>
                <div className={styles.statRow}>
                  <div className={styles.stat}>
                    <a href="#reviews" className={styles.statValue} onClick={scrollToReviews}>
                      {venue.reviewCount}
                    </a>
                    <span className={styles.statLabel}>reviews</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{venue.overallScore.toFixed(1)}</span>
                    <span className={styles.statLabel}>overall</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{recommendPct}%</span>
                    <span className={styles.statLabel}>would recommend</span>
                  </div>
                </div>
                {aggregated.map(signal => (
                  <div key={signal.name} className={styles.signalRow}>
                    <div className={styles.signalMeta}>
                      <span className={styles.signalName}>{signal.name}</span>
                      <span className={`${styles.signalScore} ${styles[signalTier(signal.score)]}`}>
                        {signal.score.toFixed(1)}
                      </span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${styles[signalTier(signal.score)]}`}
                        style={{ width: `${(signal.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Review list ── */}
      <div id="reviews" className={styles.reviewSection}>
        <div className={styles.inner}>
          <h2 className={styles.reviewListHeading}>All reviews</h2>
          <div className={styles.reviewList}>
            {reviews.slice(0, visibleCount).map(review => (
              <div key={review.id} className={styles.reviewRow}>
                <button
                  type="button"
                  className={styles.reviewRowHeader}
                  onClick={() => toggleExpanded(review.id)}
                  aria-expanded={expanded.has(review.id)}
                >
                  <div className={styles.reviewRowLeft}>
                    <span className={styles.reviewRole}>{review.role}</span>
                    <span className={styles.reviewRowMeta}>
                      {review.experienceDuration} · {review.recency}
                    </span>
                    <p className={styles.reviewExcerpt}>{review.wishKnown}</p>
                  </div>
                  <div className={styles.reviewRowRight}>
                    <span className={styles.reviewScore}>{review.overallScore.toFixed(1)}</span>
                    <span className={styles.reviewChevron} aria-hidden="true">
                      {expanded.has(review.id) ? '↑' : '↓'}
                    </span>
                  </div>
                </button>
                {expanded.has(review.id) && (
                  <div className={styles.reviewExpanded}>
                    <div className={styles.wordsBlock}>
                      <p className={styles.wordsLabel}>What they wish they'd known</p>
                      <p className={styles.wordsBody}>{review.wishKnown}</p>
                    </div>
                    {review.tellFriend && (
                      <div className={styles.wordsBlock}>
                        <p className={styles.wordsLabel}>What they'd tell a friend</p>
                        <p className={styles.wordsBody}>{review.tellFriend}</p>
                      </div>
                    )}
                    <div className={styles.expandedSignals}>
                      {[...review.signals]
                        .sort((a, b) => b.score - a.score)
                        .map(signal => (
                          <div key={signal.name} className={styles.signalRow}>
                            <div className={styles.signalMeta}>
                              <span className={styles.signalName}>{signal.name}</span>
                              <span className={`${styles.signalScore} ${styles[signalTier(signal.score)]}`}>
                                {signal.score.toFixed(1)}
                              </span>
                            </div>
                            <div className={styles.barTrack}>
                              <div
                                className={`${styles.barFill} ${styles[signalTier(signal.score)]}`}
                                style={{ width: `${(signal.score / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {visibleCount < reviews.length && (
            <button
              type="button"
              className={styles.loadMoreBtn}
              onClick={() => setVisibleCount(c => c + 5)}
            >
              Load {Math.min(5, reviews.length - visibleCount)} more reviews
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
