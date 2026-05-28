# House Rules — V2 Product Requirements Document

**Version:** 2.0
**Date:** May 2026
**Author:** Shane Massey
**Build context:** Vite + React + Tailwind + Framer Motion — Claude Code in VS Code, solo build
**Status:** In progress

---

## How to read this document

Every spec item follows the same four-line format:

```
What:        Clear description of the change
Why:         Research source — traceable to evidence
Acceptance:  How you know it's done — testable condition
Copy ref:    Voice & Tone Guide section, or specific wording
```

Priority labels: **[QW]** = Quick Win | **[MP]** = Major Project | **[FIX]** = Bug fix | **[NEW]** = New feature | **[COPY]** = Copy/label change only

---

## Section 1 — Overview

### What House Rules is

House Rules is a hospitality-professional-first employer review platform. Hospitality professionals read and write verified, anonymous reviews structured around "signals" — specific, categorized data points about pay, management, culture, and scheduling reported by people who actually did the job. Built from lived experience, not a boardroom.

**Founding hypothesis:** "There is nothing like this out there — nothing to hold management and owners accountable and give hospitality professionals a real voice."

### What V2 is

V2 is a research-backed iteration. Every change in this document traces to evidence from Round 1 usability research or conversation mining. No features were added speculatively.

The single exception is the map feature — which was present in the original IA sketches before research began, and was independently validated by multiple Round 1 participants. It is included in V2 as a research-confirmed addition, not an assumption.

### Research sources

| Source | Date | Details |
|---|---|---|
| Usability session — Tyler | May 4, 2026 | 9 yrs, F&B manager, both perspectives |
| Usability session — Benjamen | May 4, 2026 | 20+ yrs, bartender/catering, hospitality professional |
| Usability session — Sharon | May 4, 2026 | 1 yr, front desk, manager-adjacent |
| Usability session — Bettina | May 7, 2026 | 33+ yrs, server/bartender, hospitality professional |
| FB thread — WA State Bartender's Community | April 2026 | 37 comments, anonymous post by founder |
| Survey | May 2026 | 3 responses — directional only, not statistically significant |

**10 research themes identified.** Critical: T1 (signal comprehension), T2 (view all signals discoverability). High: T3 (missing signals), T4 (review card layout), T5 (verification friction). Medium: T6 (form UX), T7 (search), T8 (navigation). Strategic: T9 (dual-use/B2B). Validation: T10 (core value proposition — 4/4 confirmed).

---

## Section 2 — Scope

### In V2

- All Quick Win items from the impact/effort matrix
- Selected Major Projects: venue tabbed card, map feature, signal visual display
- Signal taxonomy: renames, additions, tiered model, display order
- IA: Reviews page separation, two-page venue structure
- Review form: new signals, microcopy, form ordering, account creation flow
- Copy: all flagged microcopy fixes and label updates throughout

### Out of V2 — parked for V3

| Item | Reason |
|---|---|
| Compare venues mode | Avoid quadrant — high effort, low validated demand |
| Manager self-audit / B2B mode | Strategic, needs dedicated research round |
| Gamification / referral system | Interesting (Bettina), untested — backlog |
| Exit survey on confirmation | Low priority — deprioritised in backlog |
| Continue browsing CTA on confirmation | Skipped — revisit post-launch |

---

## Section 3 — Information Architecture changes

### 3.1 Navigation restructure

**[MP]**
```
What:        Move the Reviews page out of the homepage and into the main navigation
             as a standalone page. Homepage retains: hero, how it works, value
             proposition, signal explainer, and primary CTAs.
Why:         Homepage was overloaded. Separating discovery from introduction
             creates a cleaner first impression and a more intentional user flow.
             Supports two-page review structure (see 3.2).
Acceptance:  Nav includes Reviews as a distinct link. Homepage contains no inline
             review cards. Reviews page is reachable from nav from any page.
Copy ref:    CTA on homepage: "See what hospitality professionals are saying" → links to Reviews page.
             Nav label: "Reviews" (sentence case, no icon required at this stage).
```

### 3.2 Two-page review structure

**[MP]**
```
What:        Reviews now lives across two pages:
             Page 1 — Reviews discovery: search, map toggle, filters, compact
             venue cards.
             Page 2 — Venue detail: tabbed card (Their words / Signals /
             Track record) + expandable review list below the card.
Why:         T4 (review card layout — 3/4 participants). Tyler and Bettina both
             experienced information overload with the single-page pattern.
             Tyler: "From a drink ticket for a thousand people." Separating
             discovery from detail reduces cognitive load at each stage.
Acceptance:  Clicking a venue card on the Reviews page navigates to a dedicated
             venue detail page. Browser back returns to Reviews page with
             scroll position preserved.
Copy ref:    V&T Guide — Specific beats vague. Venue page title = venue name
             + neighbourhood (e.g. "The Larder Bar & Kitchen — Capitol Hill").
```

