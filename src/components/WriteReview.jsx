import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import styles from './WriteReview.module.css'

const TOTAL_STEPS = 4
const STEP_LABELS = ['The Workplace', 'Core Signals', 'In Your Words', 'Account + Identity']

const TOP_10_IDS = new Set([
  'pay_consistency',
  'tip_transparency',
  'management',
  'managementUnderPressure',
  'turnover',
  'staff_culture',
  'feedback_response',
  'scheduling',
  'safe_to_speak_up',
  'fair_treatment',
])

const signalGroups = [
  {
    heading: 'The money',
    questions: [
      {
        id: 'pay_consistency',
        text: 'How consistent was your pay?',
        options: ['Always on time', 'Usually on time', 'Sometimes late', 'Often late', 'Not sure'],
      },
      {
        id: 'tip_transparency',
        text: 'How clear and transparent were tips?',
        options: ['Very clear', 'Mostly clear', 'Mixed', 'Often unclear', 'Not applicable'],
      },
      {
        id: 'off_clock',
        text: 'Were there times people worked without being paid?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often'],
      },
    ],
  },
  {
    heading: 'Day to day',
    questions: [
      {
        id: 'scheduling',
        text: 'How would you describe scheduling?',
        options: ['Consistent', 'Somewhat predictable', 'Often changed', 'Last-minute / chaotic'],
      },
      {
        id: 'shift_fairness',
        text: 'How fair were shift or section assignments?',
        options: ['Very fair', 'Mostly fair', 'Mixed', 'Often unfair'],
      },
      {
        id: 'offDayCommunication',
        text: 'Are you expected to respond to work messages on your time off?',
        options: ['No, never expected', 'Occasionally', 'Often expected', 'Yes, consistently expected'],
        microcopy: 'This is about contact outside work hours — calls, texts, and expectations to be available when you\'re not on the clock.',
      },
      {
        id: 'training',
        text: 'How well were you trained for your role?',
        options: ['Very well', 'Adequately', 'Minimal training', 'Thrown in'],
      },
      {
        id: 'timeOffProcess',
        text: 'How is time off typically handled?',
        options: ['Easy to request and approve', 'Request in advance (generally respected)', 'Must find shift coverage', 'Difficult to get approved', 'Not sure'],
      },
      {
        id: 'sideWorkLoad',
        text: 'How would you describe side work expectations?',
        options: ['Minimal', 'Moderate and fair', 'Depends on section/shift', 'Heavy workload', 'Excessive'],
      },
    ],
  },
  {
    heading: 'The people',
    questions: [
      {
        id: 'management',
        text: 'How would you describe management overall?',
        options: ['Supportive', 'Mixed', 'Disorganized', 'Toxic'],
      },
      {
        id: 'managementUnderPressure',
        text: 'How does management typically behave during busy or high-stress shifts?',
        options: ['Supportive and present', 'Steps in when needed', 'Visible but reactive', 'Distant or unavailable', 'Adds pressure or blame'],
      },
      {
        id: 'safe_to_speak_up',
        text: 'Did you feel comfortable raising concerns or giving feedback?',
        options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
      },
      {
        id: 'feedback_response',
        text: 'How did management typically respond to feedback or concerns?',
        options: [
          'Took it seriously and acted on it',
          'Listened, but didn\'t always follow through',
          'Often dismissed or ignored it',
          'Discouraged or punished speaking up',
        ],
        tag: 'Feedback Response',
        microcopy: 'Safe to speak up is about how you felt. This is about what happened when you did.',
      },
      {
        id: 'staff_culture',
        text: 'How would you describe the culture among staff here?',
        options: ['Collaborative and tight-knit', 'Mostly positive', 'Mixed depending on the shift', 'Cliquey or divided', 'Toxic or hostile'],
      },
      {
        id: 'fair_treatment',
        text: 'How fairly were all team members treated here?',
        options: [
          'Everyone held to the same standard',
          'Some favoritism existed',
          'Clear in-group / out-group dynamics',
          'Bullying or intimidation was present',
          'Discrimination or harassment was present',
          'Not sure',
        ],
        other: true,
      },
      {
        id: 'boh_foh_dynamic',
        text: 'What was the relationship like between front and back of house?',
        options: ['Collaborative and respectful', 'Mostly fine, occasional friction', 'Mixed — depended on the shift', 'Frequently tense', 'Always a problem', 'Not sure'],
      },
      {
        id: 'management_attrition',
        text: 'How often did management change during your time here?',
        options: [
          'Rarely — same team throughout',
          'Some turnover but stable overall',
          'Frequent changes',
          'Constant turnover',
          'Not sure',
        ],
      },
      {
        id: 'management_communication',
        text: 'How does management prefer to communicate with staff?',
        options: [
          'Group text',
          'Communication app (Slack, Teams, etc.)',
          'Group email',
          'In person / verbal only',
          'Whiteboard / physical board',
          'Other',
        ],
        multiSelect: true,
      },
      {
        id: 'recognition',
        text: 'How often were you recognized or appreciated for your work?',
        options: ['Regularly', 'Occasionally', 'Rarely', 'Never'],
        tag: 'Recognition',
        microcopy: 'Includes feedback, acknowledgment, or small gestures from management or coworkers.',
      },
    ],
  },
  {
    heading: 'The place',
    questions: [
      {
        id: 'guest_culture',
        text: 'What was guest culture like?',
        options: ['Respectful / professional', 'Mixed', 'Often difficult'],
      },
      {
        id: 'substance_use',
        text: 'Did coworkers or managers drink or use drugs on the job?',
        options: ['Never', 'Occasionally', 'Regularly'],
      },
      {
        id: 'cleanliness',
        text: 'How clean was the workplace?',
        options: ['Very clean', 'Mostly clean', 'Mixed', 'Often not clean'],
      },
      {
        id: 'growth',
        text: 'Were there real opportunities to grow or advance?',
        options: ['Yes', 'Somewhat', 'No', 'Not sure'],
      },
      {
        id: 'turnover',
        text: 'How would you describe staff turnover?',
        options: ['Low', 'Average', 'High', 'Not sure'],
      },
      {
        id: 'turnoverReason',
        text: 'Why do people typically leave this workplace?',
        options: ['Better opportunities elsewhere', 'Management issues', 'Pay or tip concerns', 'Scheduling or hours', 'High stress or burnout', 'Conflict with team', 'Not sure'],
        multiSelect: true,
      },
      {
        id: 'employeeTenure',
        text: 'How long do most employees tend to stay?',
        options: ['Less than 3 months', '3–6 months', '6–12 months', '1+ year', 'Not sure'],
      },
      {
        id: 'shift_meal',
        text: 'What\'s the meal policy?',
        options: ['Free shift meal', 'Discounted meal', 'Limited/conditional', 'No meal provided', 'Other'],
      },
      {
        id: 'benefits',
        text: 'Did you receive any benefits?',
        options: ['Yes', 'No', 'Not sure'],
        microcopy: 'Health insurance, 401(k), paid time off, sick leave — anything beyond your hourly rate or tips.',
      },
      {
        id: 'uniforms',
        text: 'Were uniforms or dress expectations reasonable?',
        options: ['Yes', 'Somewhat', 'No'],
      },
      {
        id: 'posSystem',
        text: 'Which POS system does this workplace use?',
        options: ['Toast', 'TouchBistro', 'Micros', 'Square', 'Clover', 'Other / Not sure'],
      },
    ],
  },
  {
    heading: 'High-Level Signal',
    questions: [
      {
        id: 'recommend',
        text: 'Would you recommend working here to someone you know?',
        options: ['Yes', 'Depends', 'No'],
      },
    ],
  },
]

