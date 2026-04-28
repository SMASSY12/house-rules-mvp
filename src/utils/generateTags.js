// Maps every form answer key → { label, type, priority } by category.
// Categories deduplicate overlapping questions (e.g. two management-under-pressure keys).
// Priority drives primary vs context split: higher = shown first.

const MAPPINGS = [
  {
    key: 'pay_consistency',
    category: 'pay',
    map: {
      'Always on time':  { label: 'Pay: On time',         type: 'positive', priority: 3 },
      'Usually on time': { label: 'Pay: Usually on time', type: 'positive', priority: 2 },
      'Sometimes late':  { label: 'Pay: Sometimes late',  type: 'negative', priority: 8 },
      'Often late':      { label: 'Pay: Often late',      type: 'negative', priority: 10 },
    },
  },
  {
    key: 'tip_transparency',
    category: 'tips',
    map: {
      'Very clear':    { label: 'Tip transparency: High',         type: 'positive', priority: 3 },
      'Mostly clear':  { label: 'Tip transparency: Mostly clear', type: 'positive', priority: 2 },
      'Mixed':         { label: 'Tip transparency: Mixed',        type: 'neutral',  priority: 4 },
      'Often unclear': { label: 'Tip transparency: Often unclear',type: 'negative', priority: 8 },
    },
  },
  {
    key: 'benefits',
    category: 'benefits',
    map: {
      'Yes': { label: 'Benefits offered', type: 'positive', priority: 2 },
      'No':  { label: 'No benefits',      type: 'negative', priority: 4 },
    },
  },
  {
    key: 'shift_fairness',
    category: 'shift_assignment',
    map: {
      'Very fair':    { label: 'Shift assignments: Fair',         type: 'positive', priority: 2 },
      'Mostly fair':  { label: 'Shift assignments: Mostly fair',  type: 'positive', priority: 1 },
      'Mixed':        { label: 'Shift assignments: Mixed',        type: 'neutral',  priority: 3 },
      'Often unfair': { label: 'Shift assignments: Often unfair', type: 'negative', priority: 7 },
    },
  },
  {
    key: 'management',
    category: 'management',
    map: {
      'Supportive':   { label: 'Management: Supportive',   type: 'positive', priority: 4 },
      'Mixed':        { label: 'Management: Mixed',        type: 'neutral',  priority: 3 },
      'Disorganized': { label: 'Management: Disorganized', type: 'negative', priority: 7 },
      'Toxic':        { label: 'Management: Toxic',        type: 'negative', priority: 10 },
    },
  },
  {
    key: 'recognition',
    category: 'recognition',
    map: {
      'Regularly':    { label: 'Recognition: Regular',    type: 'positive', priority: 2 },
      'Occasionally': { label: 'Recognition: Occasional', type: 'neutral',  priority: 1 },
      'Rarely':       { label: 'Recognition: Rare',       type: 'negative', priority: 4 },
      'Never':        { label: 'Recognition: None',       type: 'negative', priority: 5 },
    },
  },
  {
    key: 'feedback_response',
    category: 'feedback',
    map: {
      'Took it seriously and acted on it':          { label: 'Feedback: Acted on',                type: 'positive', priority: 3 },
      "Listened, but didn't always follow through": { label: 'Feedback: Limited follow-through',  type: 'neutral',  priority: 3 },
      'Often dismissed or ignored it':              { label: 'Feedback: Often dismissed',         type: 'negative', priority: 8 },
      'Discouraged or punished speaking up':        { label: 'Feedback: Speaking up discouraged', type: 'negative', priority: 10 },
    },
  },
  // Two keys share the management_pressure category; highest priority wins per review.
  {
    key: 'management_stress',
    category: 'management_pressure',
    map: {
      'Calm and supportive': { label: 'Under pressure: Calm',          type: 'positive', priority: 3 },
      'Mixed':               { label: 'Under pressure: Mixed',         type: 'neutral',  priority: 2 },
      'Disorganized':        { label: 'Under pressure: Disorganized',  type: 'negative', priority: 6 },
      'Blamed staff':        { label: 'Under pressure: Blames staff',  type: 'negative', priority: 9 },
    },
  },
  {
    key: 'managementUnderPressure',
    category: 'management_pressure',
    map: {
      'Supportive and present': { label: 'Under pressure: Supportive',    type: 'positive', priority: 3 },
      'Steps in when needed':   { label: 'Under pressure: Responsive',    type: 'positive', priority: 2 },
      'Visible but reactive':   { label: 'Under pressure: Reactive',      type: 'neutral',  priority: 3 },
      'Distant or unavailable': { label: 'Under pressure: Distant',       type: 'negative', priority: 6 },
      'Adds pressure or blame': { label: 'Under pressure: Adds pressure', type: 'negative', priority: 9 },
    },
  },
  {
    key: 'off_clock',
    category: 'off_clock',
    map: {
      'Never':     { label: 'Off-clock work: None',      type: 'positive', priority: 2 },
      'Rarely':    { label: 'Off-clock work: Rare',      type: 'neutral',  priority: 1 },
      'Sometimes': { label: 'Off-clock work: Sometimes', type: 'negative', priority: 6 },
      'Often':     { label: 'Off-clock work: Common',    type: 'negative', priority: 9 },
    },
  },
  {
    key: 'scheduling',
    category: 'scheduling',
    map: {
      'Consistent':            { label: 'Scheduling: Consistent',         type: 'positive', priority: 3 },
      'Somewhat predictable':  { label: 'Scheduling: Mostly predictable', type: 'positive', priority: 2 },
      'Often changed':         { label: 'Scheduling: Often changed',      type: 'negative', priority: 6 },
      'Last-minute / chaotic': { label: 'Scheduling: Last-minute',        type: 'negative', priority: 8 },
    },
  },
  {
    key: 'training',
    category: 'training',
    map: {
      'Very well':        { label: 'Training: Strong',   type: 'positive', priority: 2 },
      'Adequately':       { label: 'Training: Adequate', type: 'positive', priority: 1 },
      'Minimal training': { label: 'Training: Minimal',  type: 'negative', priority: 5 },
      'Thrown in':        { label: 'Training: None',     type: 'negative', priority: 7 },
    },
  },
  {
    key: 'growth',
    category: 'growth',
    map: {
      'Yes':      { label: 'Growth: Opportunities available', type: 'positive', priority: 2 },
      'Somewhat': { label: 'Growth: Limited',                 type: 'neutral',  priority: 2 },
      'No':       { label: 'Growth: None',                    type: 'negative', priority: 4 },
    },
  },
  {
    key: 'cleanliness',
    category: 'cleanliness',
    map: {
      'Very clean':      { label: 'Cleanliness: High',         type: 'positive', priority: 2 },
      'Mostly clean':    { label: 'Cleanliness: Good',         type: 'positive', priority: 1 },
      'Mixed':           { label: 'Cleanliness: Inconsistent', type: 'neutral',  priority: 3 },
      'Often not clean': { label: 'Cleanliness: Poor',         type: 'negative', priority: 7 },
    },
  },
  {
    key: 'safety',
    category: 'safety',
    map: {
      'Always':    { label: 'Safety: Consistently safe', type: 'positive', priority: 3 },
      'Usually':   { label: 'Safety: Generally safe',    type: 'positive', priority: 2 },
      'Sometimes': { label: 'Safety: Inconsistent',      type: 'negative', priority: 7 },
      'Often not': { label: 'Safety: Often unsafe',      type: 'negative', priority: 10 },
    },
  },
  {
    key: 'shift_meal',
    category: 'shift_meal',
    map: {
      'Always':    { label: 'Shift meal: Always provided', type: 'positive', priority: 2 },
      'Sometimes': { label: 'Shift meal: Sometimes',       type: 'neutral',  priority: 1 },
      'Rarely':    { label: 'Shift meal: Rarely',          type: 'neutral',  priority: 1 },
      'Never':     { label: 'Shift meal: Not provided',    type: 'negative', priority: 3 },
    },
  },
  {
    key: 'guest_culture',
    category: 'guest_culture',
    map: {
      'Respectful / professional': { label: 'Guest culture: Respectful', type: 'positive', priority: 2 },
      'Mixed':                     { label: 'Guest culture: Mixed',      type: 'neutral',  priority: 2 },
      'Often difficult':           { label: 'Guest culture: Difficult',  type: 'negative', priority: 5 },
    },
  },
  {
    key: 'substance_use',
    category: 'substance',
    map: {
      'Occasionally': { label: 'Substance use: Observed', type: 'neutral',  priority: 3 },
      'Regularly':    { label: 'Substance use: Frequent', type: 'negative', priority: 7 },
    },
  },
  // Two keys share the team category; highest priority wins.
  {
    key: 'team_support',
    category: 'team',
    map: {
      'Very supportive':       { label: 'Team: Very supportive', type: 'positive', priority: 3 },
      'Mixed':                 { label: 'Team: Mixed',           type: 'neutral',  priority: 2 },
      'Competitive or divided':{ label: 'Team: Divided',         type: 'negative', priority: 5 },
    },
  },
  {
    key: 'teamEnvironment',
    category: 'team',
    map: {
      'Collaborative and supportive': { label: 'Team: Collaborative', type: 'positive', priority: 3 },
      'Mostly positive':              { label: 'Team: Positive',       type: 'positive', priority: 2 },
      'Mixed depending on shift':     { label: 'Team: Inconsistent',   type: 'neutral',  priority: 2 },
      'Tense or cliquey':             { label: 'Team: Tense',          type: 'negative', priority: 6 },
      'Competitive or toxic':         { label: 'Team: Toxic',          type: 'negative', priority: 8 },
    },
  },
  {
    key: 'turnover',
    category: 'turnover',
    map: {
      'Low':     { label: 'Turnover: Low',     type: 'positive', priority: 3 },
      'Average': { label: 'Turnover: Average', type: 'neutral',  priority: 2 },
      'High':    { label: 'Turnover: High',    type: 'negative', priority: 8 },
    },
  },
  {
    key: 'employeeTenure',
    category: 'tenure',
    map: {
      'Less than 3 months': { label: 'Tenure: Under 3 months', type: 'negative', priority: 7 },
      '3–6 months':         { label: 'Tenure: 3–6 months',     type: 'neutral',  priority: 3 },
      '6–12 months':        { label: 'Tenure: 6–12 months',    type: 'neutral',  priority: 2 },
      '1+ year':            { label: 'Tenure: 1+ year',        type: 'positive', priority: 3 },
    },
  },
  // Two keys share turnover_reason; highest priority wins.
  {
    key: 'turnoverReason',
    category: 'turnover_reason',
    map: {
      'Better opportunities elsewhere': { label: 'Turnover reason: Better opportunities', type: 'neutral',  priority: 2 },
      'Management issues':              { label: 'Turnover reason: Management',            type: 'negative', priority: 7 },
      'Pay or tip concerns':            { label: 'Turnover reason: Pay concerns',          type: 'negative', priority: 7 },
      'Scheduling or hours':            { label: 'Turnover reason: Scheduling',            type: 'negative', priority: 5 },
      'High stress or burnout':         { label: 'Turnover reason: Burnout',               type: 'negative', priority: 6 },
      'Conflict with team':             { label: 'Turnover reason: Team conflict',         type: 'negative', priority: 6 },
    },
  },
  {
    key: 'why_leave',
    category: 'turnover_reason',
    map: {
      'Better opportunity':  { label: 'Turnover reason: Better opportunities', type: 'neutral',  priority: 2 },
      'Burnout':             { label: 'Turnover reason: Burnout',               type: 'negative', priority: 6 },
      'Management issues':   { label: 'Turnover reason: Management',            type: 'negative', priority: 7 },
      'Pay or tip issues':   { label: 'Turnover reason: Pay concerns',          type: 'negative', priority: 7 },
      'Scheduling':          { label: 'Turnover reason: Scheduling',            type: 'negative', priority: 5 },
    },
  },
  {
    key: 'posSystem',
    category: 'pos',
    alwaysContext: true,
    map: {
      'Toast':       { label: 'POS: Toast',       type: 'neutral', priority: 0 },
      'TouchBistro': { label: 'POS: TouchBistro', type: 'neutral', priority: 0 },
      'Micros':      { label: 'POS: Micros',      type: 'neutral', priority: 0 },
      'Square':      { label: 'POS: Square',      type: 'neutral', priority: 0 },
      'Clover':      { label: 'POS: Clover',      type: 'neutral', priority: 0 },
    },
  },
  {
    key: 'timeOffProcess',
    category: 'time_off',
    map: {
      'Easy to request and approve':              { label: 'Time off: Easy',             type: 'positive', priority: 2 },
      'Request in advance (generally respected)': { label: 'Time off: Advance notice',   type: 'positive', priority: 1 },
      'Must find shift coverage':                 { label: 'Time off: Must find coverage',type: 'negative', priority: 5 },
      'Difficult to get approved':                { label: 'Time off: Hard to approve',  type: 'negative', priority: 6 },
    },
  },
  {
    key: 'offDayCommunication',
    category: 'off_day',
    map: {
      'No, never expected':         { label: 'Off-day contact: None',           type: 'positive', priority: 2 },
      'Occasionally':               { label: 'Off-day contact: Occasional',     type: 'neutral',  priority: 2 },
      'Often expected':             { label: 'Off-day contact: Often expected', type: 'negative', priority: 6 },
      'Yes, consistently expected': { label: 'Off-day contact: Always expected',type: 'negative', priority: 8 },
    },
  },
  {
    key: 'sideWorkLoad',
    category: 'side_work',
    map: {
      'Minimal':                 { label: 'Side work: Minimal',   type: 'positive', priority: 2 },
      'Moderate and fair':       { label: 'Side work: Fair',      type: 'positive', priority: 1 },
      'Depends on section/shift':{ label: 'Side work: Variable',  type: 'neutral',  priority: 2 },
      'Heavy workload':          { label: 'Side work: Heavy',     type: 'negative', priority: 5 },
      'Excessive':               { label: 'Side work: Excessive', type: 'negative', priority: 7 },
    },
  },
  {
    key: 'recommend',
    category: 'recommend',
    map: {
      'Yes':     { label: 'Recommended',        type: 'positive', priority: 4 },
      'Depends': { label: 'Recommend: Depends', type: 'neutral',  priority: 3 },
      'No':      { label: 'Not recommended',    type: 'negative', priority: 9 },
    },
  },
]

/**
 * Converts a completed `answers` object into structured tags for display on a review card.
 *
 * @param {Record<string, string>} answers - The answers state object from WriteReview
 * @returns {{ primaryTags: Array<{label: string, type: string}>, contextTags: Array<{label: string, type: string}> }}
 */
export function generateTags(answers) {
  const contextTags = []
  const candidatesByCategory = {}

  for (const mapping of MAPPINGS) {
    const value = answers[mapping.key]
    if (!value) continue
    const tag = mapping.map[value]
    if (!tag) continue

    if (mapping.alwaysContext) {
      contextTags.push({ label: tag.label, type: tag.type })
      continue
    }

    const existing = candidatesByCategory[mapping.category]
    if (!existing || tag.priority > existing.priority) {
      candidatesByCategory[mapping.category] = { ...tag, _category: mapping.category }
    }
  }

  const primaryTags = Object.values(candidatesByCategory)
    .sort((a, b) => b.priority - a.priority)
    .map(({ label, type }) => ({ label, type }))

  return { primaryTags, contextTags }
}
