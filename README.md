# Review My MP

Production-track MVP for a UK civic platform that records structured constituent experiences with MPs.

## Product principle

Measure constituency service, not political popularity. The core questions are whether an MP's office responded, how quickly, whether the reply addressed the question, whether action was taken, and whether the issue progressed.

## Current build

- Live postcode → MP lookup using the official UK Parliament Members API
- Responsive MP profile experience
- Clearly labelled sample service metrics and reviews
- Structured two-minute review flow
- No political star rating
- Production-friendly Next.js structure ready for Vercel

## Run locally

1. Install Node.js 20+
2. `npm install`
3. `npm run dev`
4. Open http://localhost:3000

## Next production milestone

Add Supabase authentication and database storage. Reviews should require a verified account, default to `pending`, and only become public after moderation. Add reporting, MP right-of-reply, rate limiting, privacy/terms/moderation pages and a legal review before public launch.

Review My MP is independent and is not affiliated with UK Parliament or any political party.