### 3.3 Tabbed venue card

**[MP]**
```
What:        Individual venue reviews display in a three-tab card structure.
             Tab 1: Their words
             Tab 2: Signals
             Tab 3: Track record
Why:         T4 (3/4). Tyler: sensory overload with all signals expanding at once.
             Bettina: wanted grid layout for signals. Benjamen: wanted aggregate
             score. Tyler: explicitly praised in-page expansion.
             Tabbed structure solves all four findings in one pattern.
Acceptance:  All three tabs render correctly. Default tab on load = Their words.
             Tab switching requires no page navigation. Active tab state is
             visually distinct. Tab bar is accessible by keyboard.
Copy ref:    Tab labels: "Their words" / "Signals" / "Track record" — sentence
             case, no icons required. "Their words" mirrors "Your words. Your
             voice." from the review form. See V&T Guide — consistency.
```

**Their words tab content order:**
1. What they wish they'd known *(required field — matches review form step 3)*
2. What they'd tell a friend *(optional field — matches review form step 3)*

Note: pull quote and green/red flag components removed from this tab — too much noise. Content fields only.

**Signals tab content order:**
- Positive signals (score ≥ 3.5) — green
- Neutral signals (score 2.5–3.4) — default text colour
- Areas of concern (score < 2.5) — red
- Each signal: name / score / bar / reviewer's note if provided

**Track record tab content:**
- Stat row: [review count — linked, see 6.2] / [overall score] / [% would recommend]
- Aggregate signal bars — all reviews, ordered best to worst
- Same green/neutral/red colour logic as Signals tab

---

## Section 4 — Signal taxonomy

### 4.1 Signal renames

**[COPY] Rename: "Management on Bad Nights" → split into two signals**
```
What:        "Management on Bad Nights" is retired. The existing question
             "How would you describe management overall?" becomes signal:
             "Management overall."
             The existing question "How does management typically behave
             during busy or high-stress shifts?" becomes signal:
             "Management under pressure."
             Both signals sit adjacent to each other under "The people"
             section of the form.
Why:         T1/T4. Benjamen: "the phrasing is clunky — it's definitely
             something a person should know about." He also said: "if you're
             going to keep it as two different tags, boot management next to
             management on bad nights so you can keep both signals."
             Tyler: "unique category — I don't think it's covered anywhere."
             Bettina: "a little bit confusing but funny."
             "Management under pressure" preserves the specificity of the
             original — Joshua Radigan independently named "how management
             behaves on the worst nights" as one of three core signals.
             Splitting is better than collapsing: "Management overall" and
             "Management under pressure" measure different things.
Acceptance:  "Management on Bad Nights" appears nowhere in the product.
             "Management overall" and "Management under pressure" both appear
             on review form, venue Signals tab, and Track record aggregate.
             The two signals render adjacent in the form and on display
             surfaces.
Copy ref:    V&T Guide — Specific beats vague. Both names pass the bartender
             test immediately. No explanation required.
```

**[COPY] Rename: "Voice Safety" → "Safe to speak up"**
```
What:        "Voice Safety" is retired. Replaced with a new signal:
             "Safe to speak up."
             Question: "Did you feel comfortable raising concerns or giving
             feedback here?"
             This is Signal A of the original Voice Safety split.
Why:         T1 — 3/4 no comprehension on "Voice Safety." Confirmed by
             Tyler: "I don't really understand what voice safety would be."
             Benjamen: "I don't know what voice safety means."
             Bettina: "Not sure what that means."
             "Safe to speak up" passes the bartender test immediately.
Acceptance:  "Voice Safety" appears nowhere in the product. "Safe to speak
             up" appears on review form and all venue display surfaces.
             Comprehension to be tested in Round 2.
Copy ref:    V&T Guide — Silent confidence. The label doesn't explain itself.
```

**[COPY] "Feedback response" — clarify scope with microcopy**
```
What:        Retain "Feedback response." Update question to: "How did
             management typically respond to feedback or concerns?"
             Add microcopy below the label: "Safe to speak up is about
             how you felt. This is about what happened when you did."
Why:         T1. Two signals, two sides of the same dynamic: the professional's
             experience (Safe to speak up) vs. management's action
             (Feedback response). Without distinction, they blur.
Acceptance:  Microcopy renders directly below the question label.
             Both signals are distinguishable without re-reading.
Copy ref:    V&T Guide — Anticipate the next question. Rule 8.
```

