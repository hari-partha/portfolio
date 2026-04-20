import { EditorialCaseStudy, EditorialSection, EditorialTemplate } from '@/components/blog/EditorialTemplate';

const tocItems = [
  { number: 'T1', label: 'TAM', sub: 'Threats · Angel' },
  { number: 'T2', label: 'Team', sub: 'Talent + Trust + Depth · Angel' },
  { number: 'T3', label: 'Technology', sub: 'Trademark · Pre-seed' },
  { number: 'T4', label: 'Traction', sub: 'Timeline · Seed' },
  { number: 'T5', label: 'Term Sheet', sub: 'Thesis · Series A+' },
];

export default function FiveTsFrameworkPostPage() {
  return (
    <EditorialTemplate
      backToMusings
      coverLabel="A Scout's Playbook"
      title={
        <>
          The <span style={{ color: '#93c5fd' }}>5Ts</span>: A Framework for Evaluating Early-Stage Companies
        </>
      }
      subtitle="What I learned from a family friend, two years of deal memos, and the questions I almost skipped."
      authorName="Hari Parthasarathy"
      authorMeta="MET '26, UC Berkeley · Independent Investor & VC Scout"
      introKicker="The Framework at a Glance"
      introBandText="Each T maps to a stage question — from angel conviction to Series A economics."
      tocItems={tocItems}
      footer="Hari Parthasarathy · MET '26, UC Berkeley · Independent Investor & VC Scout"
    >
      <section className="editorial-intro-section">
        <p className="editorial-intro-lead">
          I was sitting across from a family friend — someone who had spent decades writing checks and sitting on boards — when he
          asked what I was actually interested in doing after school. I said venture capital. Vague enough that it was clear I
          hadn&apos;t thought it through.
        </p>
        <p className="editorial-p">
          He didn&apos;t hand me a book or a reading list. He just said: &quot;Let me give you the five-word framework. This is the
          foundation. Everything else builds on this.&quot; TAM. Team. Technology. Traction. Term Sheet.
        </p>
        <p className="editorial-p">
          He walked me through the ladder. Angel investing, he explained, comes down to two questions: is the market real, and is
          this the right person to build in it? TAM and Team. That&apos;s the whole thesis at that stage. Add Technology at pre-seed —
          now you need to know they can actually build the thing. By seed, Traction enters the picture: show me evidence that real
          humans want this product. And by Series A, you&apos;re structuring a deal with real economic consequences. That&apos;s the
          Term Sheet.
        </p>
        <p className="editorial-p">
          It stuck. And it became the catalyst for what turned into two years of scouting deals, writing memos, and sitting across from
          founders who had been working on a problem far longer than I&apos;d been paying attention to it.
        </p>
        <p className="editorial-p">
          What I found, in practice, is that each T has a shadow. A second-order question that shows up when things go sideways, that
          experienced investors have quietly internalized but rarely write down. TAM without Threats is a ceiling without walls. Team
          without Talent, Trust, and Technical Depth is a charismatic founder who can&apos;t build around themselves. Technology
          without Trademark is an idea anyone can copy once you prove it works. Traction without a Timeline is a promising number with
          no path. And a Term Sheet without a Thesis is a check written without a real reason.
        </p>
        <p className="editorial-p">This is my attempt to name those shadows explicitly.</p>
        <p className="editorial-note">
          Cipher and Solara are fictional company names. The case studies below are composites based on real diligence I worked on,
          with identifying details changed.
        </p>
      </section>

      <EditorialSection
        badge="T1"
        title="TAM"
        subTag="+ Threats"
        subtitle="Angel Stage · Total Addressable Market — and everything that could quietly eat into it"
      >
        <p className="editorial-p">
          TAM is the first question because it sets the ceiling. If this company executes perfectly — best product, best team, no
          mistakes — how big does the prize get? At the angel stage, you&apos;re not betting on perfect execution. You&apos;re betting
          on whether perfection could even matter. A $40M market with a flawless product is a good business. It is not a venture return.
        </p>
        <p className="editorial-p">
          The trap is that founders know this. So they learn to present TAM in the most favorable light possible: they find the
          largest defensible framing for their market, lead with it, and bury the Serviceable Addressable Market and Serviceable
          Obtainable Market somewhere in the appendix. The gap between TAM and SOM is where a lot of seed memos quietly hide the real
          risk.
        </p>
        <p className="editorial-p">
          This is where Threats enters — and Threats is a bigger category than most people treat it as. Most investors use it as a
          synonym for competitive analysis. Who else is in this market? What does the moat look like in year three? Those questions
          matter. But some of the most destructive threats I&apos;ve seen have nothing to do with competition.
        </p>
        <p className="editorial-p">
          I worked with a company that had strong product-market fit, a growing customer base, and real momentum. What killed them
          wasn&apos;t a competitor. It was that a critical third-party partner — a company whose infrastructure they had quietly built
          their entire go-to-market on top of — ran into its own crisis. Negative press, a stock collapse, a rapid pivot in their
          business priorities. The partnership got pulled. Overnight, the distribution channel that had been generating the
          company&apos;s best leads disappeared. They had three months of runway and nowhere to go. The company shut down.
        </p>
        <p className="editorial-p">
          Threats can be that simple, and that unpredictable. A key hire leaving. A regulatory change in a market you were counting
          on. A supplier constraint. A customer concentration risk that nobody flagged because the big account looked like a feature,
          not a vulnerability. You can&apos;t predict all of it. But you can stress-test the business model: what are the two or three
          things outside this team&apos;s control that, if they went wrong, would make this company&apos;s current plan unworkable?
          And how much runway exists to survive a bad surprise?
        </p>
        <div className="editorial-pull-quote">
          <p>
            &quot;The worst competitive analysis isn&apos;t one that gets the competition wrong. It&apos;s one that lists every
            competitor and then explains why none of them matter — while missing the partnership that could walk out the door.&quot;
          </p>
        </div>
        <h3 className="editorial-h3">What to actually ask</h3>
        <ul className="editorial-questions">
          <li>What is the SAM, not just the TAM? Who exactly are the buyers, and how do they currently purchase?</li>
          <li>Is the market fragmented (easier to enter, harder to dominate) or consolidated (harder to enter, winner-take-most)?</li>
          <li>What third-party dependencies does this business model rely on? What happens if one of them disappears?</li>
          <li>
            Does the current runway cover not just the roadmap, but a plausible bad surprise — a lost partner, a delayed contract, a
            slower sales cycle?
          </li>
          <li>What would it take for a dominant incumbent to enter this market in 18 months? Is there a structural reason they won&apos;t bother?</li>
          <li>What does the competitive moat look like in year three — and is it still intact if the market shifts?</li>
        </ul>
        <EditorialCaseStudy name="Cipher.AI — Confidential AI for Regulated Sectors">
          <p className="editorial-p">
            Cipher operates in AI data security, targeting federal, legal, and financial services clients. The TAM framing is a classic
            trap — &quot;AI for enterprise&quot; is a massive market, and it&apos;s easy to anchor the pitch there. But the real SAM is
            much narrower: regulated sectors that structurally cannot use commercial LLMs because of data sovereignty requirements.
            DoD-level clients. Legal firms with iron-clad confidentiality obligations. Government intelligence agencies. That&apos;s a
            small wedge — but almost no one is serving it.
          </p>
          <p className="editorial-p">
            The Threats picture at the competitive level looks manageable: most direct competitors target enterprise B2B clients, not
            regulated federal sectors, and large AI companies are actually disincentivized from entering this market because their
            core business model depends on the very data they&apos;d be asked not to touch. The more serious Threat is dependency risk:
            Cipher&apos;s go-to-market at this stage rests heavily on an early DoD relationship. That relationship is an asset — but it
            is also a single point of failure. If it stalls or shifts, the company&apos;s traction story changes completely. Three to six
            months of runway beyond that scenario is the right ask.
          </p>
        </EditorialCaseStudy>
        <EditorialCaseStudy name="Solara Therapeutics — Heavy Metal Chelation">
          <p className="editorial-p">
            Solara&apos;s TAM sits at roughly $7.3 billion, addressing over a billion people worldwide affected by heavy metal poisoning.
            Non-cyclical demand. Lead poisoning doesn&apos;t follow the S&amp;P 500.
          </p>
          <p className="editorial-p">
            The Threats analysis is where it gets specific. The competitive field looks manageable — about six players, none at a
            comparable development stage. But Solara&apos;s drug requires FDA approval before it can be sold commercially, which means
            the real Threat isn&apos;t today&apos;s competitors. It&apos;s drugs currently in pre-testing phases that could hit
            commercialization on a parallel track. There&apos;s also a dependency risk worth naming: the manufacturing process relies on
            infrastructure at a federal research laboratory, and the royalty arrangement tied to that relationship is a variable that
            could shift if institutional priorities change. The 30-year IP runway is a strong backstop. The institutional dependency is
            the thing to watch.
          </p>
        </EditorialCaseStudy>
      </EditorialSection>

      <EditorialSection
        badge="T2"
        title="Team = Talent + Trust + Technical Depth"
        subtitle="Angel Stage · The founders you meet — and whether they can build everything the company needs to become"
      >
        <p className="editorial-p">
          If there&apos;s one thing I&apos;ve taken away from two years of evaluating deals, it&apos;s this: Team is the most important
          T. Not because the others don&apos;t matter, but because a great team can find a better market, rebuild the technology, and
          renegotiate a bad term sheet. A weak team can&apos;t be fixed by any of the other four.
        </p>
        <p className="editorial-p">
          Every VC memo writes the same Team section: &quot;strong domain expertise,&quot; &quot;complementary skill sets,&quot;
          &quot;serial entrepreneur.&quot; These phrases describe a founding team at a single point in time, in a single room, with
          their best foot forward. They tell you almost nothing about whether this team can build the organization it will need to be in
          three years.
        </p>
        <p className="editorial-p">
          What actually matters is an equation with three parts. <strong>Team = Talent + Trust + Technical Depth</strong>
        </p>
        <p className="editorial-p">
          Talent is the founding team&apos;s background: the experiences, networks, and hard-won competencies each person brings. But
          there&apos;s a pattern worth knowing how to read. Some founders have held five roles at four companies in six years. On paper
          it looks like range. In practice it often means they never stayed anywhere long enough to build real depth. They observed the
          work more than they did it. The title accumulated. The roots didn&apos;t. When I see that kind of resume, I push harder on
          what they actually built versus what they witnessed being built.
        </p>
        <p className="editorial-p">
          Trust is the values and culture the founding team has built between themselves. This one is harder to evaluate from the
          outside, but it shows up in how founders talk about disagreements, how they describe making hard decisions, and whether they can
          tell you something honest about the other person&apos;s weaknesses without being prompted. Cofounder relationships are the
          single most underrated risk in early-stage investing. I&apos;ve seen technically strong companies fall apart because two
          people who met at a hackathon and decided to start a company discovered, twelve months in, that their visions weren&apos;t
          actually aligned. Trust can&apos;t be manufactured on a term sheet. It&apos;s either there or it&apos;s being held together
          by momentum — and momentum runs out.
        </p>
        <p className="editorial-p">
          Technical Depth is the third variable and the one that most clearly separates a team that can iterate from one that will
          stall. How well does the founding team know their domain? Not in a general &quot;I&apos;ve worked in this industry&quot; way —
          in a specific, what-are-the-three-hardest-unsolved-problems-in-this-space way. The best founders I&apos;ve sat across from
          could tell me, without hesitation, exactly where their current implementation was wrong and what they were going to do about
          it. The ones who couldn&apos;t tended to present a more polished story, but a shallower one.
        </p>
        <h3 className="editorial-h3">What to actually ask</h3>
        <ul className="editorial-questions">
          <li>
            What are the three most important hires in the next 12 months? Can the founders say specifically why those roles, and do they
            know how to recruit for them?
          </li>
          <li>
            For each major domain the company needs to succeed in — technical, commercial, operational — who on the founding team owns
            it, and is that real ownership or nominal?
          </li>
          <li>How long have the cofounders actually worked together? Have they been through something hard together and come out the other side?</li>
          <li>Where are the genuine gaps in the founding team&apos;s knowledge? Are they honest about this, and is there a plan to close it?</li>
          <li>Can you find someone who has worked with these founders before — not someone they introduced you to?</li>
        </ul>
        <EditorialCaseStudy name="Cipher.AI — Two-Person Founding Team">
          <p className="editorial-p">
            Cipher&apos;s two founders are, individually, strong. Maya (CEO) spent years managing data analytics pipelines for Fortune
            500 clients at a major consultancy. Alex (CTO) built knowledge graph infrastructure at a leading search company, led a graph
            database project at a high-growth mobility platform, and holds two graph-based patents — in the exact technical space Cipher
            operates in. Talent: present.
          </p>
          <p className="editorial-p">
            The gaps surface quickly. All technical depth lives with Alex. Maya&apos;s go-to-market background is in analytics
            pipelines, not enterprise software sales — and especially not the relationship-driven, multi-year procurement cycles that
            federal clients require. That&apos;s not a disqualifier. It&apos;s a hiring plan: a COO, a CMO with public sector experience,
            and early engineering hires are preconditions, not nice-to-haves.
          </p>
          <p className="editorial-p">
            On Trust: we only met Maya. Alex wasn&apos;t on the call. In a two-person company, that gap matters. You want to see both
            founders in the room — not because one is more important than the other, but because the dynamic between them is part of
            what you&apos;re evaluating. How they handle the meeting together tells you more than either resume does alone.
          </p>
        </EditorialCaseStudy>
        <EditorialCaseStudy name="Solara Therapeutics — Tight-Knit Three-Person Team">
          <p className="editorial-p">
            Solara&apos;s founding team maps almost cleanly onto the company&apos;s three hardest challenges. The first founder is a
            serial biotech entrepreneur with prior company-building experience. Sarah (co-founder) is a former life sciences consultant
            who led commercial diligence for major pharma transactions. The third is a professor and principal investigator at a
            federal research laboratory, which gives the company both scientific credibility and institutional access that would take
            most startups years to build.
          </p>
          <p className="editorial-p">
            Talent, Trust, and Technical Depth all score well. The team&apos;s coordination in the meeting wasn&apos;t rehearsed — they
            completed each other&apos;s thoughts in a way that suggested they&apos;d been through pressure together, not just sat in the
            same pitch sessions. Sarah mentioned, in passing, that she&apos;d turned down a return offer from her former firm to stay
            with the company. That detail is worth more than most things on a slide deck. It&apos;s a data point about conviction.
          </p>
          <p className="editorial-p">
            The Talent gap that exists is stage-appropriate and downstream: the team of three is right for clinical trials. It won&apos;t
            be right for manufacturing scale-up. Operational and regulatory depth will need to be added before FDA approval, not after.
            That&apos;s a board-level conversation to have early.
          </p>
        </EditorialCaseStudy>
      </EditorialSection>

      <EditorialSection
        badge="T3"
        title="Technology"
        subTag="+ Trademark"
        subtitle="Pre-Seed Stage · The product — and whether it can actually be owned"
      >
        <p className="editorial-p">
          Technology evaluation at the pre-seed stage is a strange exercise. You are being asked to assess a product that mostly
          doesn&apos;t exist yet, built by a team that will have to rebuild large parts of it once they find product-market fit, in a
          market that doesn&apos;t fully know what it wants. And yet you have to form a view.
        </p>
        <p className="editorial-p">
          The real question isn&apos;t whether the current implementation is good. It&apos;s whether the founder understands the
          problem deeply enough that their implementation is a credible starting point. Technical depth shows up in specificity: in the
          way someone describes what the system can&apos;t do yet, in the honest accounting of what&apos;s been hardcoded versus what&apos;s
          actually generalized, in the willingness to say &quot;we haven&apos;t solved X yet&quot; without being prompted.
        </p>
        <p className="editorial-p">
          The shadow is Trademark — and I use that word broadly. Patents, trade secrets, proprietary datasets, regulatory approvals that
          function as barriers to entry. The question isn&apos;t just &quot;does this work?&quot; It&apos;s &quot;can this be owned?&quot;
          A product that works brilliantly but can be replicated in six months by a well-funded competitor is a feature, not a company.
        </p>
        <div className="editorial-pull-quote">
          <p>
            &quot;The best early-stage technology isn&apos;t necessarily the most sophisticated. It&apos;s the most difficult to
            reproduce at the moment it begins to matter.&quot;
          </p>
        </div>
        <h3 className="editorial-h3">What to actually ask</h3>
        <ul className="editorial-questions">
          <li>Is the core technical insight genuinely novel, or is this a well-executed implementation of something widely known?</li>
          <li>What IP exists today — patents filed, patents granted, trade secrets, proprietary datasets?</li>
          <li>
            Are there dependency risks? Does the product rely on a third-party platform, model, or supplier that could change terms, get
            acquired, or decide to compete directly?
          </li>
          <li>What is the technology&apos;s current hard limitation, and does the team name it unprompted?</li>
          <li>
            Does the IP sit entirely with the company — or are there university agreements, lab arrangements, or prior employer clauses
            that could surface at exit?
          </li>
        </ul>
        <EditorialCaseStudy name="Cipher.AI — Graph RAG in a Confidential Computing Environment">
          <p className="editorial-p">
            Cipher&apos;s core technology is a two-layer stack: a confidential computing environment that shields proprietary data from
            the underlying LLM&apos;s owners, and a graphical querying system that improves retrieval accuracy over standard RAG
            implementations. Neither layer is unprecedented on its own. The differentiation is the combination, targeted at the
            compliance requirements of regulated sectors.
          </p>
          <p className="editorial-p">
            The Trademark picture is genuinely promising. Alex&apos;s two graph-based patents provide a real floor of defensibility. The
            open question is whether the confidential computing layer can be separately protected, or whether it&apos;s built on enough
            open-source infrastructure that its proprietary surface area is smaller than it appears. There&apos;s also a near-term
            product gap worth naming: the platform is currently text-only. In legaltech — one of the primary target markets — scanned
            documents are everywhere. That&apos;s a gap a competitor could exploit, and the multimedia roadmap needs a real timeline
            attached to it.
          </p>
        </EditorialCaseStudy>
        <EditorialCaseStudy name="Solara Therapeutics — A Hard-to-Reproduce Molecule">
          <p className="editorial-p">
            Solara&apos;s technology numbers are among the strongest we evaluated: 7.1/10 overall technology risk, 8.0/10 on substitution
            risk. The drug is genuinely difficult to copy — it is the first oral heavy metal chelator designed to target multiple heavy
            metals with minimal side effects, and the synthesis complexity creates a natural moat that exists independently of the
            formal patent protection.
          </p>
          <p className="editorial-p">
            The Trademark nuance is the royalty arrangement with the federal research laboratory where the core molecule was developed.
            Commercialization carries a royalty in the low single digits. That&apos;s not inherently a problem — 94% gross margins with
            the royalty included is exceptional for biotech. The question worth tracking is what happens if the laboratory&apos;s
            institutional priorities shift, or if changes in the research agreement create ambiguity in the IP arrangement. The 30-year
            IP runway is strong. The institutional dependency is the variable to watch.
          </p>
        </EditorialCaseStudy>
      </EditorialSection>

      <EditorialSection
        badge="T4"
        title="Traction"
        subTag="+ Timeline"
        subtitle="Seed Stage · Early signals — and how long before they compound into something real"
      >
        <p className="editorial-p">
          Traction is the section where investors get seduced by the wrong numbers. Revenue growth rate before product-market fit. User
          counts without retention. Letters of intent that don&apos;t convert. Monthly actives measured in a cohort that signed up during
          a launch spike and never came back.
        </p>
        <p className="editorial-p">
          The discipline is asking: what does this number actually prove? Not &quot;is this number big,&quot; but &quot;what would have
          to be true about the world for this signal to exist?&quot; At the seed stage, the most valuable traction isn&apos;t always
          quantitative. It&apos;s evidential. A regulated client who accepted the security terms. A government agency that let the team
          train on live data. A design partner who has integrated so deeply they would be genuinely disrupted if the company shut down
          tomorrow. These signals are much harder to manufacture than a growth curve.
        </p>
        <p className="editorial-p">
          The Timeline shadow is the one most founders underestimate — not because they&apos;re being deceptive, but because they&apos;re
          genuinely optimistic. Government procurement cycles are long. FDA approval paths are long. Enterprise evaluations are long. The
          distance between a promising first conversation and a first dollar can stretch twelve to thirty-six months in ways that
          aren&apos;t always obvious until you&apos;re in them. That doesn&apos;t change the investment decision. It changes the
          capital structure, the milestone definitions, and the Series A narrative. Those all need to be built around the real timeline
          — not the hoped-for one.
        </p>
        <h3 className="editorial-h3">What to actually ask</h3>
        <ul className="editorial-questions">
          <li>What does the current traction actually prove? What does it tell you about willingness to pay?</li>
          <li>How long is the real sales cycle — not the best case, but the median and the worst case?</li>
          <li>Does the current runway cover the distance to a milestone that would be genuinely compelling to a Series A investor?</li>
          <li>
            Are there hard regulatory or procurement timelines (FDA, FedRAMP, government contract cycles) that are non-negotiable and have
            to be built into the plan?
          </li>
          <li>If product-market fit takes 18 months longer than projected, what does the path forward actually look like?</li>
        </ul>
        <EditorialCaseStudy name="Cipher.AI — A DoD Relationship at Pre-Seed">
          <p className="editorial-p">
            For a pre-seed company, Cipher&apos;s traction is unusual. The DoD has allowed them to train and test on public sector data
            — a permission that large, well-resourced companies spend years earning. That&apos;s not a vanity metric. It&apos;s evidence
            that the buyers with the most stringent evaluation criteria in the world looked at the product and decided it was worth their
            time.
          </p>
          <p className="editorial-p">
            The Timeline reality is sobering: federal procurement cycles run five years, and a competitor winning a re-compete bid
            could mean millions in lost revenue overnight. Our investment structure responded accordingly — a small check now, with an
            explicit intention to double down at seed if commercial milestones hit in the next few quarters. The traction proves the
            problem is real. The timeline requires that patience be baked into the capital plan, not added as a footnote.
          </p>
        </EditorialCaseStudy>
        <EditorialCaseStudy name="Solara Therapeutics — Government Grants and an Accelerated Path">
          <p className="editorial-p">
            Solara&apos;s traction is structured by the nature of biotech: Phase 1 trials completed with clear safety data, and a
            meaningful government grant from a major federal health agency. That grant isn&apos;t just capital — it&apos;s a signal of
            institutional validation, and it comes with a direct consequence for the Timeline. Government grant recipients in this
            regulatory category qualify for an accelerated FDA review pathway, which compresses what would normally be a decade-long
            drug approval process into something closer to half that. In a market where being first to approval sets the clinical
            standard, that acceleration directly improves Solara&apos;s risk scores across multiple categories — not because the science
            got easier, but because the path to commercial impact got shorter.
          </p>
          <p className="editorial-p">
            The traction picture is further bolstered by substantive interest from multiple federal agencies and international health
            organizations, and by a patient community — people diagnosed with radioactive heavy metal poisoning — that has been actively
            seeking to enroll in accelerated trials. You can&apos;t engineer that kind of pull signal.
          </p>
          <p className="editorial-p">
            Even with the accelerated path, the Timeline is the central investment challenge. Sarah projected $30M in annual government
            contract revenue approximately four years post-FDA approval. The math works. The hold period is real. The investor who needs
            liquidity in two years is structurally the wrong investor for this deal. The impact fund with a long duration mandate is the
            right one — and that alignment is itself part of what makes a term sheet functional.
          </p>
        </EditorialCaseStudy>
      </EditorialSection>

      <EditorialSection
        badge="T5"
        title="Term Sheet"
        subTag="+ Thesis"
        subtitle="Series A and Beyond · The deal — and whether it reflects a real conviction about the future"
      >
        <p className="editorial-p">
          The term sheet is where a good investment either stays good or quietly turns bad. Valuation, dilution, pro-rata rights,
          liquidation preferences, information rights — each one is a negotiation between the investor&apos;s need for protection and
          the founder&apos;s need to stay motivated and in control. Bad terms don&apos;t just hurt the current round. They send a signal
          to every investor who comes after you, and they surface in the cap table at every subsequent raise.
        </p>
        <p className="editorial-p">
          The shadow is Thesis — and this is the one that separates a real investment conviction from a check-the-box exercise. A thesis
          isn&apos;t a summary of what the company does. It&apos;s a falsifiable bet about the future, built from three components: a
          market insight (why this problem is real and underserved), a timing insight (why now is the moment), and a team insight (why
          this specific group of people). Any investment missing one of those three isn&apos;t a thesis. It&apos;s a hope.
        </p>
        <p className="editorial-p">
          What I&apos;ve also come to understand is that the thesis tells you as much about the investor as it does about the company.
          Different firms weight the 5Ts differently — and those weightings are a direct expression of what a fund was built to do.
        </p>
        <p className="editorial-p">
          The VCs focused on fund returns and DPI weight TAM and Term Sheet most heavily. They want to know the market is big enough and
          the economics are structured correctly before they care much about anything else. The deep tech funds flip the equation:
          Technology and Technical Depth in the founding team dominate their evaluation. They&apos;re betting on what can be built that
          couldn&apos;t be built before, and they&apos;ll tolerate a smaller initial market or a messier term sheet if the technical insight
          is genuinely novel. The people-first funds — and I&apos;ve worked with a few — anchor almost everything in Team: the conviction
          that the right founding team will find the right market and build the right product, even if those things aren&apos;t obvious yet.
        </p>
        <p className="editorial-p">
          None of these weightings is wrong. But they produce different decisions from the same information. A deal that&apos;s a pass for
          a returns-focused fund might be the lead investment for a deeptech fund. What matters is that the thesis is explicit — so the
          evaluation is honest, and so the founder knows what they&apos;re actually signing up for when they take the check.
        </p>
        <h3 className="editorial-h3">What to actually ask</h3>
        <ul className="editorial-questions">
          <li>What is the post-money valuation, and is it defensible against comps at this stage and in this sector?</li>
          <li>What does the full cap table look like — including SAFEs and convertible notes that haven&apos;t converted yet?</li>
          <li>How does this deal fit the fund&apos;s mandate, check size, and ownership targets?</li>
          <li>What specific milestones, hit in what timeframe, would justify a follow-on at the next round?</li>
          <li>
            What is the investment thesis in one sentence — not what the company does, but what you believe about the future that makes
            this worth backing?
          </li>
          <li>Which of the 5Ts does this fund weight most heavily — and does this deal score well on those dimensions specifically?</li>
        </ul>
        <EditorialCaseStudy name="Cipher.AI — A $1.5M Raise in a Competitive AI Market">
          <p className="editorial-p">
            Cipher is raising a $1.5M pre-seed round. Our recommendation was a small check, non-lead — deliberate portfolio construction,
            not hedging. The primary risk at this stage is execution risk: can they close government clients before a well-funded
            competitor establishes the category? That question resolves in two to three quarters. Taking a large position before it
            resolves concentrates downside without changing the upside.
          </p>
          <p className="editorial-p">
            <strong>The Thesis:</strong> the recent AI investment cycle has over-indexed on the application layer and foundation model
            plays, leaving a gap in infrastructure. Cipher&apos;s combination of graph-based retrieval and confidential computing targets a
            segment of the federal market that large AI players are structurally incentivized to avoid — because their business model
            depends on the very data they&apos;d be asked not to touch. That structural dynamic is the insight. If Cipher converts the DoD
            relationship into a repeatable procurement mechanism before a competitor establishes the category, they become the default.
            That&apos;s the bet.
          </p>
        </EditorialCaseStudy>
        <EditorialCaseStudy name="Solara Therapeutics — Impact Capital and Investor Fit">
          <p className="editorial-p">
            Solara is raising $3M total, with $1.8M already committed from angel investors and impact VCs. The de-risking is real —
            having $1.8M in at terms gives the remaining raise a floor and signals that sophisticated investors have already done the
            work. The 94% gross margin on the compound (royalty included) is exceptional for biotech and reflects a manufacturing setup
            that defers significant capital expenditure in the near term.
          </p>
          <p className="editorial-p">
            The Thesis question here is really an investor-fit question — and it&apos;s a good illustration of how weightings matter. A
            returns-focused fund running DPI calculations on a four-year hold with multiple follow-on capital requirements will likely
            pass. A deeptech fund excited about a genuinely novel synthesis process will want to dig in on the IP. An impact fund with a
            healthcare mandate and a long duration will look at the risk matrix score (65.1/90), the government validation, and the
            patient-pull signal, and recognize this is exactly the kind of deal their fund was built to back. The term sheet doesn&apos;t
            just structure the economics. It reveals whether the investor and the company are actually aligned on what success looks like.
          </p>
        </EditorialCaseStudy>
      </EditorialSection>

      <section className="editorial-close">
        <div className="editorial-close-mark">✦</div>
        <h2 className="editorial-section-title">The 5Ts aren&apos;t a checklist. They&apos;re a lens.</h2>
        <p className="editorial-p">
          My family friend didn&apos;t give me the framework so I&apos;d have something to fill in. He gave it to me so I&apos;d have
          something to push against. Every deal memo I&apos;ve written has a section I wanted to abbreviate — the one where the risk is
          real, the numbers are uncomfortable, or the honest answer is &quot;we don&apos;t actually know yet.&quot; The 5Ts, and their
          shadows, exist to make those sections unavoidable.
        </p>
        <p className="editorial-p">
          The best investment decisions I&apos;ve seen don&apos;t resolve all uncertainty. They name it precisely. A good thesis isn&apos;t
          &quot;this company will succeed.&quot; It&apos;s &quot;I believe this specific thing about the future, and if I&apos;m right,
          this company is exactly the right bet.&quot;
        </p>
        <p className="editorial-p">The rest is execution — which, unfortunately, no framework can guarantee.</p>
        <div className="editorial-recap" aria-label="5Ts and their shadows">
          <div className="editorial-recap-row editorial-recap-row--three">
            {['TAM + Threats', 'Team = Talent + Trust + Depth', 'Technology + Trademark'].map((pill) => (
              <span key={pill} className="editorial-recap-pill">
                {pill}
              </span>
            ))}
          </div>
          <div className="editorial-recap-row editorial-recap-row--two">
            {['Traction + Timeline', 'Term Sheet + Thesis'].map((pill) => (
              <span key={pill} className="editorial-recap-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </EditorialTemplate>
  );
}
