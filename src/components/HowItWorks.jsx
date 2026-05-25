import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    title: 'Find the place',
    body: "Search any bar, restaurant, or café by name or neighbourhood. See who's reviewed it and what role they held.",
  },
  {
    number: '02',
    title: 'Read what the job post left out',
    body: 'Every review includes structured signals — verified answers on pay reliability, tip transparency, management behavior, scheduling, and more. Not vibes. Data.',
  },
  {
    number: '03',
    title: 'Give the next person a head start',
    body: 'Worked somewhere? Leave a review. It takes a few minutes, stays completely anonymous, and helps the next professional find the right fit.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>What makes House Rules different</h2>
          <p className={styles.subtitle}>
            We turn real experiences into structured signals you can use.
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
          <p className={styles.signalsLabel}>Inside every review</p>
          <div className={styles.signalList}>
            {[
              'Pay consistency',
              'Tip transparency',
              'Management overall',
              'Management under pressure',
              'Turnover',
              'Staff culture',
              'Scheduling',
              'Safe to speak up',
              'Fair treatment',
              'Feedback response',
            ].map((s) => (
              <span key={s} className={styles.signalChip}>{s}</span>
            ))}
          </div>
          <p className={styles.signalsMore}>
            Plus 17 more signals across every review — from shift meals to BOH/FOH dynamics.
          </p>
        </div>
      </div>
    </section>
  )
}
