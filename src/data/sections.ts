export type Section = {
  id: string;
  title: string;
  marker: number;
  color: string;
  summary?: string;
  items?: { title: string; subtitle?: string; href?: string; img?: string }[];
};

export const sections: Section[] = [
  {
    id: 'research',
    title: 'Research Areas',
    marker: 0.1,
    color: '#ECB365',
    summary: 'Innovating at the intersection of AI/ML, biotech, and business strategy.',
    items: [
      {
        title: 'Nature Comms Medicine',
        subtitle: 'Co-author, Vol 4, Art 106 (2024)',
        href: 'https://www.nature.com/ncomms/',
        img: '/img/crispr.jpg'
      },
      {
        title: 'Renasant Biology',
        subtitle: 'Computational Bioinformatics Intern',
        href: 'https://www.renasantbio.com/',
        img: '/img/opto.jpg'
      },
      {
        title: 'Regel Biotherapeutics',
        subtitle: 'Bioinformatics Intern',
        href: 'https://www.regelbio.com/',
        img: '/img/crispr.jpg'
      },
      {
        title: 'NASA Ames Research Center',
        subtitle: 'Research Intern (NBISC)',
        href: 'https://www.nasa.gov/ames',
        img: '/img/opto.jpg'
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
        title: 'ShellGel',
        subtitle: 'Cofounder & Head of Business',
        href: '#',
        img: '/img/neural.jpg'
      },
      {
        title: 'VTOL at Berkeley',
        subtitle: 'Cofounder & Business Advisor',
        href: 'https://vtol.berkeley.edu/',
        img: '/img/syn.jpg'
      },
      {
        title: 'Synkrino Biotherapeutics',
        subtitle: 'Data Engineering Intern',
        href: 'https://www.synkrino.com/',
        img: '/img/neural.jpg'
      },
    ],
  },
  {
    id: 'vc',
    title: 'Venture Capital',
    marker: 0.5,
    color: '#8b5cf6', // Violet
    summary: 'Investing in the next generation of life-science founders.',
    items: [
      {
        title: 'Daxe',
        subtitle: 'Enterprise AI for RAG Solutions',
        href: 'https://daxe.ai/',
        img: '/img/vc.jpg'
      },
      {
        title: 'Code Blue AI',
        subtitle: 'Stroke Detection',
        href: 'https://www.code-blue.ai/',
        img: '/img/vc.jpg'
      },
      {
        title: 'Ilume Tech',
        subtitle: 'Personalised Pet Health',
        href: 'https://us-shop.weareilume.com/',
        img: '/img/vc.jpg'
      },
      {
        title: 'Stratify AI',
        subtitle: 'AI-Powered User Research',
        href: 'https://www.trystratify.com/',
        img: '/img/vc.jpg'
      },
      {
        title: 'HOPO Therapeutics',
        subtitle: 'Heavy Metal Chelation',
        href: 'https://www.hopotx.com/',
        img: '/img/vc.jpg'
      },
      {
        title: 'Clear Ventures',
        subtitle: 'Deeptech Fellow',
        href: 'https://www.clear.ventures/',
        img: '/img/vc.jpg'
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
      { title: 'Indian Classical Music', subtitle: 'Performer', img: '/img/art.jpg' },
      { title: 'EDM Fusion', subtitle: 'Producer', img: '/img/art.jpg' },
      { title: 'Origami', subtitle: 'Artist', img: '/img/mount.jpg' },
      { title: 'Mountaineering', subtitle: 'Alpinism', img: '/img/mount.jpg' },
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
        title: 'MET Strategy Group',
        subtitle: 'Financial & Business Consultant',
        href: 'https://met.berkeley.edu/',
        img: '/img/port.jpg'
      },
      {
        title: 'MET Student Board',
        subtitle: 'Executive Board Member',
        href: 'https://met.berkeley.edu/',
        img: '/img/port.jpg'
      },
    ],
  },
];