**[COPY] Rename: "Substance use during shifts" → "Alcohol & drug use during shifts"**
```
What:        Rename both the signal label and the review form question.
             Signal label: "Alcohol & drug use"
             Question: "Did you observe alcohol or drug use during shifts?"
             Answer options unchanged: Never / Occasionally / Regularly
Why:         Benjamen: "that could be any type of substance — somebody might
             be smoking and some Puritan might be like, oh, are you smoking
             constantly?" The rename removes ambiguity and names the problem
             directly. In hospitality, drug and alcohol misuse during shifts
             is a real and documented issue — the copy should reflect that.
Acceptance:  "Substance use" or "substance" appears nowhere in signal labels
             or form questions. "Alcohol & drug use" and "alcohol or drug use"
             are used consistently across all surfaces.
Copy ref:    V&T Guide — Name the problem. Don't pussyfoot. Specific beats
             vague every time.
```

**[COPY] Rename: "Off the clock expectations" → keep name, add microcopy**
```
What:        Keep the signal name. Add clarifying microcopy directly below
             the label: "This is about contact outside work hours — calls,
             texts, and expectations to be available when you're not on the
             clock. Not about alcohol or drug policies."
Why:         T1 — 2/4 misread this as a drinking/substance policy. The name
             is not the problem — the absence of context is.
Acceptance:  Microcopy renders directly below signal label on review form.
             No participant in Round 2 misreads this as a substance question.
Copy ref:    V&T Guide — Anticipate the next question. Rule 8.
```

---

### 4.2 Signal additions

**[NEW] Add: "Staff culture"**
```
What:        New signal. Question: "How would you describe the culture
             among staff here?"
Why:         T3 — named independently by Benjamen AND Bettina using identical
             phrase "staff culture" without prompting. Strongest emergent finding
             in Round 1. FB thread: culture was the #1 topic across all comments.
Acceptance:  Signal appears in review form Step 2. Appears on venue Signals
             tab and Track record aggregate.
Copy ref:    V&T Guide — Specific beats vague. "Staff culture" not "workplace
             culture" or "team environment."
```

**[NEW] Add: "Fair treatment"**
```
What:        New signal. Question: "How fairly were all team members
             treated here?"
             Answer options:
             - Everyone held to the same standard
             - Some favoritism existed
             - Clear in-group / out-group dynamics
             - Bullying or intimidation was present
             - Discrimination or harassment was present
             - Not sure
Why:         3/4 usability sessions + dominant FB thread theme + founder's
             original post. Benjamen: "management encompasses not only bad
             nights, sexual harassment, favoritism, all the different things."
             Sharon: "there's kind of like people pick favorites — I like it
             more to just be professional."
             The original FB post asked directly about misogyny, favoritism,
             protected employees, and bullying — these generated 37 responses.
             No signal in V1 captured any of them directly. This is the
             strongest un-captured signal in the entire product.
             Named by Shane, cross-validated by research and conversation
             mining independently.
Acceptance:  Signal appears in review form Step 2 as a top 10 signal.
             Renders as single-select with the six options above plus "Other"
             with free-text. Appears on Signals tab and Track record as a
             categorical display. "Discrimination or harassment was present"
             option is clearly labeled and its presence logged internally for
             any future moderation or reporting features.
Copy ref:    V&T Guide — Name the problem. Don't soften "discrimination" or
             "harassment" — people need to be able to name what happened.
```

**[NEW] Add: "Management attrition"**
```
What:        New contextual signal. Question: "How often did management
             change during your time here?"
Why:         T3 — Tyler raised unprompted, Bettina validated in separate
             session. FB thread: management instability is a documented red
             flag experienced professionals use as a proxy for organizational health.
Acceptance:  Signal appears in review form Step 2 as an optional signal
             with N/A option. Appears on Signals tab and Track record.
Copy ref:    V&T Guide — Specific beats vague.
```

**[NEW] Add: "Management communication"**

⚠️ *Not tested in Round 1 — test in Round 2.*

```
What:        New contextual signal. Question: "How does management prefer
             to communicate with staff?"
             Answer options (multi-select):
             - Group text
             - Communication app (Slack, Teams, etc.)
             - Group email
             - In person / verbal only
             - Whiteboard / physical board
             - Other
Why:         Shane proposed — maps to real operational pain. "Verbal only"
             is a significant red flag: no paper trail, no accountability.
Acceptance:  Signal renders as multi-select in Step 2. "Other" opens a
             short free-text field. Renders as categorical on display
             surfaces, not a score bar.
Copy ref:    V&T Guide — Use industry language. "Management" not "leadership."
```

---

