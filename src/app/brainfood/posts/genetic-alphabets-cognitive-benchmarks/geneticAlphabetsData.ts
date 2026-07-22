export const GENETIC_ALPHABETS = {
  pullQuote:
    'The convergence happening right now is not a software story that happens to involve biology. It\u2019s a biology story that AI is finally capable of telling.',
  introParagraphs: [
    'AI is changing the world, yet deeptech domains like biotech haven\u2019t historically seen great success with the modern LLM architecture. Are the new wave of GenAI tools changing this narrative, or are we entitled to continued skepticism?',
    'In 2025, AI firms captured over $258 billion in global venture capital spending — over 61% of all capital deployed worldwide! The concentration is well-documented: compute infrastructure accounted for ~$109 billion, foundation model labs another ~$80 billion. OpenAI and Anthropic alone accounted for roughly 14% of all global venture investments!',
    'To me, this is all fair game, but for the average bioengineer, it\u2019s adjacent but not quite fully relevant. According to Bessemer\u2019s accounting, only about $0.22 of every AI dollar went to healthcare. Only $0.22 of every AI dollar in a sector representing over 18% of US GDP! Staggering!',
    'That gap is either a massive pricing discrepancy or a massive opportunity. As a bioengineer who\u2019s spent the last four years sitting at the intersection of life sciences, AI, and emerging technologies, and the capital markets that power the two domains, I\u2019m betting on the latter.',
  ],
  stats: [
    { value: '$0.22', label: 'of every AI dollar → AI for Health' },
    { value: '82.6%', label: 'Claude on expert-level bio (BioMysteryBench)' },
    { value: '350+', label: 'biological AI models published by 2024' },
    { value: '$2.1B', label: 'Isomorphic Labs Series B (2026)' },
  ],
  sections: [
    {
      title: "What's Changed",
      paragraphs: [
        'Google has shipped what amounts to the most complete AI-for-science stack currently on the market. Alphafold 3 (a DeepMind × Isomorphic Labs collaboration) extended structural predictions to nearly all essential biomolecules. AlphaGenome, DeepMind\u2019s recent release published to Nature earlier this year, reads up to one million base pairs of DNA and predicts regulatory effects across over 98% of the non-coding genome — the still somewhat nebulous \u201cdark matter\u201d where most disease-linked variants tend to be found.',
        'AI Co-Scientist, also published in Nature this past month, is a multi-agent hypothesis generator that rederived (independently) an unpublished antimicrobial mechanism that took researchers nearly a decade to find! Not to mention, the very same platform generated cancer immunotherapy hypotheses that were later validated in living human cells!',
        'Couple this with external AI LLM tools like ESM 3, or Evo 2 by the Arc Institute that recently populated the open source stream, and suddenly, this is a very different conversation we are having about bio-based LLMs than even just a year ago.',
        'But Google is known to foray into different verticals, especially in health. Verily, Calico Labs, and even DeepMind\u2019s own explorations with MedPaLM 2 as a defining health engine make it quite intuitive to see their leap to the bench. Perhaps a more intriguing signal is Anthropic.',
        'Claude is a generalist model. Unlike the Alpha suite Google has released, it isn\u2019t purpose-built for healthcare, biotech, or even technical research. And yet, on the BioMysteryBench — 99 expert-written questions on real, noisy biological datasets — Claude benchmarked with 82.6% on tasks human experts could solve, and cracked roughly 30% of the 23 problems no expert could solve.',
        'Genentech and Roche both validated these results as consistent with their internal benchmarks. Three independent evaluations in five months, all converging on the same picture: a frontier generalist model at, or above, expert level on real bioinformatics tasks.',
      ],
    },
    {
      title: 'The Biotech Layer',
      paragraphs: [
        'The drug discovery landscape is moving fast. Insilico Medicine published Phase IIa results in Nature Medicine (June 2025) for rentosertib — the first end-to-end AI-discovered drug to show clinical proof-of-concept for tackling idiopathic pulmonary fibrosis (an incurable, progressive lung disease affecting over 3–5 million people worldwide). Patients saw a mean improvement of 98.4 mL in FVC (forced vital capacity), compared with a 20.3 mL decline on placebo.',
        'FVC is the gold-standard metric for tracking disease progression in IPF, and seeing the increased improvement suggests more than just a benchmark met — that is, a human being breathing better because of a target identified by a custom, purpose-built AI-assisted drug discovery algorithm. This is one of many stories I continue to observe as I look at how AI augments biotech workflows.',
        'Even during my time at Regel and Renasant (smaller-scale, pre-IND), we focused on leveraging ML techniques and AI systems to accelerate our assay development and efficacy testing. And while these AI tools may not be built on an underlying LLM architecture, the technology certainly demonstrates the growing potential of AI-assisted drug discovery in pharmaceutical R&D and modern bioinformatics applications.',
        'And naturally, the capital has followed. Xaira Therapeutics (cofounded by Nobel laureate David Baker) launched with over $1 billion in allocated capital. Evolutionary Scale raised $142 million and released ESM 3 — a 98-billion-parameter protein language model that generated a novel fluorescent protein representing ~500 million years of evolutionary distance. Lila Sciences raised $550 million. Isomorphic Labs closed a $2.1 billion Series B. Arc Institute\u2019s Evo 2, trained on 9.3 trillion nucleotides, models DNA across all domains of life. Over 350 biological AI models had been published by 2024, up from fewer than 10 just a few years earlier.',
      ],
    },
    {
      title: "Why I'm Bullish Now",
      paragraphs: [
        'One of the most actionable findings around AI for Biosciences research is from Latch Bio\u2019s SpatialBench: harness design moved outcomes as much as the base model itself. The same Claude base model swung dramatically under different tooling wrappers. What that means for bioscience-driven builders is that the opportunity is not just in training a new foundation model for biosciences research. There is also an opportunity to build the workflow layer — the biologically native harness — that turns a frontier generalist model into a practicing scientist.',
        'Bessemer frames the winning team profile as one in which 25–40% of the headcount are computational biologists, ML researchers, and AI engineers working hand in hand with bench scientists. People with demonstrated foundations in both the underlying fundamentals of biosciences and the computational mechanics of AI systems. It is, I\u2019d argue, a rare combination, but one that several of my Berkeley peers and I have explored. And it certainly is a structurally advantageous niche.',
        'Mainstream AI discourse is fixated on how AI powers enterprise clients, coding agents, consumer channels, CRMs, databases, customer acquisitions, sales, and infrastructure needs. The capital is pooled there. The attention is pooled there. And frankly, these are interesting, relevant challenges.',
        'But the science layer — the place where significant problems in human health still require solutions — remains a comparatively blue ocean. The $0.22 problem is real. But for those scientists indexed on the recent Nature trends before the arXiv ones, it might just be a domain worth tracking and tackling right now!',
      ],
    },
  ],
} as const;
