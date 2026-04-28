## Tech constraints

- Frontend only (no backend)
- React + Vite
- No database or authentication
- Static sample data only
- Focus on UI/UX and interaction quality

# House Rules MVP

## Goal
Build an interactive MVP landing page for House Rules, a worker-first hospitality employer review platform.

## Product concept
House Rules helps bartenders, servers, cooks, and other hospitality workers read and leave honest workplace reviews. The differentiator is depth: reviews should feel more thorough and useful than Glassdoor or Yelp, while still being easy to scan.

## MVP goals
The landing page should:
- explain the concept clearly
- feel like a real startup product, not a generic website
- show example review cards
- let users expand a card to read a fuller review
- preview the idea of structured workplace signals
- include a “Write a Review” CTA even if the review form is only partially mocked up

## UX principles
- summary first, depth on demand
- high trust, clean, editorial, modern
- scannable review cards
- mobile responsive
- simple but product-like

## Main sections
1. Hero
2. What House Rules is
3. Recent Reviews
4. Optional preview of structured review categories
5. CTA section

## Hero content
Headline:
Real reviews from people who actually worked there.

Subhead:
No corporate filters. No fake positivity. Just honest experiences from the hospitality industry.

Small supporting line:
Built for hospitality workers. Period.

Primary CTA:
Read Reviews

Secondary CTA:
Write a Review

## Review card structure
Each review card should show:
- restaurant name
- star rating
- quick take
- key workplace signals
- expandable full review

Example key signals:
- Pay Reliability
- Cleanliness
- Scheduling
- Management
- Kitchen Hygiene

Example statuses:
- Good
- Inconsistent
- Issues Reported
- Poor Communication
- On-call expected

## Example review card content
Restaurant:
Luigi’s Pizzeria

Rating:
3/5

Quick take:
Great coworkers, but management and pay reliability are issues.

Signals:
- Pay Reliability: Issues reported
- Cleanliness: Inconsistent
- Scheduling: On-call expected
- Management: Poor communication

Expanded review:
Worked here for 8 months. The team was solid, but management created a lot of instability. Paychecks were late twice. Kitchen cleanliness varied depending on who was on shift. Scheduling often required being on-call without clear communication.

## Tech
Build a single-page front-end prototype.
Use React if helpful, otherwise plain HTML/CSS/JS is fine.
Prioritize speed, clarity, and clean structure over complexity.

## Visual direction
- clean and minimal
- modern startup feel
- neutral palette
- strong typography
- whitespace
- subtle card styling
- no overly playful design
- trustworthy and worker-first

## Important
Do not overbuild.
Do not add backend or auth.
Do not add CMS.
Do not add unnecessary animations.
Focus on a polished front-end MVP only.