### 4.3 Content fixes

**[FIX] Remove duplicate signal question**
```
What:        "Why do people typically leave this workplace?" appears twice
             in the review form. Remove the duplicate instance.
Why:         Content error — caught post-usability testing. 0/4 participants
             flagged it, which suggests the form flow may have masked it.
Acceptance:  The question appears exactly once in the review form. Search
             entire codebase for the string before closing this ticket.
Copy ref:    N/A — removal only.
```

---

### 4.4 Tiered signal model — progressive disclosure

**[MP]**
```
What:        Step 2 uses progressive disclosure. Top 10 signals shown by
             default — the most research-validated signals, covering the
             core of what hospitality professionals and conversation mining confirmed matters
             most. Below the top 10: a "Show all questions" toggle that
             expands the remaining signals for those who want to go deeper.
             No signal is hard-blocked — any question can be skipped.
             Top 10 are strongly encouraged, not enforced.
Why:         T6 — review form UX gaps, 4/4. 28 questions is too many to
             show at once. Progressive disclosure reduces initial cognitive
             load while preserving depth for thorough reviewers. Professionals who
             only complete the top 10 still produce highly useful, structured
             data. The toggle respects their time and expertise.
Acceptance:  Top 10 signals render on load. "Show all questions" toggle
             sits immediately below signal #10. Clicking it expands the
             remaining signals inline — no page reload. Toggle label changes
             to "Show less" when expanded. Collapsed state is default on
             every new session.
Copy ref:    Toggle label: "Show all questions" / "Show less" — direct,
             no decoration. Not "See more signals" or "Advanced options."
             Microcopy above the toggle: "Want to go deeper? Every answer
             helps other professionals."
```

**Top 10 signals (shown by default) — research-validated order:**

| # | Signal | Primary evidence |
|---|---|---|
| 1 | Pay reliability | 4/4 sessions · Joshua Radigan #1 · Morgan Davidson · FB dominant |
| 2 | Tip transparency | 4/4 sessions · Paul Nelsen · Morgan Davidson |
| 3 | Management overall | 4/4 sessions · Tyler · Bettina · Benjamen |
| 4 | Management under pressure | 4/4 sessions · Joshua Radigan "worst nights" |
| 5 | Turnover | Tyler + Bettina sessions · Joshua Radigan · Anonymous 748 FB |
| 6 | Staff culture | Benjamen + Bettina named independently — strongest emergent finding |
| 7 | Why people leave | Validated across all sessions · Krista Cochran FB |
| 8 | Scheduling | Sharon · Anonymous 748 · multiple FB commenters |
| 9 | Safe to speak up | T5 4/4 · retaliation fear dominated FB thread |
| 10 | Fair treatment | 3/4 sessions · founder's original FB post · entire thread |

**Additional signals (revealed by "Show all questions" toggle):**
- Feedback response
- Alcohol & drug use
- Cleanliness
- Guest culture
- Growth opportunities
- Shift meal
- Benefits
- Off the clock expectations
- Management attrition
- Management communication
- Training

**Removed from form:**
- "Did the workplace feel safe and respectful?" — cut. Feelings question
  about physical environment with low actionable data yield. Not
  commented on by participants. Removed in V2.

---

### 4.5 Signal display ordering

**[QW]**
```
What:        On all display surfaces (Signals tab, Track record tab, venue
             cards), signals render ordered best to worst: green → neutral
             → red. Score thresholds: ≥ 3.5 = green, 2.5–3.4 = neutral,
             < 2.5 = red.
Why:         T4 (3/4). Bettina and Tyler both wanted to see what was good
             before what was bad. Positive-first ordering also aligns with
             House Rules' principle of giving the full picture — not just
             the grievances.
Acceptance:  Signals re-sort dynamically based on score. No signal appears
             out of order on any display surface. Colour coding applied
             consistently across all surfaces.
Copy ref:    V&T Guide — What we're not: "not just negativity — you get
             the full picture."
```

---

## Section 5 — Reviews discovery page

### 5.1 Search and autocomplete fix

**[FIX]**
```
What:        Fix autocomplete behaviour to match user expectation.
             Autocomplete should suggest venue names and neighbourhoods
             as the user types. Currently broken — Benjamen demonstrated
             the failure live ("I hit G and I got Luigi's beef").
Why:         T7 — search behaviour, 3/4. Autocomplete is a trust signal —
             broken autocomplete reads as a broken product.
Acceptance:  Typing 2+ characters returns relevant venue name or
             neighbourhood suggestions. No unrelated results appear.
             Selecting a suggestion navigates correctly.
Copy ref:    Placeholder: "Search by venue or neighbourhood"
```

