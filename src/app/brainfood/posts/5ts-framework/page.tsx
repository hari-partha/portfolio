import { BitsizeReaderLayout } from '@/components/blog/reader/BitsizeReaderLayout';
import {
  ReaderAbridged,
  ReaderCaseStudy,
  ReaderClose,
  ReaderList,
  ReaderParagraph,
  ReaderPullQuote,
  ReaderRecap,
  ReaderSubHead,
  ReaderSubsection,
} from '@/components/blog/reader/ReaderBlocks';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The 5Ts: A Framework for Evaluating Early-Stage Companies · Hari Parthasarathy',
  description:
    'A scout framework for evaluating early-stage startups through TAM, Team, Technology, Traction, and Term Sheet — and the shadow question hiding behind each.',
};

export default function FiveTsFrameworkPostPage() {
  return (
    <BitsizeReaderLayout
      brand="brainfood"
      seriesLabel="Brainfood · Bitsize"
      title={
        <>
          The <span style={{ color: 'var(--reader-accent)' }}>5Ts</span>: A Framework for Evaluating Early-Stage
          Companies
        </>
      }
      subtitle="What I learned from a family friend, two years of deal memos, and the questions I almost skipped."
      authorName="Hari Parthasarathy"
      authorMeta="MET '26, UC Berkeley · VC Scout"
      date="Apr 2026"
      readingTime="22 min read"
      introText="TAM. Team. Technology. Traction. Term Sheet. Each maps to a stage question — and each has a shadow, a second-order question that shows up when things go sideways."
      footer="Hari Parthasarathy · MET '26, UC Berkeley · Independent Investor & VC Scout"
    >
      <ReaderParagraph dropCap>
        I was sitting across from a family friend — someone who had spent decades writing checks and sitting on boards —
        when he asked what I was actually interested in doing after school. I said venture capital. Vague enough that it
        was clear I hadn’t thought it through.
      </ReaderParagraph>
      <ReaderParagraph>
        He didn’t hand me a book or a reading list. He just said: “Let me give you the five-word framework. This is the
        foundation. Everything else builds on this.” TAM. Team. Technology. Traction. Term Sheet.
      </ReaderParagraph>
      <ReaderParagraph>
        He walked me through the ladder. Angel investing, he explained, comes down to two questions: is the market real,
        and is this the right person to build in it? TAM and Team. That’s the whole thesis at that stage. Add Technology
        at pre-seed — now you need to know they can actually build the thing. By seed, Traction enters the picture: show
        me evidence that real humans want this product. And by Series A, you’re structuring a deal with real economic
        consequences. That’s the Term Sheet.
      </ReaderParagraph>
      <ReaderParagraph>
        It stuck. And it became the catalyst for what turned into two years of scouting deals, writing memos, and sitting
        across from founders who had been working on a problem far longer than I’d been paying attention to it.
      </ReaderParagraph>
      <ReaderParagraph>
        What I found, in practice, is that each T has a shadow. A second-order question that shows up when things go
        sideways, that experienced investors have quietly internalized but rarely write down. TAM without Threats is a
        ceiling without walls. Team without Talent, Trust, and Technical Depth is a charismatic founder who can’t build
        around themselves. Technology without Trademark is an idea anyone can copy once you prove it works. Traction
        without a Timeline is a promising number with no path. And a Term Sheet without a Thesis is a check written
        without a real reason.
      </ReaderParagraph>
      <ReaderParagraph>This is my attempt to name those shadows explicitly.</ReaderParagraph>
      <ReaderParagraph>
        <em>
          Cipher and Solara are fictional company names. The case studies below are composites based on real diligence I
          worked on, with identifying details changed.
        </em>
      </ReaderParagraph>

      <ReaderSubsection title="T1 · TAM + Threats">
        <ReaderAbridged>
          Angel Stage · Total Addressable Market — and everything that could quietly eat into it.
        </ReaderAbridged>
        <ReaderParagraph>
          TAM is the first question because it sets the ceiling. If this company executes perfectly — best product, best
          team, no mistakes — how big does the prize get? At the angel stage, you’re not betting on perfect execution.
          You’re betting on whether perfection could even matter. A $40M market with a flawless product is a good
          business. It is not a venture return.
        </ReaderParagraph>
        <ReaderParagraph>
          The trap is that founders know this. So they learn to present TAM in the most favorable light possible: they
          find the largest defensible framing for their market, lead with it, and bury the Serviceable Addressable Market
          and Serviceable Obtainable Market somewhere in the appendix. The gap between TAM and SOM is where a lot of seed
          memos quietly hide the real risk.
        </ReaderParagraph>
        <ReaderParagraph>
          This is where Threats enters — and Threats is a bigger category than most people treat it as. Most investors
          use it as a synonym for competitive analysis. Who else is in this market? What does the moat look like in year
          three? Those questions matter. But some of the most destructive threats I’ve seen have nothing to do with
          competition.
        </ReaderParagraph>
        <ReaderParagraph>
          I worked with a company that had strong product-market fit, a growing customer base, and real momentum. What
          killed them wasn’t a competitor. It was that a critical third-party partner — a company whose infrastructure
          they had quietly built their entire go-to-market on top of — ran into its own crisis. Negative press, a stock
          collapse, a rapid pivot in their business priorities. The partnership got pulled. Overnight, the distribution
          channel that had been generating the company’s best leads disappeared. They had three months of runway and
          nowhere to go. The company shut down.
        </ReaderParagraph>
        <ReaderParagraph>
          Threats can be that simple, and that unpredictable. A key hire leaving. A regulatory change in a market you were
          counting on. A supplier constraint. A customer concentration risk that nobody flagged because the big account
          looked like a feature, not a vulnerability. You can’t predict all of it. But you can stress-test the business
          model: what are the two or three things outside this team’s control that, if they went wrong, would make this
          company’s current plan unworkable? And how much runway exists to survive a bad surprise?
        </ReaderParagraph>
        <ReaderPullQuote>
          The worst competitive analysis isn’t one that gets the competition wrong. It’s one that lists every competitor
          and then explains why none of them matter — while missing the partnership that could walk out the door.
        </ReaderPullQuote>
        <ReaderSubHead>What to actually ask</ReaderSubHead>
        <ReaderList
          items={[
            'What is the SAM, not just the TAM? Who exactly are the buyers, and how do they currently purchase?',
            'Is the market fragmented (easier to enter, harder to dominate) or consolidated (harder to enter, winner-take-most)?',
            'What third-party dependencies does this business model rely on? What happens if one of them disappears?',
            'Does the current runway cover not just the roadmap, but a plausible bad surprise — a lost partner, a delayed contract, a slower sales cycle?',
            'What would it take for a dominant incumbent to enter this market in 18 months? Is there a structural reason they won’t bother?',
            'What does the competitive moat look like in year three — and is it still intact if the market shifts?',
          ]}
        />
        <ReaderCaseStudy name="Cipher.AI — Confidential AI for Regulated Sectors">
          <ReaderParagraph>
            Cipher operates in AI data security, targeting federal, legal, and financial services clients. The TAM
            framing is a classic trap — “AI for enterprise” is a massive market, and it’s easy to anchor the pitch there.
            But the real SAM is much narrower: regulated sectors that structurally cannot use commercial LLMs because of
            data sovereignty requirements. DoD-level clients. Legal firms with iron-clad confidentiality obligations.
            Government intelligence agencies. That’s a small wedge — but almost no one is serving it.
          </ReaderParagraph>
          <ReaderParagraph>
            The Threats picture at the competitive level looks manageable: most direct competitors target enterprise B2B
            clients, not regulated federal sectors, and large AI companies are actually disincentivized from entering this
            market because their core business model depends on the very data they’d be asked not to touch. The more
            serious Threat is dependency risk: Cipher’s go-to-market at this stage rests heavily on an early DoD
            relationship. That relationship is an asset — but it is also a single point of failure. If it stalls or
            shifts, the company’s traction story changes completely. Three to six months of runway beyond that scenario is
            the right ask.
          </ReaderParagraph>
        </ReaderCaseStudy>
        <ReaderCaseStudy name="Solara Therapeutics — Heavy Metal Chelation">
          <ReaderParagraph>
            Solara’s TAM sits at roughly $7.3 billion, addressing over a billion people worldwide affected by heavy metal
            poisoning. Non-cyclical demand. Lead poisoning doesn’t follow the S&amp;P 500.
          </ReaderParagraph>
          <ReaderParagraph>
            The Threats analysis is where it gets specific. The competitive field looks manageable — about six players,
            none at a comparable development stage. But Solara’s drug requires FDA approval before it can be sold
            commercially, which means the real Threat isn’t today’s competitors. It’s drugs currently in pre-testing
            phases that could hit commercialization on a parallel track. There’s also a dependency risk worth naming: the
            manufacturing process relies on infrastructure at a federal research laboratory, and the royalty arrangement
            tied to that relationship is a variable that could shift if institutional priorities change. The 30-year IP
            runway is a strong backstop. The institutional dependency is the thing to watch.
          </ReaderParagraph>
        </ReaderCaseStudy>
      </ReaderSubsection>

      <ReaderSubsection title="T2 · Team = Talent + Trust + Technical Depth">
        <ReaderAbridged>
          Angel Stage · The founders you meet — and whether they can build everything the company needs to become.
        </ReaderAbridged>
        <ReaderParagraph>
          If there’s one thing I’ve taken away from two years of evaluating deals, it’s this: Team is the most important
          T. Not because the others don’t matter, but because a great team can find a better market, rebuild the
          technology, and renegotiate a bad term sheet. A weak team can’t be fixed by any of the other four.
        </ReaderParagraph>
        <ReaderParagraph>
          Every VC memo writes the same Team section: “strong domain expertise,” “complementary skill sets,” “serial
          entrepreneur.” These phrases describe a founding team at a single point in time, in a single room, with their
          best foot forward. They tell you almost nothing about whether this team can build the organization it will need
          to be in three years.
        </ReaderParagraph>
        <ReaderParagraph>
          What actually matters is an equation with three parts. <strong>Team = Talent + Trust + Technical Depth.</strong>
        </ReaderParagraph>
        <ReaderParagraph>
          Talent is the founding team’s background: the experiences, networks, and hard-won competencies each person
          brings. But there’s a pattern worth knowing how to read. Some founders have held five roles at four companies in
          six years. On paper it looks like range. In practice it often means they never stayed anywhere long enough to
          build real depth. They observed the work more than they did it. The title accumulated. The roots didn’t. When I
          see that kind of resume, I push harder on what they actually built versus what they witnessed being built.
        </ReaderParagraph>
        <ReaderParagraph>
          Trust is the values and culture the founding team has built between themselves. This one is harder to evaluate
          from the outside, but it shows up in how founders talk about disagreements, how they describe making hard
          decisions, and whether they can tell you something honest about the other person’s weaknesses without being
          prompted. Cofounder relationships are the single most underrated risk in early-stage investing. I’ve seen
          technically strong companies fall apart because two people who met at a hackathon and decided to start a company
          discovered, twelve months in, that their visions weren’t actually aligned. Trust can’t be manufactured on a term
          sheet. It’s either there or it’s being held together by momentum — and momentum runs out.
        </ReaderParagraph>
        <ReaderParagraph>
          Technical Depth is the third variable and the one that most clearly separates a team that can iterate from one
          that will stall. How well does the founding team know their domain? Not in a general “I’ve worked in this
          industry” way — in a specific, what-are-the-three-hardest-unsolved-problems-in-this-space way. The best founders
          I’ve sat across from could tell me, without hesitation, exactly where their current implementation was wrong and
          what they were going to do about it. The ones who couldn’t tended to present a more polished story, but a
          shallower one.
        </ReaderParagraph>
        <ReaderSubHead>What to actually ask</ReaderSubHead>
        <ReaderList
          items={[
            'What are the three most important hires in the next 12 months? Can the founders say specifically why those roles, and do they know how to recruit for them?',
            'For each major domain the company needs to succeed in — technical, commercial, operational — who on the founding team owns it, and is that real ownership or nominal?',
            'How long have the cofounders actually worked together? Have they been through something hard together and come out the other side?',
            'Where are the genuine gaps in the founding team’s knowledge? Are they honest about this, and is there a plan to close it?',
            'Can you find someone who has worked with these founders before — not someone they introduced you to?',
          ]}
        />
        <ReaderCaseStudy name="Cipher.AI — Two-Person Founding Team">
          <ReaderParagraph>
            Cipher’s two founders are, individually, strong. Maya (CEO) spent years managing data analytics pipelines for
            Fortune 500 clients at a major consultancy. Alex (CTO) built knowledge graph infrastructure at a leading
            search company, led a graph database project at a high-growth mobility platform, and holds two graph-based
            patents — in the exact technical space Cipher operates in. Talent: present.
          </ReaderParagraph>
          <ReaderParagraph>
            The gaps surface quickly. All technical depth lives with Alex. Maya’s go-to-market background is in analytics
            pipelines, not enterprise software sales — and especially not the relationship-driven, multi-year procurement
            cycles that federal clients require. That’s not a disqualifier. It’s a hiring plan: a COO, a CMO with public
            sector experience, and early engineering hires are preconditions, not nice-to-haves.
          </ReaderParagraph>
          <ReaderParagraph>
            On Trust: we only met Maya. Alex wasn’t on the call. In a two-person company, that gap matters. You want to see
            both founders in the room — not because one is more important than the other, but because the dynamic between
            them is part of what you’re evaluating. How they handle the meeting together tells you more than either resume
            does alone.
          </ReaderParagraph>
        </ReaderCaseStudy>
        <ReaderCaseStudy name="Solara Therapeutics — Tight-Knit Three-Person Team">
          <ReaderParagraph>
            Solara’s founding team maps almost cleanly onto the company’s three hardest challenges. The first founder is a
            serial biotech entrepreneur with prior company-building experience. Sarah (co-founder) is a former life
            sciences consultant who led commercial diligence for major pharma transactions. The third is a professor and
            principal investigator at a federal research laboratory, which gives the company both scientific credibility
            and institutional access that would take most startups years to build.
          </ReaderParagraph>
          <ReaderParagraph>
            Talent, Trust, and Technical Depth all score well. The team’s coordination in the meeting wasn’t rehearsed —
            they completed each other’s thoughts in a way that suggested they’d been through pressure together, not just
            sat in the same pitch sessions. Sarah mentioned, in passing, that she’d turned down a return offer from her
            former firm to stay with the company. That detail is worth more than most things on a slide deck. It’s a data
            point about conviction.
          </ReaderParagraph>
          <ReaderParagraph>
            The Talent gap that exists is stage-appropriate and downstream: the team of three is right for clinical
            trials. It won’t be right for manufacturing scale-up. Operational and regulatory depth will need to be added
            before FDA approval, not after. That’s a board-level conversation to have early.
          </ReaderParagraph>
        </ReaderCaseStudy>
      </ReaderSubsection>

      <ReaderSubsection title="T3 · Technology + Trademark">
        <ReaderAbridged>Pre-Seed Stage · The product — and whether it can actually be owned.</ReaderAbridged>
        <ReaderParagraph>
          Technology evaluation at the pre-seed stage is a strange exercise. You are being asked to assess a product that
          mostly doesn’t exist yet, built by a team that will have to rebuild large parts of it once they find
          product-market fit, in a market that doesn’t fully know what it wants. And yet you have to form a view.
        </ReaderParagraph>
        <ReaderParagraph>
          The real question isn’t whether the current implementation is good. It’s whether the founder understands the
          problem deeply enough that their implementation is a credible starting point. Technical depth shows up in
          specificity: in the way someone describes what the system can’t do yet, in the honest accounting of what’s been
          hardcoded versus what’s actually generalized, in the willingness to say “we haven’t solved X yet” without being
          prompted.
        </ReaderParagraph>
        <ReaderParagraph>
          The shadow is Trademark — and I use that word broadly. Patents, trade secrets, proprietary datasets, regulatory
          approvals that function as barriers to entry. The question isn’t just “does this work?” It’s “can this be
          owned?” A product that works brilliantly but can be replicated in six months by a well-funded competitor is a
          feature, not a company.
        </ReaderParagraph>
        <ReaderPullQuote>
          The best early-stage technology isn’t necessarily the most sophisticated. It’s the most difficult to reproduce
          at the moment it begins to matter.
        </ReaderPullQuote>
        <ReaderSubHead>What to actually ask</ReaderSubHead>
        <ReaderList
          items={[
            'Is the core technical insight genuinely novel, or is this a well-executed implementation of something widely known?',
            'What IP exists today — patents filed, patents granted, trade secrets, proprietary datasets?',
            'Are there dependency risks? Does the product rely on a third-party platform, model, or supplier that could change terms, get acquired, or decide to compete directly?',
            'What is the technology’s current hard limitation, and does the team name it unprompted?',
            'Does the IP sit entirely with the company — or are there university agreements, lab arrangements, or prior employer clauses that could surface at exit?',
          ]}
        />
        <ReaderCaseStudy name="Cipher.AI — Graph RAG in a Confidential Computing Environment">
          <ReaderParagraph>
            Cipher’s core technology is a two-layer stack: a confidential computing environment that shields proprietary
            data from the underlying LLM’s owners, and a graphical querying system that improves retrieval accuracy over
            standard RAG implementations. Neither layer is unprecedented on its own. The differentiation is the
            combination, targeted at the compliance requirements of regulated sectors.
          </ReaderParagraph>
          <ReaderParagraph>
            The Trademark picture is genuinely promising. Alex’s two graph-based patents provide a real floor of
            defensibility. The open question is whether the confidential computing layer can be separately protected, or
            whether it’s built on enough open-source infrastructure that its proprietary surface area is smaller than it
            appears. There’s also a near-term product gap worth naming: the platform is currently text-only. In legaltech
            — one of the primary target markets — scanned documents are everywhere. That’s a gap a competitor could
            exploit, and the multimedia roadmap needs a real timeline attached to it.
          </ReaderParagraph>
        </ReaderCaseStudy>
        <ReaderCaseStudy name="Solara Therapeutics — A Hard-to-Reproduce Molecule">
          <ReaderParagraph>
            Solara’s technology numbers are among the strongest we evaluated: 7.1/10 overall technology risk, 8.0/10 on
            substitution risk. The drug is genuinely difficult to copy — it is the first oral heavy metal chelator
            designed to target multiple heavy metals with minimal side effects, and the synthesis complexity creates a
            natural moat that exists independently of the formal patent protection.
          </ReaderParagraph>
          <ReaderParagraph>
            The Trademark nuance is the royalty arrangement with the federal research laboratory where the core molecule
            was developed. Commercialization carries a royalty in the low single digits. That’s not inherently a problem —
            94% gross margins with the royalty included is exceptional for biotech. The question worth tracking is what
            happens if the laboratory’s institutional priorities shift, or if changes in the research agreement create
            ambiguity in the IP arrangement. The 30-year IP runway is strong. The institutional dependency is the variable
            to watch.
          </ReaderParagraph>
        </ReaderCaseStudy>
      </ReaderSubsection>

      <ReaderSubsection title="T4 · Traction + Timeline">
        <ReaderAbridged>
          Seed Stage · Early signals — and how long before they compound into something real.
        </ReaderAbridged>
        <ReaderParagraph>
          Traction is the section where investors get seduced by the wrong numbers. Revenue growth rate before
          product-market fit. User counts without retention. Letters of intent that don’t convert. Monthly actives
          measured in a cohort that signed up during a launch spike and never came back.
        </ReaderParagraph>
        <ReaderParagraph>
          The discipline is asking: what does this number actually prove? Not “is this number big,” but “what would have
          to be true about the world for this signal to exist?” At the seed stage, the most valuable traction isn’t always
          quantitative. It’s evidential. A regulated client who accepted the security terms. A government agency that let
          the team train on live data. A design partner who has integrated so deeply they would be genuinely disrupted if
          the company shut down tomorrow. These signals are much harder to manufacture than a growth curve.
        </ReaderParagraph>
        <ReaderParagraph>
          The Timeline shadow is the one most founders underestimate — not because they’re being deceptive, but because
          they’re genuinely optimistic. Government procurement cycles are long. FDA approval paths are long. Enterprise
          evaluations are long. The distance between a promising first conversation and a first dollar can stretch twelve
          to thirty-six months in ways that aren’t always obvious until you’re in them. That doesn’t change the investment
          decision. It changes the capital structure, the milestone definitions, and the Series A narrative. Those all
          need to be built around the real timeline — not the hoped-for one.
        </ReaderParagraph>
        <ReaderSubHead>What to actually ask</ReaderSubHead>
        <ReaderList
          items={[
            'What does the current traction actually prove? What does it tell you about willingness to pay?',
            'How long is the real sales cycle — not the best case, but the median and the worst case?',
            'Does the current runway cover the distance to a milestone that would be genuinely compelling to a Series A investor?',
            'Are there hard regulatory or procurement timelines (FDA, FedRAMP, government contract cycles) that are non-negotiable and have to be built into the plan?',
            'If product-market fit takes 18 months longer than projected, what does the path forward actually look like?',
          ]}
        />
        <ReaderCaseStudy name="Cipher.AI — A DoD Relationship at Pre-Seed">
          <ReaderParagraph>
            For a pre-seed company, Cipher’s traction is unusual. The DoD has allowed them to train and test on public
            sector data — a permission that large, well-resourced companies spend years earning. That’s not a vanity
            metric. It’s evidence that the buyers with the most stringent evaluation criteria in the world looked at the
            product and decided it was worth their time.
          </ReaderParagraph>
          <ReaderParagraph>
            The Timeline reality is sobering: federal procurement cycles run five years, and a competitor winning a
            re-compete bid could mean millions in lost revenue overnight. Our investment structure responded accordingly —
            a small check now, with an explicit intention to double down at seed if commercial milestones hit in the next
            few quarters. The traction proves the problem is real. The timeline requires that patience be baked into the
            capital plan, not added as a footnote.
          </ReaderParagraph>
        </ReaderCaseStudy>
        <ReaderCaseStudy name="Solara Therapeutics — Government Grants and an Accelerated Path">
          <ReaderParagraph>
            Solara’s traction is structured by the nature of biotech: Phase 1 trials completed with clear safety data, and
            a meaningful government grant from a major federal health agency. That grant isn’t just capital — it’s a signal
            of institutional validation, and it comes with a direct consequence for the Timeline. Government grant
            recipients in this regulatory category qualify for an accelerated FDA review pathway, which compresses what
            would normally be a decade-long drug approval process into something closer to half that. In a market where
            being first to approval sets the clinical standard, that acceleration directly improves Solara’s risk scores
            across multiple categories — not because the science got easier, but because the path to commercial impact got
            shorter.
          </ReaderParagraph>
          <ReaderParagraph>
            The traction picture is further bolstered by substantive interest from multiple federal agencies and
            international health organizations, and by a patient community — people diagnosed with radioactive heavy metal
            poisoning — that has been actively seeking to enroll in accelerated trials. You can’t engineer that kind of
            pull signal.
          </ReaderParagraph>
          <ReaderParagraph>
            Even with the accelerated path, the Timeline is the central investment challenge. Sarah projected $30M in
            annual government contract revenue approximately four years post-FDA approval. The math works. The hold period
            is real. The investor who needs liquidity in two years is structurally the wrong investor for this deal. The
            impact fund with a long duration mandate is the right one — and that alignment is itself part of what makes a
            term sheet functional.
          </ReaderParagraph>
        </ReaderCaseStudy>
      </ReaderSubsection>

      <ReaderSubsection title="T5 · Term Sheet + Thesis">
        <ReaderAbridged>
          Series A and Beyond · The deal — and whether it reflects a real conviction about the future.
        </ReaderAbridged>
        <ReaderParagraph>
          The term sheet is where a good investment either stays good or quietly turns bad. Valuation, dilution, pro-rata
          rights, liquidation preferences, information rights — each one is a negotiation between the investor’s need for
          protection and the founder’s need to stay motivated and in control. Bad terms don’t just hurt the current round.
          They send a signal to every investor who comes after you, and they surface in the cap table at every subsequent
          raise.
        </ReaderParagraph>
        <ReaderParagraph>
          The shadow is Thesis — and this is the one that separates a real investment conviction from a check-the-box
          exercise. A thesis isn’t a summary of what the company does. It’s a falsifiable bet about the future, built from
          three components: a market insight (why this problem is real and underserved), a timing insight (why now is the
          moment), and a team insight (why this specific group of people). Any investment missing one of those three isn’t
          a thesis. It’s a hope.
        </ReaderParagraph>
        <ReaderParagraph>
          What I’ve also come to understand is that the thesis tells you as much about the investor as it does about the
          company. Different firms weight the 5Ts differently — and those weightings are a direct expression of what a
          fund was built to do.
        </ReaderParagraph>
        <ReaderParagraph>
          The VCs focused on fund returns and DPI weight TAM and Term Sheet most heavily. They want to know the market is
          big enough and the economics are structured correctly before they care much about anything else. The deep tech
          funds flip the equation: Technology and Technical Depth in the founding team dominate their evaluation. They’re
          betting on what can be built that couldn’t be built before, and they’ll tolerate a smaller initial market or a
          messier term sheet if the technical insight is genuinely novel. The people-first funds — and I’ve worked with a
          few — anchor almost everything in Team: the conviction that the right founding team will find the right market
          and build the right product, even if those things aren’t obvious yet.
        </ReaderParagraph>
        <ReaderParagraph>
          None of these weightings is wrong. But they produce different decisions from the same information. A deal that’s
          a pass for a returns-focused fund might be the lead investment for a deeptech fund. What matters is that the
          thesis is explicit — so the evaluation is honest, and so the founder knows what they’re actually signing up for
          when they take the check.
        </ReaderParagraph>
        <ReaderSubHead>What to actually ask</ReaderSubHead>
        <ReaderList
          items={[
            'What is the post-money valuation, and is it defensible against comps at this stage and in this sector?',
            'What does the full cap table look like — including SAFEs and convertible notes that haven’t converted yet?',
            'How does this deal fit the fund’s mandate, check size, and ownership targets?',
            'What specific milestones, hit in what timeframe, would justify a follow-on at the next round?',
            'What is the investment thesis in one sentence — not what the company does, but what you believe about the future that makes this worth backing?',
            'Which of the 5Ts does this fund weight most heavily — and does this deal score well on those dimensions specifically?',
          ]}
        />
        <ReaderCaseStudy name="Cipher.AI — A $1.5M Raise in a Competitive AI Market">
          <ReaderParagraph>
            Cipher is raising a $1.5M pre-seed round. Our recommendation was a small check, non-lead — deliberate
            portfolio construction, not hedging. The primary risk at this stage is execution risk: can they close
            government clients before a well-funded competitor establishes the category? That question resolves in two to
            three quarters. Taking a large position before it resolves concentrates downside without changing the upside.
          </ReaderParagraph>
          <ReaderParagraph>
            <strong>The Thesis:</strong> the recent AI investment cycle has over-indexed on the application layer and
            foundation model plays, leaving a gap in infrastructure. Cipher’s combination of graph-based retrieval and
            confidential computing targets a segment of the federal market that large AI players are structurally
            incentivized to avoid — because their business model depends on the very data they’d be asked not to touch.
            That structural dynamic is the insight. If Cipher converts the DoD relationship into a repeatable procurement
            mechanism before a competitor establishes the category, they become the default. That’s the bet.
          </ReaderParagraph>
        </ReaderCaseStudy>
        <ReaderCaseStudy name="Solara Therapeutics — Impact Capital and Investor Fit">
          <ReaderParagraph>
            Solara is raising $3M total, with $1.8M already committed from angel investors and impact VCs. The de-risking
            is real — having $1.8M in at terms gives the remaining raise a floor and signals that sophisticated investors
            have already done the work. The 94% gross margin on the compound (royalty included) is exceptional for biotech
            and reflects a manufacturing setup that defers significant capital expenditure in the near term.
          </ReaderParagraph>
          <ReaderParagraph>
            The Thesis question here is really an investor-fit question — and it’s a good illustration of how weightings
            matter. A returns-focused fund running DPI calculations on a four-year hold with multiple follow-on capital
            requirements will likely pass. A deeptech fund excited about a genuinely novel synthesis process will want to
            dig in on the IP. An impact fund with a healthcare mandate and a long duration will look at the risk matrix
            score (65.1/90), the government validation, and the patient-pull signal, and recognize this is exactly the kind
            of deal their fund was built to back. The term sheet doesn’t just structure the economics. It reveals whether
            the investor and the company are actually aligned on what success looks like.
          </ReaderParagraph>
        </ReaderCaseStudy>
      </ReaderSubsection>

      <ReaderClose title="The 5Ts aren’t a checklist. They’re a lens.">
        <ReaderParagraph>
          My family friend didn’t give me the framework so I’d have something to fill in. He gave it to me so I’d have
          something to push against. Every deal memo I’ve written has a section I wanted to abbreviate — the one where the
          risk is real, the numbers are uncomfortable, or the honest answer is “we don’t actually know yet.” The 5Ts, and
          their shadows, exist to make those sections unavoidable.
        </ReaderParagraph>
        <ReaderParagraph>
          The best investment decisions I’ve seen don’t resolve all uncertainty. They name it precisely. A good thesis
          isn’t “this company will succeed.” It’s “I believe this specific thing about the future, and if I’m right, this
          company is exactly the right bet.”
        </ReaderParagraph>
        <ReaderParagraph>The rest is execution — which, unfortunately, no framework can guarantee.</ReaderParagraph>
        <ReaderRecap
          label="5Ts and their shadows"
          pills={[
            'TAM + Threats',
            'Team = Talent + Trust + Depth',
            'Technology + Trademark',
            'Traction + Timeline',
            'Term Sheet + Thesis',
          ]}
        />
      </ReaderClose>
    </BitsizeReaderLayout>
  );
}
