import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    title: 'Search before you commit',
    body: 'Find any restaurant, bar, or hotel by name. See real signals on pay, culture, management, and safety before you apply or accept.',
  },
  {
    number: '02',
    title: 'Read structured signals',
    body: 'Every review captures what job posts skip: pay reliability, scheduling, management behavior, team culture, and more — reported by people who did the job.',
  },
  {
    number: '03',
    title: 'Leave a review',
    body: "Worked somewhere? Leave a review and help the next worker understand what they're walking into. It takes a few minutes.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>What makes House Rules different</h2>
          <p className={styles.subtitle}>
            We turn real experiences into structured signals you can actually use.
          </p>
        </div>
        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          ))}
        </div>
        <div className={styles.signalsPreview}>
          <p className={styles.signalsLabel}>Signals tracked across every review</p>
          <div className={styles.signalList}>
            {[
              'Pay Reliability',
              'Tip Transparency',
              'Benefits',
              'Shift Meal',
              'Scheduling',
              'Off-the-clock Expectations',
              'Training',
              'Uniforms',
              'Cleanliness',
              'Safety',
              'Management',
              'Shift Fairness',
              'Feedback Response',
              'Guest Culture',
              'Turnover',
              'Management on Bad Nights',
              'Voice Safety',
              'Team Support',
              'Growth Opportunities',
              'Why People Leave',
            ].map((s) => (
              <span key={s} className={styles.signalChip}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
