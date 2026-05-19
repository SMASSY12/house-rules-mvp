import { useState } from 'react'
import styles from './WriteReview.module.css'

const TOTAL_STEPS = 4
const STEP_LABELS = ['The Workplace', 'Core Signals', 'In Your Words', 'Account + Identity']

const signalGroups = [
  {
    heading: 'Pay & Transparency',

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
        id: 'benefits',
        text: 'Did you receive any benefits?',
        options: ['Yes', 'No', 'Not sure'],
      },
    ],
  },
  {
    heading: 'Management & Fairness',

    questions: [
      {
        id: 'shift_fairness',
        text: 'How fair were shift or section assignments?',
        options: ['Very fair', 'Mostly fair', 'Mixed', 'Often unfair'],
      },
      {
        id: 'management',
        text: 'How would you describe management overall?',
        options: ['Supportive', 'Mixed', 'Disorganized', 'Toxic'],
      },
      {
        id: 'recognition',
        text: 'How often were you recognized or appreciated for your work?',
        options: ['Regularly', 'Occasionally', 'Rarely', 'Never'],
        tag: 'Recognition',
        tooltip: 'Includes feedback, acknowledgment, or small gestures from management or coworkers.',
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
    ],
  },
  {
    heading: 'Work Expectations',
    questions: [
      {
        id: 'off_clock',
        text: 'Were there times people worked without being paid?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often'],
      },
      {
        id: 'scheduling',
        text: 'How would you describe scheduling?',
        options: ['Consistent', 'Somewhat predictable', 'Often changed', 'Last-minute / chaotic'],
      },
      {
        id: 'training',
        text: 'How well were you trained for your role?',
        options: ['Very well', 'Adequately', 'Minimal training', 'Thrown in'],
      },
      {
        id: 'growth',
        text: 'Were there real opportunities to grow or advance?',
        options: ['Yes', 'Somewhat', 'No', 'Not sure'],
      },
    ],
  },
  {
    heading: 'Work Environment',
    questions: [
      {
        id: 'cleanliness',
        text: 'How clean was the workplace?',
        options: ['Very clean', 'Mostly clean', 'Mixed', 'Often not clean'],
      },
    ],
  },
  {
    heading: 'Operations',
    questions: [
      {
        id: 'shift_meal',
        text: 'What\'s the meal policy?',
        options: ['Free shift meal', 'Discounted meal', 'Limited/conditional', 'No meal provided', 'Other'],
      },
      {
        id: 'uniforms',
        text: 'Were uniforms or dress expectations reasonable?',
        options: ['Yes', 'Somewhat', 'No'],
      },
    ],
  },
  {
    heading: 'Culture',

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
        id: 'turnover',
        text: 'How would you describe staff turnover?',
        options: ['Low', 'Average', 'High', 'Not sure'],
      },
    ],
  },
  {
    heading: 'Workplace Reality',
    questions: [
      {
        id: 'turnoverReason',
        text: 'Why do people typically leave this workplace?',
        options: ['Better opportunities elsewhere', 'Management issues', 'Pay or tip concerns', 'Scheduling or hours', 'High stress or burnout', 'Conflict with team', 'Not sure'],
      },
      {
        id: 'employeeTenure',
        text: 'How long do most employees tend to stay?',
        options: ['Less than 3 months', '3–6 months', '6–12 months', '1+ year', 'Not sure'],
      },
      {
        id: 'managementUnderPressure',
        text: 'How does management typically behave during busy or high-stress shifts?',
        options: ['Supportive and present', 'Steps in when needed', 'Visible but reactive', 'Distant or unavailable', 'Adds pressure or blame'],
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
        id: 'teamEnvironment',
        text: 'How would you describe the overall team environment?',
        options: ['Collaborative and supportive', 'Mostly positive', 'Mixed depending on shift', 'Tense or cliquey', 'Competitive or toxic'],
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
    ],
  },
  {
    heading: 'Operations & Expectations',
    questions: [
      {
        id: 'posSystem',
        text: 'Which POS system does this workplace use?',
        options: ['Toast', 'TouchBistro', 'Micros', 'Square', 'Clover', 'Other / Not sure'],
      },
      {
        id: 'timeOffProcess',
        text: 'How is time off typically handled?',
        options: ['Easy to request and approve', 'Request in advance (generally respected)', 'Must find shift coverage', 'Difficult to get approved', 'Not sure'],
      },
      {
        id: 'offDayCommunication',
        text: 'Are you expected to respond to work messages on your time off?',
        options: ['No, never expected', 'Occasionally', 'Often expected', 'Yes, consistently expected'],
        microcopy: 'This is about contact outside work hours — calls, texts, and expectations to be available when you\'re not on the clock.',
      },
      {
        id: 'sideWorkLoad',
        text: 'How would you describe side work expectations?',
        options: ['Minimal', 'Moderate and fair', 'Depends on section/shift', 'Heavy workload', 'Excessive'],
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

export default function WriteReview() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [verification, setVerification] = useState('')

  function setAnswer(id, value) {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  function nextStep() { setStep(s => s + 1) }
  function prevStep() { setStep(s => Math.max(s - 1, 1)) }

  return (
    <section id="write" className={styles.section}>
      <div className={styles.inner}>
        {step > TOTAL_STEPS ? (
          <div className={styles.successState}>
            <p className={styles.successHeading}>Appreciate you. Seriously.</p>
            <p className={styles.successBody}>You just made this easier for someone else to make the right call.</p>
          </div>
        ) : (
          <>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Share your experience</p>
            <h2 className={styles.title}>Tell people what it was really like.</h2>
            <p className={styles.subtitle}>
              Your words. Your voice. The real story others need to hear.
            </p>
          </div>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>

            <p className={styles.stepLabel}>
              Step {step} of {TOTAL_STEPS} — {STEP_LABELS[step - 1]}
            </p>

            {step === 1 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>The Workplace</legend>
                <p className={styles.stepPurpose}>Help someone understand what it's really like before they take the job.</p>
                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label className={styles.label}>Workplace name</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Restaurant, bar, hotel..."
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
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <>
                <p className={styles.stepHelper}>Answer based on your experience — there's no right or wrong here.</p>
                {signalGroups.map(group => (
                  <div key={group.heading} className={styles.signalGroup}>
                    <p className={styles.signalGroupHeading}>{group.heading}</p>
                    {group.hint && <p className={styles.groupHint}>{group.hint}</p>}
                    <div className={styles.questionList}>
                      {group.questions.map(q => (
                        <div key={q.id} className={styles.signalQuestion}>
                          <div className={styles.questionHeader}>
                            <span className={styles.questionText}>{q.text}</span>
                            {q.tooltip && (
                              <span className={styles.tooltipWrap} aria-label={q.tooltip}>
                                <span className={styles.tooltipIcon}>?</span>
                                <span className={styles.tooltipBody}>{q.tooltip}</span>
                              </span>
                            )}
                          </div>
                          {q.microcopy && <p className={styles.questionMicrocopy}>{q.microcopy}</p>}
                          <div className={styles.pillGroupWrap}>
                            {q.options.map(opt => (
                              <button
                                key={opt}
                                type="button"
                                className={`${styles.pill} ${answers[q.id] === opt ? styles.pillActive : ''}`}
                                onClick={() => setAnswer(q.id, opt)}
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
              </>
            )}

            {step === 3 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>In Your Words</legend>
                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label className={styles.labelProminent}>What do you wish you knew before taking this job?</label>
                    <textarea
                      className={styles.textarea}
                      rows={2}
                      placeholder="Your honest answer..."
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
                      placeholder="Say it like you would to a friend..."
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
                  <p className={styles.verifyHelper}>
                    Helps keep reviews credible and protects workers from fake submissions.
                  </p>
                  <div className={styles.selectWrap}>
                    <select
                      className={styles.select}
                      value={verification}
                      onChange={e => setVerification(e.target.value)}
                    >
                      <option value="" disabled>Select a method…</option>
                      <option value="proof">Upload proof of employment</option>
                      <option value="paystub">Link to schedule or paystub</option>
                      <option value="email">Verify via email domain</option>
                      <option value="profile">Link a public profile</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {verification && (
                    <p className={styles.verifyConfirm}>
                      Thanks — this helps increase trust in your review.
                    </p>
                  )}
                </div>
              </fieldset>
            )}

            {step === TOTAL_STEPS && (
              <div className={styles.anonBlock}>
                <p className={styles.anonNote}>Your identity stays private. Your review will be published anonymously.</p>
                <p className={styles.anonSubnote}>Name, email, password, and verification details are never shown publicly or shared with your employer.</p>
                <p className={styles.anonSubnote}>You're helping someone avoid a bad situation — or find a good one.</p>
              </div>
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
    </section>
  )
}