### 5.2 Map toggle

**[MP]**
```
What:        Reviews page offers two view modes: list view and map view.
             Toggle sits at the top of the results area. Map view shows
             venue pins with aggregate score displayed on the pin.
             Clicking a pin or a list card selects the venue and shows
             a popup: venue name / neighbourhood / score / review count.
             Clicking the popup navigates to the venue detail page.
Why:         T7 (3/4 — Tyler and Benjamen both requested location-based
             search). Map feature was in original IA sketches before
             research and validated independently by participants.
             FB thread: neighbourhood and proximity are how hospitality
             hospitality professionals think about job searches.
Acceptance:  Toggle switches cleanly between list and map. Pin scores
             update if filters are applied. Map does not reload the page
             on toggle — state is preserved. Works on mobile viewport.
             Selected pin is visually distinct from unselected pins.
Copy ref:    Toggle labels: "List" / "Map" — no icons required at this stage.
```

### 5.3 Filters

**[QW]**
```
What:        Filter bar on Reviews page. Options:
             - Role (Bartender / Server / FOH / BOH / Host / Manager / Other)
             - Neighbourhood or city
             - Overall rating (1–5 stars, selectable range)
             Active filters display as removable chips below the filter bar.
Why:         T7 — search and discovery, 3/4. Professionals search by role and
             location — these are the two most natural axes for hospitality
             job hunting.
Acceptance:  Filters apply without page reload. Multiple filters combinable.
             "Clear all" removes all active filters. Filter state persists
             if user navigates back from a venue detail page.
Copy ref:    Filter label: "Filter" not "Refine results." Chip removal:
             × only — no additional label needed.
```

### 5.4 Compact venue cards (list view)

**[MP]**
```
What:        Each venue card on the discovery page shows:
             - Venue name
             - Neighbourhood · City
             - Overall score + star visual
             - Review count
             - Verified badge (if applicable)
             - Role tag of the reviewer (most recent or most common)
             - Top 2 signals at a glance (highest and lowest scored)
Why:         T4 (3/4). People need enough information to decide whether
             to click — not the full review. Top signal + bottom signal
             tells the story faster than any paragraph.
Acceptance:  Cards are scannable at a glance. No card exceeds the defined
             height — content does not overflow. Clicking anywhere on the
             card navigates to venue detail page.
Copy ref:    V&T Guide — Specific beats vague. Score displayed as number
             + stars, not text description ("3.4 ★★★" not "Above average").
```

---

## Section 6 — Venue detail page

### 6.1 Venue detail page header

**[MP]**
```
What:        Page header above the tabbed card contains:
             - Venue name (h1)
             - Neighbourhood · City
             - Overall score + star visual
             - Total review count (linked — scrolls to review list, see 6.2)
             - Verified badge
             - Role tags (roles represented in reviews for this venue)
Why:         T4 — review card layout. Header gives instant context before
             the user commits to reading tabs.
Acceptance:  Header renders above the tab bar. Review count link scrolls
             smoothly to the review list section below the card.
             Header does not include a venue photo — map lives on the
             discovery page, not the detail card.
Copy ref:    V&T Guide — Specific beats vague. "14 reviews" not
             "multiple reviews."
```

### 6.2 Review list — below the tabbed card

**[MP]**
```
What:        Below the tabbed card: a list of all reviews for this venue.
             Default state: 5 compact review cards shown.
             Each compact card shows:
             - Reviewer role + experience level + date
             - Overall score
             - One-line excerpt from "What they wish they'd known"
             Expanded state (clicking the card):
             - Full "Their words" content (wish they'd known + what they'd
               tell a friend)
             - This reviewer's individual signal scores (same green/neutral/
               red ordering as Signals tab)
             Load more: "Load 5 more reviews" button below the visible list.
             Review count in header links here via scroll anchor.
Why:         T4 (3/4). Benjamen wanted aggregate scores. Tyler wanted visual
             charts. Bettina wanted grid layout. Pattern: compact by default,
             deep-dive available. Scales to hundreds of reviews without
             overwhelming the initial view.
             Reference: Yelp scroll pattern for discoverability, but with
             structured signal data preserved on expansion — not stripped out.
Acceptance:  5 cards visible on load. Expand/collapse works without page
             reload. "Load 5 more" appends — does not replace existing cards.
             Expanded card shows full content. Signal scores in expanded card
             match the reviewer's submitted data exactly. Scroll anchor from
             header review count lands at the top of this list.
Copy ref:    "Load 5 more reviews" — specific, tells them exactly what happens.
             Not "See more" or "Load more."
```

---

## Section 7 — Review form changes

### 7.0 Step 1 hero copy — streamline and add professionals framing

