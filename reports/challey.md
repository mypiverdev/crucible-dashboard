# Challey Project Summary Report
## Post-Discovery & Prototype — Executive Brief

**Project:** Challey (Family Chore & Reward Platform)
**Domain:** challey.app
**Client:** Maggie, age 13
**Report Date:** February 12, 2026
**Phase:** Specification Complete (Phase 2)
**Prototype:** v3.1 (client-approved)

---

## 1. Project Overview

**The Problem:**
Maggie enjoys doing chores but has no effective way to report completed work to her parents. She wants recognition, fair rewards, and a system that respects her as a teenager. Her dad wants visibility into what gets done, a way to verify work quality, and tools that make managing chores across multiple kids simple and fast.

**The Solution:**
Challey is a family chore tracking and reward platform built as a phone-first Progressive Web App. The core workflow:

1. Parent assigns chore with a point value based on difficulty
2. Kid completes the chore and uploads a photo as proof
3. Parent reviews and approves (swipe-to-approve or request a redo)
4. Points are awarded and the kid spends them on rewards from a family catalog or cashes out for real money

Beyond that core loop, Challey includes a family social feed (The Living Room), sibling interactions (chore swaps, shout-outs, leaderboard), a customizable animated companion mascot, a wishlist system, birthday celebrations, streaks, and deep personalization with six color themes and dark mode.

**Target Users:**
- **Primary:** Families with kids ages 8-17
- **Client persona:** Maggie (13) -- teen who enjoys chores but lacks a communication channel to parents
- **Admin persona:** Dad (Mike) -- family admin who assigns chores, manages rewards, and invites other adults
- **Extended family:** Mom, grandparents, and other guardians can be invited as additional adults

---

## 2. How We Got Here

Challey has evolved dramatically since the initial discovery phase. Here is the journey:

| Date | Milestone |
|------|-----------|
| Feb 10, 2026 | BA discovery complete (Skills 1-8) |
| Feb 10, 2026 | Client feedback session -- Maggie and her dad answered all open questions |
| Feb 12, 2026 | UX prototype v3.1 complete (20+ screens, full onboarding, reward cart, chore swaps, companion mascot) |
| Feb 12, 2026 | Prototype approved by client. Domain confirmed: challey.app |
| Feb 12, 2026 | Technical specification complete (2,060 lines, 68 screens, 89 API endpoints) |

### What Changed After Client Feedback

The original discovery report envisioned Challey as a "simple, fast chore tracker." The client feedback session and prototype iterations turned it into something much more ambitious. Here is what changed:

| Original Discovery | After Client Feedback |
|---|---|
| Simple money rewards | Points-based reward catalog -- parents create rewards, kids redeem with points earned from chore complexity |
| Photo proof was POST-MVP | Photo proof required on EVERY chore -- MVP, no auto-approve |
| Single kid (Maggie) | Up to 10 kids per family, full multi-sibling support |
| Just Dad | Multi-adult: Dad is family admin, can invite Mom, grandparents, other adults |
| No education features | Google Classroom integration (MVP-LITE) -- kids earn points for schoolwork |
| Teen-friendly design (vague) | Navy and ocean blue color palette, 6 themes + dark mode, per-user settings |
| Web or mobile (undecided) | Phone-first PWA, optimized for 375px viewport |
| Open/unclear access model | Private, invitation-only -- family code + member code system |
| 8-10 screens estimated | 68 screens and overlays specified |

---

## 3. Market Analysis

### Competitive Landscape

The chore app market has 15+ established players in three categories:

**1. Financial Education Apps** (Greenlight, BusyKid, Homey)
- Focus: Banking, allowance, savings goals, investment education
- Pricing: $5-$15/month subscriptions
- Weakness: Expensive, complex for chore tracking, no sibling interaction features

