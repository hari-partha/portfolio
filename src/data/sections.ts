export type Section = {
  id: string;
  title: string;
  marker: number;
  color: string;
  summary?: string;
  items?: {
    title: string;
    subtitle?: string;
    description?: string;
    href?: string;
    img?: string;
    subItems?: { title: string; href: string }[];
  }[];
};

export const sections: Section[] = [
  {
    id: 'research',
    title: 'Research Areas',
    marker: 0.1,
    color: '#ECB365', // Gold
    summary: 'Innovating at the intersection of AI/ML and Space Biosciences.',
    items: [
      {
        title: 'NASA OSDR',
        subtitle: 'Open Science Data Repository Analysis',
        description: 'Building AI pipelines to analyze the effects of spaceflight on aging and inflammation pathways.',
        href: 'https://www.nasa.gov/osdr-testimonials/',
        img: '/img/test_tube_1768202821193.png'
      },
      {
        title: 'NASA NBISC',
        subtitle: 'Biosciences Internship',
        description: 'Automated Data Pipelines to Reduce Manual Input; Made Years of Scientific Data Open.',
        href: 'https://www.nasa.gov/ames/research/space-biosciences',
        img: '/img/test_tube_1768202821193.png'
      },
      {
        title: 'Nature Comms Medicine',
        subtitle: 'Co-author, Vol 4, Art 106 (2024)',
        description: 'Co-authored high-impact paper on CRISPR-Cas9 off-target detection.',
        href: 'https://www.nature.com/articles/s43856-024-00532-9',
        img: '/img/test_tube_1768202821193.png'
      },
    ],
  },
  {
    id: 'startups',
    title: 'Startups & Experiences',
    marker: 0.3,
    color: '#06b6d4', // Cyan
    summary: 'Building and scaling high-impact biotech ventures.',
    items: [
      {
        title: 'Renasant Biology',
        subtitle: 'Computational Bioinformatics Intern',
        description: 'Developed pipelines for analyzing single-cell RNA-seq data to optimize drug targets.',
        href: 'https://www.renasantbio.com/',
        img: '/img/lightbulb_1768202834112.png'
      },
      {
        title: 'Regel Biotherapeutics',
        subtitle: 'Bioinformatics Intern',
        description: 'Designed AAV vector plasmids and analyzed sequencing data for gene therapy applications.',
        href: 'https://regeltherapeutics.com/',
        img: '/img/lightbulb_1768202834112.png'
      },
      {
        title: 'Synkrino Biotherapeutics',
        subtitle: 'Data Engineering Intern',
        description: 'Built Data Preprocessing Tools for Synkrino\'s AI Platform; 20+ Unique Ulcerative Colitis Targets Identified.',
        href: 'https://synkrino.dev/',
        img: '/img/lightbulb_1768202834112.png'
      },
    ],
  },
  {
    id: 'vc',
    title: 'Venture Capital',
    marker: 0.5,
    color: '#8b5cf6', // Violet
    summary: 'Sourcing and supporting the next generation of founders.',
    items: [
      {
        title: 'Clear Ventures',
        subtitle: 'Deeptech Fellow',
        description: 'Deeptech Fellow specializing in AI x Bio investment theses and sourcing.',
        href: 'https://www.clear.ventures/',
        img: '/img/chart_1768202847065.png'
      },
      {
        title: 'Draper Venture Network',
        subtitle: 'Venture Scout',
        description: 'Scouting high-potential startups and aiding in fellowship development.',
        href: 'https://drapernetwork.com/',
        img: '/img/chart_1768202847065.png'
      },
      {
        title: 'ORCA Network',
        subtitle: 'Venture Fellow',
        description: 'Spearheaded the expansion of the fellows program and led GTM strategies.',
        href: 'https://www.orcanetwork.com/',
        img: '/img/chart_1768202847065.png'
      },
      {
        title: 'Companies of Interest',
        subtitle: 'Sourced Companies',
        description: 'A curated list of high-potential startups sourced and evaluated.',
        img: '/img/chart_1768202847065.png',
        subItems: [
          { title: 'Daxe - Enterprise AI for RAG', href: 'https://daxe.ai/' },
          { title: 'HOPO Tx - Heavy Metal Chelation', href: 'https://www.hopotx.com/' },
          { title: 'Code Blue AI - Stroke Detection', href: 'https://www.code-blue.ai/' },
          { title: 'Stratify AI - User Research Platform', href: 'https://www.trystratify.com/' },
          { title: 'GRU - Moon Hotel', href: 'https://gru.space' },
        ]
      },
    ],
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    marker: 0.7,
    color: '#10b981', // Emerald
    summary: 'Creative pursuits outside the lab.',
    items: [
      {
        title: 'Travel & Photography',
        subtitle: 'Explorer',
        description: 'Capturing landscapes and cultures from around the globe.',
        img: '/img/lightbulb_1768202834112.png'
      },
      {
        title: 'Sci-Fi & Cinema',
        subtitle: 'Narrative Explorer',
        description: 'Analyzing cinematography and exploring future narratives through film and literature.',
        img: '/img/test_tube_1768202821193.png'
      },
      {
        title: 'Trivia Competitor',
        subtitle: 'Facts & Logic',
        description: 'Collecting random facts and competing in trivia nights.',
        img: '/img/chart_1768202847065.png'
      },
      {
        title: 'Music Production',
        subtitle: 'Fusion',
        description: 'Mixing electronic beats with classical Indian melodies.',
        img: '/img/gear_1768202859954.png'
      },
    ],
  },
  {
    id: 'projects',
    title: 'Personal Projects',
    marker: 0.9,
    color: '#f43f5e', // Rose
    summary: 'Hacking on fun ideas and experiments.',
    items: [
      {
        title: 'VTOL at Berkeley',
        subtitle: 'Vertical Flight Club',
        description: 'Cofounded the student organization dedicated to vertical takeoff and landing aircraft.',
        href: 'https://vtol.berkeley.edu/',
        img: '/img/gear_1768202859954.png'
      },
      {
        title: 'MET Student Board',
        subtitle: 'Strategy Group Lead',
        description: 'Provided strategic consulting services to tech clients and startups.',
        href: 'https://met.berkeley.edu/',
        img: '/img/gear_1768202859954.png'
      },
      {
        title: 'ShellGel',
        subtitle: 'Marine Bioreactor Co-founder',
        description: 'Developed a novel bioreactor design for sustainable marine compound production.',
        href: '#',
        img: '/img/gear_1768202859954.png'
      },
    ],
  },
];