**[COPY]**
```
What:        Step 1 currently shows six separate copy elements that repeat
             the same message. Three are redundant and cut entirely:
             - "SHARE YOUR EXPERIENCE" eyebrow label → cut
             - "Help someone understand what it's really like before they
               take the job." intro copy → cut ("really like" already in
               headline; this line adds nothing)
             - "THE WORKPLACE" section header → cut (already in step label
               "STEP 1 OF 4 — THE WORKPLACE")

             Remaining — updated:
             Headline: "Tell other professionals what it was really like."
             Subhead: "Your words. Your voice. The real story others need to hear."
             Step label: "STEP 1 OF 4 — THE WORKPLACE" (unchanged)

             "Professionals" carries through the product at:
             - Reviews page intro: "Reviews by hospitality professionals"
             - Verification step: "We verify every professional's review"
             - Progressive disclosure toggle: "Every answer helps other
               professionals."
             Applied sparingly — once or twice per page maximum.
Why:         Tyler flagged the hero copy as too repetitive — multiple
             elements saying the same thing ("really like" appeared in
             the headline and the intro copy). Removing redundant elements
             and introducing "professionals" framing elevates the user,
             aligns with the fine dining north star, and treats professionals
             as the experts they are.
Acceptance:  "SHARE YOUR EXPERIENCE" does not appear on the form.
             "Help someone understand what it's really like" does not
             appear on the form. "THE WORKPLACE" does not appear as a
             standalone section header on Step 1. Headline reads exactly:
             "Tell other professionals what it was really like."
             Subhead reads exactly: "Your words. Your voice. The real story others need to hear."
Copy ref:    V&T Guide — Silent confidence. Direct. Professionals framing
             applied with restraint.
```

**[QW]**
```
What:        Add a single line of copy at the top of Step 2 (signals):
             "Rate what you experienced — there's no wrong answer here.
             In the next step, you'll tell the story behind each one
             in your own words."
Why:         T6 — review form UX gaps, 4/4. Professionals hesitated on the
             signal ratings not knowing whether a narrative was coming.
             Setting the expectation removes the hesitation.
Acceptance:  Copy appears above the first signal question in Step 2.
             It does not appear on any other step.
Copy ref:    V&T Guide — Anticipate the next question. Rule 8.
```

### 7.2 Form section header changes

**[COPY]**
```
What:        Review Step 2 section groupings revised. Current groupings
             feel arbitrary (T6, Tyler: "I'm confused why meal policy is
             under Operations"). Also: "Work environment" and "Culture"
             were near-identical in scope. Revised groupings:

             Section 1 — "The money"
               Pay reliability, Tip transparency

             Section 2 — "Day to day"
               Scheduling, Off the clock expectations, Training

             Section 3 — "The people"
               Management overall, Management under pressure,
               Safe to speak up, Feedback response, Staff culture,
               Fair treatment, Management attrition, Management
               communication

             Section 4 — "The place"
               Guest culture, Alcohol & drug use, Cleanliness,
               Growth opportunities, Turnover, Why people leave,
               Shift meal, Benefits

             Required signals (top 10) carry no special visual marker
             beyond their placement. The progressive disclosure toggle
             does the work of separation — no asterisks, no "required"
             labels needed.
Why:         T6 (4/4). Tyler specifically flagged meal policy under
             Operations as confusing. Work environment and Culture sections
             overlapped significantly. The new groupings follow natural
             mental models: money → daily experience → people → place.
Acceptance:  All signals appear in exactly one section. No signal appears
             in two sections. Section headers render smaller than question
             labels, larger than microcopy. The word "Operations" does not
             appear as a section header anywhere in the form.
Copy ref:    V&T Guide — Use industry language. "The people" not "Human
             resources." "The money" not "Compensation." "The place" not
             "Work environment."
```

### 7.3 Add "Other" option to relevant signals

**[QW]**
```
What:        Add "Other" with short free-text field to any signal that
             uses fixed answer options (not open-ended or scored).
             Specifically: Management communication, Why people leave,
             Off the clock expectations response options.
Why:         T6 — 4/4. Hospitality situations are too varied for fixed
             options to cover every case. People who can't find their
             answer in the list will skip the signal or submit inaccurate
             data. "Other" preserves data quality.
Acceptance:  "Other" appears as last option on all applicable signals.
             Selecting it reveals a short free-text field (max 140 chars).
             Free-text is optional — selecting Other without typing is valid.
Copy ref:    Placeholder in Other field: "Tell us more..."
```

### 7.4 Audit multi-select eligibility

