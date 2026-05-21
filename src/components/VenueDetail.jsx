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
    whenWorked: 'Within the last 6 months',
    overallScore: 2.5, wouldRecommend: false,
    wishKnown: 'Management changes constantly — every few months there\'s a new manager with different expectations. By the time you\'re settled in, you\'re starting over.',
    tellFriend: 'The coworkers make it genuinely good some shifts. But the instability from the top wears you down faster than you\'d expect.',
    signals: [
      { name: 'Tip transparency',           score: 2.5, answer: 'Mixed' },
      { name: 'Management under pressure',  score: 1.5, answer: 'Adds pressure or blame' },
      { name: 'Feedback response',          score: 1.5, answer: 'Often dismissed or ignored it' },
      { name: 'Staff culture',              score: 4.5, answer: 'Collaborative and tight-knit' },
      { name: 'Fair treatment',             score: 3.0, answer: 'Some favoritism existed' },
      { name: 'BOH/FOH dynamic',            score: 3.5, answer: 'Mostly fine, occasional friction' },
      { name: 'Management attrition',       score: 1.5, answer: 'Frequent changes' },
      { name: 'Recognition',                score: 2.0, answer: 'Rarely' },
      { name: 'Scheduling',                 score: 2.8, answer: 'Somewhat predictable' },
      { name: 'Shift fairness',             score: 2.5, answer: 'Mixed' },
      { name: 'Training',                   score: 3.0, answer: 'Adequately' },
      { name: 'Off the clock',              score: 3.5, answer: 'No, never expected' },
      { name: 'Time off',                   score: 3.0, answer: 'Request in advance (generally respected)' },
      { name: 'Side work',                  score: 2.5, answer: 'Depends on section / shift' },
      { name: 'Guest culture',              score: 3.5, answer: 'Respectful / professional' },
      { name: 'Alcohol & drug use',         score: 2.5, answer: 'Occasionally' },
      { name: 'Cleanliness',                score: 4.0, answer: 'Mostly clean' },
      { name: 'Growth',                     score: 2.0, answer: 'No' },
      { name: 'Turnover',                   score: 1.5, answer: 'High' },
      { name: 'Shift meal',                 score: 4.0, answer: 'Free shift meal' },
      { name: 'Benefits',                   score: 1.5, answer: 'No' },
      { name: 'Uniforms',                   score: 4.0, answer: 'Yes' },
      { name: 'POS system',                 score: 3.0, answer: 'Toast' },
      { name: 'Pay consistency',            score: 2.0, answer: 'Sometimes late' },
      { name: 'Management overall',         score: 2.0, answer: 'Disorganized' },
      { name: 'Safe to speak up',           score: 1.5, answer: 'Rarely' },
      { name: 'Management communication',   score: 2.0, answer: 'Group text' },
    ],
  },
  {
    id: 'r2',
    role: 'Bartender', experienceDuration: '1–2 years', recency: '1 month ago',
    whenWorked: 'Within the last 6 months',
    overallScore: 3.2, wouldRecommend: false,
    wishKnown: 'Scheduling is a mess. You\'ll get your roster the day before.',
    tellFriend: null,
    signals: [
      { name: 'Staff culture',    score: 5.0, answer: 'Collaborative and tight-knit' },
      { name: 'Cleanliness',      score: 4.0, answer: 'Mostly clean' },
      { name: 'Fair treatment',   score: 3.0, answer: 'Some favoritism existed' },
      { name: 'Scheduling',       score: 2.0, answer: 'Last-minute / chaotic' },
      { name: 'Pay consistency',  score: 3.0, answer: 'Usually on time' },
      { name: 'Management',       score: 2.0, answer: 'Disorganized' },
      { name: 'Safe to speak up', score: 2.0, answer: 'Sometimes' },
    ],
  },
  {
    id: 'r3',
    role: 'Host', experienceDuration: '3–6 months', recency: '2 months ago',
    whenWorked: 'Within the last 6 months',
    overallScore: 2.0, wouldRecommend: false,
    wishKnown: 'They retaliate when you raise concerns. HR is not your friend here.',
    tellFriend: 'Pass on this one unless you need the experience badly.',
    signals: [
      { name: 'Staff culture',    score: 3.0, answer: 'Mostly positive' },
      { name: 'Cleanliness',      score: 5.0, answer: 'Very clean' },
      { name: 'Fair treatment',   score: 2.0, answer: 'Clear in-group / out-group dynamics' },
      { name: 'Scheduling',       score: 2.0, answer: 'Often changed' },
      { name: 'Pay consistency',  score: 2.0, answer: 'Sometimes late' },
      { name: 'Management',       score: 1.0, answer: 'Toxic' },
      { name: 'Safe to speak up', score: 1.0, answer: 'Never' },
    ],
  },
  {
    id: 'r4',
    role: 'Server', experienceDuration: '2+ years', recency: '3 months ago',
    whenWorked: '6 months – 1 year ago',
    overallScore: 3.5, wouldRecommend: true,
    wishKnown: 'The regulars make or break your night — learn them early.',
    tellFriend: 'If you can handle the chaos it\'s actually a good crew.',
    signals: [
      { name: 'Staff culture',    score: 5.0, answer: 'Collaborative and tight-knit' },
      { name: 'Cleanliness',      score: 4.0, answer: 'Mostly clean' },
      { name: 'Fair treatment',   score: 4.0, answer: 'Everyone held to the same standard' },
      { name: 'Scheduling',       score: 3.0, answer: 'Somewhat predictable' },
      { name: 'Pay consistency',  score: 3.0, answer: 'Usually on time' },
      { name: 'Management',       score: 3.0, answer: 'Mixed' },
      { name: 'Safe to speak up', score: 3.0, answer: 'Usually' },
    ],
  },
  {
    id: 'r5',
    role: 'Bartender', experienceDuration: '6–12 months', recency: '4 months ago',
    whenWorked: '6 months – 1 year ago',
    overallScore: 2.8, wouldRecommend: false,
    wishKnown: 'Tips are inconsistent and the tip pool system isn\'t transparent.',
    tellFriend: null,
    signals: [
      { name: 'Staff culture',    score: 4.0, answer: 'Mostly positive' },
      { name: 'Cleanliness',      score: 4.0, answer: 'Mostly clean' },
      { name: 'Fair treatment',   score: 3.0, answer: 'Some favoritism existed' },
      { name: 'Scheduling',       score: 3.0, answer: 'Somewhat predictable' },
      { name: 'Pay consistency',  score: 2.0, answer: 'Sometimes late' },
      { name: 'Management',       score: 2.0, answer: 'Disorganized' },
      { name: 'Safe to speak up', score: 2.0, answer: 'Sometimes' },
    ],
  },
  {
    id: 'r6',
    role: 'Support staff', experienceDuration: '3–6 months', recency: '5 months ago',
    whenWorked: '6 months – 1 year ago',
    overallScore: 2.2, wouldRecommend: false,
    wishKnown: 'Pay was consistently late — had to chase it twice.',
    tellFriend: 'Not worth it for the stress.',
    signals: [
      { name: 'Staff culture',    score: 3.0, answer: 'Mostly positive' },
      { name: 'Cleanliness',      score: 5.0, answer: 'Very clean' },
      { name: 'Fair treatment',   score: 2.0, answer: 'Some favoritism existed' },
      { name: 'Scheduling',       score: 2.0, answer: 'Last-minute / chaotic' },
      { name: 'Pay consistency',  score: 1.0, answer: 'Often late' },
      { name: 'Management',       score: 2.0, answer: 'Mixed' },
      { name: 'Safe to speak up', score: 2.0, answer: 'Rarely' },
    ],
  },
  {
    id: 'r7',
    role: 'Server', experienceDuration: '1–2 years', recency: '7 months ago',
    whenWorked: '1–2 years ago',
    overallScore: 3.8, wouldRecommend: true,
    wishKnown: 'Takes a few months to get the good sections — stick it out.',
    tellFriend: 'Better than most places in the neighbourhood. Team is solid.',
    signals: [
      { name: 'Staff culture',    score: 5.0, answer: 'Collaborative and tight-knit' },
      { name: 'Cleanliness',      score: 4.0, answer: 'Mostly clean' },
      { name: 'Fair treatment',   score: 4.0, answer: 'Everyone held to the same standard' },
      { name: 'Scheduling',       score: 4.0, answer: 'Consistent' },
      { name: 'Pay consistency',  score: 4.0, answer: 'Always on time' },
      { name: 'Management',       score: 3.0, answer: 'Mixed' },
      { name: 'Safe to speak up', score: 3.0, answer: 'Usually' },
    ],
  },
  {
    id: 'r8',
    role: 'Barista', experienceDuration: 'Less than 3 months', recency: '10 months ago',
    whenWorked: '1–2 years ago',
    overallScore: 1.8, wouldRecommend: false,
    wishKnown: 'They schedule you for a shift and cancel it the morning of — no pay, no notice.',
    tellFriend: null,
    signals: [
      { name: 'Staff culture',    score: 3.0, answer: 'Mixed depending on the shift' },
      { name: 'Cleanliness',      score: 3.0, answer: 'Mixed' },
      { name: 'Fair treatment',   score: 2.0, answer: 'Clear in-group / out-group dynamics' },
      { name: 'Scheduling',       score: 1.0, answer: 'Last-minute / chaotic' },
      { name: 'Pay consistency',  score: 2.0, answer: 'Sometimes late' },
      { name: 'Management',       score: 1.0, answer: 'Toxic' },
      { name: 'Safe to speak up', score: 1.0, answer: 'Never' },
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

const REQUIRED_SIGNALS = new Set([
  'Pay consistency', 'Tip transparency',
  'Management overall', 'Management under pressure',
  'Turnover', 'Staff culture', 'Turnover reason',
  'Scheduling', 'Safe to speak up', 'Fair treatment',
])

function sortSignals(signals) {
  const req = signals.filter(s => REQUIRED_SIGNALS.has(s.name)).sort((a, b) => b.score - a.score)
  const opt = signals.filter(s => !REQUIRED_SIGNALS.has(s.name)).sort((a, b) => b.score - a.score)
  return [...req, ...opt]
}

function pillClass(signal, styles) {
  if (signal.answer === 'Other') return styles.pillNeutral
  const tier = signalTier(signal.score)
  if (tier === 'green') return styles.pillGreen
  if (tier === 'neutral') return styles.pillNeutral
  return styles.pillRed
}

function barClass(score, styles) {
  const tier = signalTier(score)
  if (tier === 'green') return styles.barGreen
  if (tier === 'neutral') return styles.barNeutral
  return styles.barRed
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
            {venue.verified && (
              <div className={styles.metaLine}>
                <span className={styles.verifiedBadge}>Verified</span>
              </div>
            )}
            <div className={styles.metaLine}>
              <span className={styles.reviewsFromLabel}>Reviews from:</span>
              {venue.roles.map(r => <span key={r} className={styles.roleTag}>{r}</span>)}
            </div>
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
                  onClick={() => setActiveTab(prev => prev === tab.key ? 'words' : tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'words' && (
              <div className={styles.tabContent}>
                <p className={styles.recentLabel}>Most recent review</p>
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
                {sortSignals([...mostRecent.signals]).map(signal => (
                  <div key={signal.name} className={styles.signalRow}>
                    <div className={styles.signalMeta}>
                      <span className={styles.signalName}>{signal.name}</span>
                      <span className={`${styles.answerPill} ${pillClass(signal, styles)}`}>
                        {signal.answer}
                      </span>
                    </div>
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
                        className={`${styles.barFill} ${barClass(signal.score, styles)}`}
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
                    <span className={styles.reviewRowMeta}>Worked there {review.whenWorked}</span>
                    <span className={styles.reviewRowMeta}>There for {review.experienceDuration} · Reviewed {review.recency}</span>
                    <p className={styles.reviewExcerpt}>{review.wishKnown}</p>
                    <span className={styles.expandLink}>
                      {expanded.has(review.id) ? 'Show less' : 'Read full review'}
                    </span>
                  </div>
                  <div className={styles.reviewRowRight}>
                    <span className={styles.scoreLabel}>Their score</span>
                    <span className={styles.reviewScore}>{review.overallScore.toFixed(1)}</span>
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
                      {sortSignals([...review.signals]).map(signal => (
                        <div key={signal.name} className={styles.signalRow}>
                          <div className={styles.signalMeta}>
                            <span className={styles.signalName}>{signal.name}</span>
                            <span className={`${styles.answerPill} ${pillClass(signal, styles)}`}>
                              {signal.answer}
                            </span>
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