const REQUIRED_ORDER = [
  'pay_consistency',
  'tip_transparency',
  'management',
  'managementUnderPressure',
  'turnover',
  'staff_culture',
  'scheduling',
  'safe_to_speak_up',
  'fair_treatment',
  'feedback_response',
]

const allSignalById = Object.fromEntries(
  signalGroups.flatMap(g => g.questions).map(q => [q.id, q])
)

export default function WriteReview() {
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [venueName, setVenueName] = useState(searchParams.get('venue') || '')
  const [answers, setAnswers] = useState({})
  const [verification, setVerification] = useState('')
  const [showAll, setShowAll] = useState(false)

  function setAnswer(id, value) {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  function toggleMultiAnswer(id, value) {
    setAnswers(prev => {
      const current = Array.isArray(prev[id]) ? prev[id] : []
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [id]: next }
    })
  }

  function nextStep() { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function prevStep() { setStep(s => Math.max(s - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className={styles.page}>
      {step <= TOTAL_STEPS && (
        <div className={styles.pageHeader}>
          <div className={styles.inner}>
            <h1 className={styles.pageTitle}>Tell other professionals what it was really like.</h1>
            <p className={styles.pageSubhead}>The real story in your words.</p>
            <p className={styles.privacyStatement}>
              <svg className={styles.privacyIcon} width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="1" y="6" width="11" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
                <path d="M4 6V4a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
              Your name never appears on your review. We don't share your details with businesses. Ever.
            </p>
          </div>
        </div>
      )}
      <div className={styles.formArea}>
        <div className={styles.inner}>
          {step > TOTAL_STEPS ? (
          <div className={styles.successState}>
            <p className={styles.successHeading}>Appreciate you. Seriously.</p>
            <p className={styles.successBody}>Your review is anonymous and may help another professional make a smart choice.</p>
            <Link
              to="/reviews"
              className={styles.successCta}
            >
              Read reviews
            </Link>
          </div>
        ) : (
          <>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>

            <p className={styles.stepLabel}>
              Step {step} of {TOTAL_STEPS} — {STEP_LABELS[step - 1]}
            </p>

            {step === 1 && (
              <>
                <fieldset className={styles.fieldset}>
                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label className={styles.label}>Workplace name</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Restaurant, bar, hotel..."
                      value={venueName}
                      onChange={e => setVenueName(e.target.value)}
                    />
                    <p className={styles.fieldHelper}>Use the name people would recognize.</p>
                  </div>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>Your role</label>
                      <div className={styles.selectWrap}>
                        <select className={styles.select} defaultValue="">
                          <option value="" disabled>Select a role…</option>
                          <option>Server</option>
                          <option>Bartender</option>
                          <option>Host</option>
                          <option>Barista</option>
                          <option>Support staff</option>
                          <option>Back of house</option>
                          <option>Manager</option>
                          <option>Hotel staff</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <p className={styles.fieldHelper}>Front-of-house roles only (for now).</p>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>How long did you work there?</label>
                      <div className={styles.selectWrap}>
                        <select className={styles.select} defaultValue="">
                          <option value="" disabled>Select…</option>
                          <option>Less than 3 months</option>
                          <option>3–6 months</option>
                          <option>6–12 months</option>
                          <option>1–2 years</option>
                          <option>2+ years</option>
                        </select>
                      </div>
                      <p className={styles.fieldHelper}>Approximate is completely fine.</p>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>When did you work there?</label>
                    <div className={styles.selectWrap}>
                      <select
                        className={styles.select}
                        value={answers.employment_period ?? ''}
                        onChange={e => setAnswer('employment_period', e.target.value)}
                      >
                        <option value="" disabled>Select…</option>
                        <option>Within the last 6 months</option>
                        <option>6 months – 1 year ago</option>
                        <option>1–2 years ago</option>
                        <option>2–5 years ago</option>
                        <option>More than 5 years ago</option>
                        <option>Still working there</option>
                      </select>
                    </div>
                    <p className={styles.fieldHelper}>This helps others know how recent your experience is.</p>
                  </div>
                </div>
              </fieldset>
              </>
            )}

            {step === 2 && (
              <>
                <p className={styles.stepHelper}>Share what you experienced and skip what doesn't apply — your story comes next.</p>

                <div className={styles.questionList}>
                  {REQUIRED_ORDER.map((id) => {
                    const q = allSignalById[id]
                    return (
                      <div key={q.id} className={styles.signalQuestion}>
                        <div className={styles.questionHeader}>
                          <span className={styles.questionText}>{q.text}</span>
                        </div>
                        {q.microcopy && <p className={styles.questionMicrocopy}>{q.microcopy}</p>}
                        <div className={styles.pillGroupWrap}>
                          {q.options.map(opt => (
                            <button
                              key={opt}
                              type="button"
                              className={`${styles.pill} ${
                                (q.multiSelect
                                  ? Array.isArray(answers[q.id]) && answers[q.id].includes(opt)
                                  : answers[q.id] === opt)
                                  ? styles.pillActive : ''
                              }`}
                              onClick={() => q.multiSelect ? toggleMultiAnswer(q.id, opt) : setAnswer(q.id, opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {signalGroups.filter(g => g.heading === 'High-Level Signal').map(hls => (
                  <div key={hls.heading} className={styles.signalGroup}>
                    <p className={styles.signalGroupHeading}>{hls.heading}</p>
                    <div className={styles.questionList}>
                      {hls.questions.map(sq => (
                        <div key={sq.id} className={styles.signalQuestion}>
                          <div className={styles.questionHeader}>
                            <span className={styles.questionText}>{sq.text}</span>
                          </div>
                          <div className={styles.pillGroupWrap}>
                            {sq.options.map(opt => (
                              <button
                                key={opt}
                                type="button"
                                className={`${styles.pill} ${answers[sq.id] === opt ? styles.pillActive : ''}`}
                                onClick={() => setAnswer(sq.id, opt)}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className={styles.disclosureToggle}>
                  <p className={styles.toggleMicrocopy}>
                    {showAll
                      ? "These help paint the full picture — answer what you can, skip what doesn't apply."
                      : "These are optional — answer what applies to your experience. The more context you share, the more useful your review may be."}
                  </p>
                  <button
                    type="button"
                    className={styles.toggleBtn}
                    onClick={() => setShowAll(s => !s)}
                  >
                    {showAll ? 'Show less' : 'Show all questions'}
                  </button>
                </div>

                {showAll && signalGroups
                  .filter(g => g.heading !== 'High-Level Signal')
                  .map(group => {
                    const optionalQs = group.questions.filter(q => !TOP_10_IDS.has(q.id))
                    if (!optionalQs.length) return null
                    return (
                      <div key={group.heading} className={styles.signalGroup}>
                        <p className={styles.signalGroupHeading}>{group.heading}</p>
                        <div className={styles.questionList}>
                          {optionalQs.map(q => (
                            <div key={q.id} className={styles.signalQuestion}>
                              <div className={styles.questionHeader}>
                                <span className={styles.questionText}>{q.text}</span>
                              </div>
                              {q.microcopy && <p className={styles.questionMicrocopy}>{q.microcopy}</p>}
                              <div className={styles.pillGroupWrap}>
                                {q.options.map(opt => (
                                  <button
                                    key={opt}
                                    type="button"
                                    className={`${styles.pill} ${
                                      (q.multiSelect
                                        ? Array.isArray(answers[q.id]) && answers[q.id].includes(opt)
                                        : answers[q.id] === opt)
                                        ? styles.pillActive : ''
                                    }`}
                                    onClick={() => q.multiSelect ? toggleMultiAnswer(q.id, opt) : setAnswer(q.id, opt)}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </>
            )}

            {step === 3 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>In Your Words</legend>
                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label className={styles.labelProminent}>What do you wish you'd known before taking this job?</label>
                    <textarea
                      className={styles.textarea}
                      rows={2}
                      placeholder="...that paychecks were sometimes late, or that the schedule could change with less than 24 hours notice."
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.labelProminent}>
                      What would you tell a friend considering this job?{' '}
                      <span className={styles.labelHint}>(optional)</span>
                    </label>
                    <textarea
                      className={styles.textarea}
                      rows={4}
                      placeholder="...that the team is genuinely great, but management turns over often — go in knowing that."
                    />
                  </div>
                </div>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Account + Identity</legend>
                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label className={styles.label}>Full name</label>
                    <input className={styles.input} type="text" placeholder="Your full name" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input className={styles.input} type="email" placeholder="you@example.com" />
                  </div>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>Create a password</label>
                      <input className={styles.input} type="password" placeholder="Enter a password" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Confirm password</label>
                      <input className={styles.input} type="password" placeholder="Re-enter your password" />
                    </div>
                  </div>
                </div>
                <div className={styles.verifySection}>
                  <label className={styles.label}>How would you like to verify your connection to this workplace?</label>
                  <div className={styles.selectWrap}>
                    <select
                      className={styles.select}
                      value={verification}
                      onChange={e => setVerification(e.target.value)}
                    >
                      <option value="" disabled>Select a method…</option>
                      <option value="w2">Upload a W2 or tax document</option>
                      <option value="proof">Upload proof of employment</option>
                      <option value="paystub">Link to schedule or paystub</option>
                      <option value="email">Verify via email domain</option>
                      <option value="profile">Link a public profile</option>
                    </select>
                  </div>
                  {verification && (
                    <p className={styles.verifyConfirm}>
                      Perfect — trust is what makes this work, and you just added to it.
                    </p>
                  )}
                  <div className={styles.anonBlock}>
                    <p className={styles.anonNote}>A few minutes from now, someone looking at this place for the first time will read what you wrote.</p>
                  </div>
                </div>
              </fieldset>
            )}

            <div className={styles.navRow}>
              {step > 1 && (
                <button type="button" className={styles.navBtnBack} onClick={prevStep}>
                  Back
                </button>
              )}
              <div className={styles.navSpacer} />
              {step < TOTAL_STEPS ? (
                <button type="button" className={styles.submitBtn} onClick={nextStep}>
                  Continue
                </button>
              ) : (
                <button type="button" className={styles.submitBtn} onClick={nextStep}>
                  Submit Review
                </button>
              )}
            </div>

          </form>
          </>
        )}
        </div>
      </div>
    </div>
  )
}