**[QW]**
```
What:        Review every signal question type. Where a professional could
             reasonably give multiple answers, convert to multi-select.
             Primary candidate: Management communication (already specced
             as multi-select in 4.2). Secondary: Why people leave
             (a professional may have observed multiple reasons).
Why:         T6 — form UX. Single-select on questions with multiple valid
             answers forces people to simplify their experience, reducing
             data quality.
Acceptance:  All multi-select signals render with checkbox UI, not radio.
             Single-select signals render with radio, not checkbox.
             No signal type is inconsistent with its question type.
Copy ref:    N/A — interaction pattern only.
```

### 7.5 Verification step — expanded options

**[MP]**
```
What:        Add W2 / tax document upload as a new verification option.
             Professional uploads W2 with personal info redacted — employer
             name is the only required visible field.
             Existing options retained: email verification, paystub upload.
             LinkedIn verification: not included in V2. Privacy risk
             (public profile crossreferenceable with anonymous review)
             outweighs benefit. Parked for V3 evaluation.
Why:         T5 — verification trust-building friction, 4/4. Professionals
             accepted verification as necessary for trust but current
             options don't cover everyone. W2s are universal for
             employed professionals and unambiguous.
Acceptance:  W2 upload appears in verification step. Accepts .pdf and
             image formats. Instructions specify which fields must be
             visible and which can be redacted.
Copy ref:    V&T Guide — Plain, not scary. "We only need to see your
             employer name. Everything else can be blacked out."
```

### 7.6 Logo navigation fix on confirmation screen

**[FIX]**
```
What:        Logo on the review confirmation screen does not navigate
             home. Fix so clicking the logo returns to homepage.
Why:         T8 — navigation, Benjamen: "I'm assuming I could click the
             logo..." — could not.
Acceptance:  Logo on confirmation screen links to /. No other navigation
             change required on the confirmation screen.
Copy ref:    N/A — navigation fix only.
```

### 7.7 Employment date — review recency field

**[QW]**
```
What:        Add "When did you work there?" to Step 1, alongside the
             existing "How long did you work there?" field.
             Answer options (single-select):
             - Within the last 6 months
             - 6 months – 1 year ago
             - 1–2 years ago
             - 2–5 years ago
             - More than 5 years ago
             - Still working there

             Display on review list: recency shown as context alongside
             role and duration.
             Example: "Bartender · 14 months · Worked there 1–2 years ago"

             Reviews discovery page: add recency as a filter option.
             Options: Last 12 months / Last 2 years / All time.
Why:         Bettina (Round 1 follow-up): "If someone worked at a job 10
             years ago, management has probably switched, maybe it's even
             different owners. So that might be important to add a time
             frame."
             Data quality issue — review recency affects how signals should
             be weighted and interpreted. A pay reliability score from 2016
             and one from last month tell different stories about the same
             venue. Adding recency makes House Rules data more honest.
Acceptance:  "When did you work there?" appears in Step 1 adjacent to
             "How long did you work there?" Recency renders on every review
             card on the venue detail page and compact list view.
             Recency filter available on Reviews discovery page.
             "Still working there" option is available.
Copy ref:    V&T Guide — Specific beats vague. "Worked there 1–2 years ago"
             not "Recent." Label: "When did you work there?" — keeps it
             about the reviewer's experience, not the submission timestamp.
```

### 7.8 Retaliation risk copy

**[QW]**
```
What:        Add a short privacy/retaliation statement on the review form
             — visible before the professional starts, not buried in a footer.
             Proposed placement: below the hero copy on the /write page,
             above Step 1.
             Copy: "Your name never appears on your review."
Why:         T5 (4/4). Sharon's wage theft story surfaced because she felt
             safe. Retaliation fear was raised by multiple participants and
             dominated the FB thread. Making the promise visible earlier
             reduces the hesitation that causes abandonment.
Acceptance:  Statement appears on the /write page above Step 1. It is not
             a tooltip or a footer link — it is inline, visible without
             interaction. Links to full privacy/retaliation policy document.
Copy ref:    V&T Guide — Plain, not scary. One sentence. That's enough.
```

---

## Section 8 — Copy decisions locked in V2

These are specific wording decisions made based on research and the V&T guide. They are not suggestions — they are locked.