**2. Comprehensive Household Managers** (S'moresUp, Family Daily, OurHome)
- Focus: Chores + calendars + grocery lists + messaging + IoT
- Pricing: Free basic, $5/month premium
- Weakness: Feature bloat, overwhelming UX, no social feed or companion features

**3. Simple Chore Trackers** (Chorsee, Neat Kid, Family Tools)
- Focus: Core chore assignment and completion tracking
- Pricing: Free or low-cost ($2-$5)
- Weakness: Kid-focused design (cartoons, gamification), no multi-sibling interaction, no photo proof, no reward economy

### Market Opportunity

**Gaps Challey fills that no competitor does:**

| Gap | How Challey Addresses It |
|-----|--------------------------|
| Approval delays kill motivation | Swipe-to-approve card stack, approve-all batch action, pending verification dashboard |
| No photo proof standard | Mandatory photo proof on every chore -- parents see the work, not just a checkmark |
| Sibling fairness complaints | Chore swaps with incentive points, leaderboard, shout-outs, badges |
| Teens hate childish design | Navy/ocean blue palette, 6 mature themes, dark mode, customizable companion |
| No family social features | The Living Room -- auto-posts for completions, shout-outs, streaks, milestones |
| Education disconnected from chores | Google Classroom integration, with Khan Academy and Canvas LMS on the roadmap |
| Subscription fatigue | Accessible pricing -- no $15/month banking app required |
| Transactional parenting guilt | Shout-outs, badges, and kindness features reward character, not just task completion |

**Challey's Positioning:**
"The family chore platform where kids earn, compete, and connect -- and parents actually know what gets done."

---

## 4. User Insights

### The Teen User (Maggie's Perspective)

**Key Needs (confirmed in feedback):**
- Show parents what she has accomplished -- with photo proof
- Earn points and choose her own rewards from a catalog
- Interact with siblings through swaps, shout-outs, and leaderboard
- Personalize the app (theme, dark mode, companion mascot)
- Have a family space that feels like a social feed

**Pain Points Solved:**
- Parents not noticing completed work -- photo proof and Living Room auto-posts fix this
- Unfair chore distribution -- chore swaps with sibling negotiation
- Feeling unappreciated -- shout-outs, badges, streak milestones, birthday celebrations
- Childish apps -- mature navy/ocean design, teen-friendly language

### The Parent User (Dad's Perspective)

**Key Needs (confirmed in feedback):**
- Assign chores fast with preset categories
- Verify work quality via photo proof before awarding points
- Manage multiple kids (up to 10) with individual tracking
- Invite Mom, grandparents, and other adults
- Control the reward economy (set point-to-dollar rate)
- See a dashboard with pending verifications, reward fulfillments, and kid progress

**Pain Points Solved:**
- "I'll do it later" syndrome -- streaks, leaderboard, and points create natural motivation
- Constant nagging -- the app handles assignments, reminders, and follow-ups
- Disputes about chore quality -- photo proof provides visual evidence
- Tracking multiple kids -- per-kid dashboards with progress bars, streaks, and points

### Key Insight

Maggie's original insight still holds: she ENJOYS chores. Her problem is communication and recognition. But the feedback session revealed something bigger -- this is not just about Maggie. It is about the whole family. Siblings compete, collaborate, and celebrate each other. Parents get visibility and control. The social layer (Living Room, shout-outs, leaderboard) turns chores from a solo grind into a family activity.

---

## 5. What Challey Does

### Product Scope Overview

| Category | Feature Count | Tag |
|----------|:---:|:---:|
| Onboarding & Authentication | 17 screens | MVP |
| Kid Chore Management | 3 screens | MVP |
| Chore Swaps | 13 screens | MVP |
| Sibling Shout-Outs | 5 screens | MVP |
| Rewards, Points & Wishlist | 9 screens | MVP |
| Living Room + Kid Settings | 2 screens | MVP |
| Leaderboard & Profiles | 2 screens | MVP |
| Parent Dashboard & Verification | 2 screens | MVP |
| Parent Management Screens | 7 screens | MVP |
| Overlays & Modals | 3 screens | MVP |
| Google Classroom | 1 screen | MVP-LITE |
| Education Hub (multi-LMS) | 1 screen | POST-MVP |
| Achievements System | 1 screen | POST-MVP |
| Year-End Recap ("Challey Wrapped") | 1 overlay | POST-MVP |
| **Total** | **68 screens** | |

### Feature Highlights

#### Points-Based Reward System [MVP]
Parents create a reward catalog (screen time, food treats, cash, custom rewards). Each reward has a dollar value that automatically converts to points based on the family's configurable rate (default: 20 points = $1.00). Kids browse the rewards shop, add items to a reward cart, and check out with a batch redemption. Kids can also cash out points for real money through a 4-step handoff process (request, parent approves, parent pays, kid confirms receipt).

#### Photo Proof on Every Chore [MVP]
No chore is approved without a photo. Kids take a photo of their completed work, optionally add a note, and submit for parent verification. The photo shows up in the parent's swipe-to-approve card stack and auto-posts to The Living Room feed on approval.

#### The Living Room [MVP]
A private family social feed. Auto-generated posts appear for chore completions (with photo proof), shout-outs, streak milestones, and reward redemptions. Family members can also create manual posts with photos. All posts support likes, comments, and emoji reactions. Parents can pin announcements.

#### Chal the Companion Mascot [MVP]
Every family picks a pet from 12 options (dog, cat, octopus, bunny, hamster, parrot, turtle, fox, panda, penguin, lion, frog) and names it. The companion appears as an animated floating widget that gives contextual encouragement, tips, and fun facts. Parents can configure message types and add custom messages. Kids can tap Chal for an on-demand boost or hide the companion entirely.

#### Chore Swaps [MVP]
Kids can swap chores with siblings (with an optional points incentive to sweeten the deal). Siblings can accept, decline, or counter-offer with a different chore or a favor. Kids can also request a swap from parents -- picking an alternative from the unassigned chore pool or suggesting an entirely new chore. Parents review and approve or decline.

#### Sibling Shout-Outs [MVP]
Kids pick a sibling, choose a badge (Amazing Sibling, Kind Heart, Best Helper, So Funny, Super Brave, Team Player), write a note, and optionally gift points from their own balance (1-25 points). The shout-out goes to a parent for review. Parents can boost it by awarding bonus points to BOTH the sender and receiver. The shout-out then auto-posts to The Living Room.

#### Leaderboard & Streaks [MVP]
Weekly sibling rankings based on points earned (Monday through Sunday). A "This Week's MVP" spotlight highlights the top earner. Streaks track consecutive days of approved chore completions, with milestone posts auto-generated at 3, 7, 14, 30, 60, 100, and 365 days. Streak info displays on kid chore screens, the leaderboard, and parent dashboards.

#### Wishlist [MVP]
Kids add items they want with a description, approximate price, product link, and occasion tags (Birthday, Christmas, Holiday, Anytime). Parents review and approve or decline wishes. Approved wishes can be converted directly into rewards in the catalog.

#### Birthday Celebrations [MVP]
Seven days before a kid's birthday, parents get a prep card with toggleable options (remove chores, double points, birthday badge, view wishlist). On the day: a birthday banner appears, all chores earn double points, and the kid gets a Birthday Pass to skip one chore free. Siblings are prompted to send birthday shout-outs.

#### Swipe-to-Approve Verification [MVP]
Parents review pending chores in a card stack -- swipe right to approve, swipe left to request a redo. Each card shows the kid's photo proof, their note, the chore details, and an emoji reaction bar. Parents can also tap "Approve All" for batch processing.

#### Badges [MVP]
Parents award badges to kids for outstanding behavior (Super Star, Hard Worker, Above & Beyond, Chore Master, On Fire, Royalty, Team Player, Kind Heart). Each badge can include bonus points and a note. Badges display on the kid's profile in the "My Swag" section.

#### 6 Color Themes + Dark Mode [MVP]
Ocean (default navy/blue), Sunset, Forest, Midnight, Bubblegum, and Arctic. Each user -- kid and parent -- has independent theme and dark mode settings. Applied via CSS custom properties for instant switching.

#### Google Classroom Integration [MVP-LITE]
Read-only integration that allows parents to connect a kid's Google Classroom account. Kids earn configurable points for completed schoolwork. Manual parent review before points are awarded.

#### Challey Wrapped (Year-End Recap) [POST-MVP]
An 8-slide recap at the end of the year: total chores completed, total points earned, longest streak, favorite chore, kindness stats, and family totals. Inspired by Spotify Wrapped.

#### Education Hub [POST-MVP]
Multi-LMS integration for Khan Academy, Canvas LMS, and Microsoft Teams for Education. Kids earn points for schoolwork across platforms.

---

## 6. User Roles & Access

Challey supports three roles with clearly separated permissions:

| Role | Auth Method | Max per Family | Description |
|------|------------|:-:|-------------|
| Family Admin | Social OAuth or Email/Password | 1 | Creates the family, full control over everything |
| Parent/Guardian | Social OAuth or Email/Password | 9 | Invited by admin. Can assign chores, verify, manage rewards. |
| Kid | Family Code + Member Code + 4-digit PIN | 10 | Completes chores, earns points, redeems rewards |

**Kid Authentication is COPPA-compliant:**
- No email or personal data collected from kids
- Kids join using a Family Code (e.g., JOHN13) + their Member Code (e.g., MAG01) + a 4-digit PIN they set themselves
- PIN stored as a bcrypt hash; 5 failed attempts trigger lockout and parent notification
- Forgot PIN sends a reset request to parents

**Privacy Model:**
- Invitation-only access. No public profiles, no discovery, no social features outside the family
- All data scoped to the family via row-level security
- Photo uploads stored in family-scoped storage buckets

---

## 7. Technical Architecture

### Recommended Stack

| Layer | Recommendation | Rationale |
|-------|---------------|-----------|
| **Frontend** | Progressive Web App (React/Next.js) | Phone-first, installable on iOS and Android, no app store approval needed |
| **Backend** | Supabase (PostgreSQL + Auth + Storage + Edge Functions) | Real-time sync, row-level security, generous free tier, built-in auth |
| **Notifications** | Firebase Cloud Messaging (FCM) + Web Push API | Reliable delivery, free for this scale |
| **Image Storage** | Supabase Storage with CDN | Client-side compression before upload, thumbnail generation, HEIC support |
| **Hosting** | Vercel or Netlify | PWA optimized, edge deployment, free tier available |

### Data Model

**18 MVP data entities:**

families, users, chores, chore_assignments, photo_proofs, rewards, reward_redemptions, cash_out_requests, points_transactions, swap_requests, shoutouts, badges, wishlist_items, posts, comments, reactions, notifications, companion_config

### API Surface

**89 total API endpoints** (83 MVP, 2 MVP-LITE, 4 POST-MVP) covering:

| Category | Endpoints |
|----------|:---------:|
| Authentication | 10 |
| Family Management | 9 |
| Chores & Assignments | 13 |
| Rewards & Redemptions | 8 |
| Cash-Out | 5 |
| Chore Swaps | 7 |
| Shout-Outs | 4 |
| Badges | 2 |
| Wishlists | 4 |
| Living Room (Social) | 6 |
| Notifications | 3 |
| Points & Stats | 4 |
| Companion | 3 |
| User Settings | 5 |
| Education (MVP-LITE + POST-MVP) | 6 |

### Estimated Build Scope

| Phase | Scope | Duration | Team |
|-------|-------|----------|------|
| MVP Build | 47 screens, 83 endpoints, 18 entities | 8-10 weeks | 2 developers + 1 designer |
| MVP-LITE Add-ons | Google Classroom integration (2 endpoints) | +1 week | Same team |
| POST-MVP Phase 1 | Education Hub, Achievements, Challey Wrapped | +4-6 weeks | Same team |
| POST-MVP Phase 2 | Khan Academy, Canvas LMS, AI companion | TBD | Based on user feedback |

---

## 8. Risk Assessment

### HIGH PRIORITY RISKS

**Risk 1: Scope Size**
- **Issue:** The product grew from ~10 screens to 68 screens during prototype iteration. This is now a substantial application, not a minimal MVP.
- **Mitigation:** The specification is complete and thoroughly tagged (MVP / MVP-LITE / POST-MVP). Build the 47 MVP screens first. Ship early, iterate based on real family usage. Do not attempt to build all 68 screens at once.

**Risk 2: Parent Engagement**
- **Issue:** The app's value depends on parents actively verifying chores, fulfilling rewards, and reviewing shout-outs. If a parent stops engaging, the entire system breaks.
- **Mitigation:** Swipe-to-approve makes verification fast (2-3 seconds per chore). Approve-all exists for busy days. Push notifications surface pending actions. The Living Room keeps parents passively aware. Birthday prep cards and shout-out boosts give parents moments of delight, not just obligation.

**Risk 3: Points Economy Balance**
- **Issue:** If points are too easy to earn, rewards feel cheap. If too hard, kids lose motivation. The configurable rate (10-50 points per dollar) needs careful defaults and guidance.
- **Mitigation:** Standard preset (20 pts/$1) tested in prototype. Three named presets (Easy/Standard/Hard) give parents guidance. Rate is adjustable at any time. Existing reward costs auto-recalculate when the rate changes.

### MEDIUM PRIORITY RISKS

| Risk | Impact | Mitigation |
|------|--------|------------|
| Photo upload friction | Kids skip or fake photos | Make camera launch fast, allow gallery selection, compress client-side |
| Chore swap abuse | Kids swap away all hard chores | Parent notification on all swaps, parent approval required for kid-to-parent swaps |
| Shout-out gaming | Kids trade shout-outs for points | Parent review gate on all shout-outs before delivery |
| COPPA compliance | Legal exposure for kid data | No email/phone from kids, parent consent via account creation, family-scoped data |
| Push notification delivery | Unreliable on some devices | In-app notification center as fallback, critical alerts bypass quiet hours |

### LOW PRIORITY RISKS

- Platform fragmentation (PWA mitigates iOS vs. Android)
- Monetization model (defer until product-market fit)
- Competitive response from larger players (differentiated by social features and teen design)
- Google Classroom API changes (MVP-LITE scope is minimal, read-only)

---

## 9. Success Criteria

### For Maggie (Teen User)
- Can report completed chores with photo proof in under 60 seconds
- Can browse and redeem rewards from a catalog she finds exciting
- Sees her streaks, points, and leaderboard position at a glance
- Can swap chores with siblings and send shout-outs
- Can personalize the app with her preferred theme and dark mode
- Feels valued through Living Room auto-posts, badges, and birthday celebrations

### For Dad (Parent/Admin)
- Can assign chores to any kid in under 30 seconds using presets
- Can verify a batch of chores in under 2 minutes using swipe-to-approve
- Sees a dashboard with all pending items (verifications, fulfillments, swaps, shout-outs)
- Can manage the reward catalog and points economy
- Can invite Mom, grandparents, and other adults
- Gets a prep card 7 days before each kid's birthday

### For the Family
- The Living Room becomes the place where the family sees each other's contributions
- Sibling interactions (swaps, shout-outs, leaderboard) reduce competition and increase collaboration
- Fewer verbal reminders and arguments about chores
- Clear record of who did what, when, and how well

### Technical Success
- Time to interactive under 3 seconds on 4G
- API response time under 500ms (p95)
- 99.9% uptime target
- COPPA-compliant kid authentication
- PWA installable on iOS and Android

---

## 10. Version Strategy

Challey is designed to grow into multiple age-targeted versions:

| Version | Target Age | Design Language | Status |
|---------|:---------:|-----------------|--------|
| **Challey Teen** | 13-17 | Sleek, mature, financial dashboard style | Current version (v2+, in specification) |
| **Challey Kids** | 8-12 | Colorful, gamified, story-driven | Future -- more badges, levels, fun animations |
| **Challey Family** | All ages | Adaptive UI per user age | Future -- auto-switches UI based on user age profile |

### Future Feature Pipeline (Post-Launch)

The future-versions backlog includes 20 prioritized features:

**Tier 1 (High Impact):** Smart parent reminders for verification delays, age-weighted leaderboards for fairness, teen financial dashboard, auto-verification via Apple Health/Google Fit, streak freeze for sick days and vacations.

**Tier 2 (Differentiation):** Charity donation integration, Google Calendar sync with conflict alerts, voice-activated chore logging (Alexa/Google Home), chore negotiation system, Apple Pay/Google Pay allowance transfers.

**Tier 3 (Advanced):** Recurring chore auto-scheduling, family messaging, multi-household support (shared custody), savings goals with progress bars, weekly family report, chore template library, supply tracking alerts, vacation mode, before/after photo comparison, RPG-style gamification system.

---

## 11. Conclusion

Challey has grown from a "simple chore tracker for one teen" into a complete family chore and reward platform with genuine social features, sibling dynamics, and deep personalization. The client feedback session was transformative -- Maggie and her dad did not just answer the open questions, they revealed a vision for how the whole family should interact around household responsibilities.

**What makes Challey different from everything else on the market:**

1. **Photo proof standard** -- every chore, every time. No more "did you really do it?" arguments.
2. **The Living Room** -- a private family social feed that turns chore completions into shared celebrations.
3. **Sibling dynamics** -- chore swaps, shout-outs, leaderboard, and badges create real interaction between kids.
4. **Points economy** -- configurable, fair, and it connects chores to real rewards and real money.
5. **Teen-first design** -- navy/ocean blue palette, mature UI, dark mode, customizable companion mascot.
6. **COPPA-compliant** -- no kid email, no tracking, family-code-based authentication.
7. **Education integration** -- Google Classroom in MVP-LITE, with Khan Academy and Canvas LMS on the roadmap.

**The numbers:**
- 68 screens (47 MVP, 2 MVP-LITE, 19 POST-MVP)
- 18 data entities (MVP)
- 89 API endpoints (83 MVP, 2 MVP-LITE, 4 POST-MVP)
- 3 user roles with full permission matrix
- 6 color themes + dark mode, per-user independent
- 12 companion pet options
- Up to 10 kids and 10 adults per family

**Current Status:**
- Discovery: Complete and client-approved
- Prototype: v3.1 complete and client-approved
- Specification: Complete (2,060 lines), ready for review
- Next step: Feedback Agent Review (Mode 4) on the specification, then Solutions Architect + Technical Advisor

**Biggest risks** remain scope management (this is now a big app) and parent engagement (the system needs active adult participation). Both are mitigated by the phased build approach and the UX focus on making parent workflows as fast as possible.

Challey is a **high-viability project** with strong client buy-in, a clear specification, and a market position no competitor currently occupies. The prototype proves the concept works. The specification proves it can be built. The next step is building it.

---

**Report Prepared By:** Business Analyst Agent (updated post-specification)
**For:** Project Manager (Crucible Pipeline)
**Status:** Specification complete, awaiting Mode 4 review
**Next Step:** Feedback Agent Review (Mode 4) on specification document

---

*This report supersedes the original discovery-phase report dated February 10, 2026. All content reflects the current product state as of the v3.1 prototype and completed specification.*