| Location | Copy | Source |
|---|---|---|
| Tab 1 label | "Their words" | Mirrors "Your words. Your voice." from review form |
| Tab 2 label | "Signals" | House Rules' own language — own it |
| Tab 3 label | "Track record" | Specificity, accountability language |
| Review form headline | "Tell other professionals what it was really like." | V1 base, professionals framing added V2 |
| Review form subhead | "Your words. Your voice. The real story others need to hear." | V1 — retained, not streamlined |
| Confirmation | "Appreciate you. Seriously." | V1, 3/4 positive — retain |
| Form step 3 Q1 | "What do you wish you'd known before taking this job?" | V1, validated |
| Form step 3 Q2 label | "What would you tell a friend considering this job?" | V1, validated |
| Form step 3 Q2 placeholder | "Say it like you would to a friend..." | V1 |
| Reviews page tagline | "When the inside word isn't easy to get, House Rules is where people talk." | Softened from founder's original — inclusive, not bar-specific |
| Reviews page intro | "Reviews by hospitality professionals" | V2 — professionals framing |
| Progressive disclosure toggle | "Show all questions" / "Show less" | V2 — direct, no decoration |
| Toggle microcopy | "Want to go deeper? Every answer helps other professionals." | V2 — professionals framing, never moralize |
| Verification step | "We only need to see your employer name. Everything else can be blacked out." | V2 — plain, not scary |
| Empty state — no reviews | "No reviews yet — be the first." | V&T Guide |
| Load more | "Load 5 more reviews" | V&T Guide — specific beats vague |
| Retaliation copy | "Your name never appears on your review." | V&T Guide, T5 — one sentence, that's enough |

---

## Section 9 — Open questions

Resolved questions are marked ✓. Remaining questions require answers before or during build.

| # | Question | Status | Resolution |
|---|---|---|---|
| OQ1 | Speaking up: one signal or two? | ✓ Resolved | Two signals confirmed: "Safe to speak up" + "Feedback response" |
| OQ2 | Duplicate "Why do people leave" — which step(s)? | ✓ Resolved | Found in HIGH-LEVEL SIGNAL section — second version reads "Why did people typically leave?" Search codebase for both strings and remove the HIGH-LEVEL SIGNAL instance |
| OQ3 | Section header groups approved? | ✓ Resolved | The money / Day to day / The people / The place — confirmed |
| OQ4 | "Voice Safety" rename confirmed? | ✓ Resolved | "Safe to speak up" — confirmed |
| OQ5 | LinkedIn verification — V2 or V3? | ✓ Resolved | Parked for V3. Privacy risk outweighs benefit at this stage. |
| OQ6 | "In person / verbal only" added to Management communication? | ✓ Resolved | Yes — confirmed. Significant red flag, important to capture. |
| OQ7 | Tiered signal lists confirmed? | ✓ Resolved | Progressive disclosure model: top 10 shown, "Show all questions" toggle |
| OQ8 | Homepage hero tagline approved? | ✓ Resolved | Softened version for Reviews page: "When the inside word isn't easy to get, House Rules is where people talk." Original barkeep version saved for future brand consideration. |
| OQ9 | Round 2 research — plan and timeline? | ✓ Resolved | Within 2 weeks. New signals to test: Fair treatment, Management communication, Safe to speak up, Management under pressure, review recency field. Bettina has referred a Round 2 participant — follow up for intro. |
| OQ10 | Location/address data — manually entered or API? | ✓ Resolved | API. Address data is sourced via API, not manually entered. Spec map feature accordingly. |
| OQ11 | "Fair treatment" answer options — approved as written? | Open | Six options in spec — confirm before form build. |
| OQ12 | Where does Training land in section groupings? | ✓ Resolved | "Day to day" section — confirmed. |

---

## Section 10 — V2 build order (recommended)

Based on dependency mapping and impact/effort scores:

1. **Signal taxonomy** — renames, duplicate fix, progressive disclosure, new signals (all other features depend on signal data)
2. **Review form changes** — employment date field, new signals, section headers, microcopy, verification
3. **Venue detail page** — tabbed card + review list
4. **Reviews discovery page** — search fix, filters (including recency), compact cards
5. **Map feature** — address via API confirmed
6. **Homepage** — nav restructure, hero copy, remove inline reviews
7. **Copy sweep** — all locked copy from Section 8 applied across the product

---

*House Rules V2 PRD — v1.4 — May 2026*
*Built on Round 1 research: 4 usability sessions, 1 Facebook thread, 1 supplementary survey.*
*Every change in this document traces to evidence. Assumptions are flagged with ⚠️.*
*v1.1: Signal renames updated, LinkedIn removed, Fair treatment added, progressive disclosure model.*
*v1.2: Management split into two signals, Substance → Alcohol & drug use, Step 1 copy streamlined, professionals framing locked.*
*v1.3: Employment date/recency field added (Bettina), Training to Day to day, address → API, Round 2 within 2 weeks.*
*v1.4: "Workers" removed throughout → professionals/people. Subhead restored to original. Retaliation copy → first sentence only. Verification role requirement removed. Tagline "workers" → "people."*
