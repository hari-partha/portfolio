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
    summary: 'Exploring the frontiers of synthetic biology and neuro-engineering.',
    items: [
      { title: 'CRISPR Off-Target Detection', subtitle: 'Deep Learning Model', img: '/img/crispr.jpg' },
      { title: 'Optogenetics', subtitle: 'Neural Circuit Mapping', img: '/img/opto.jpg' },
    ],
  },
  {
    id: 'startups',
    title: 'Startups & Experiences',
    marker: 0.3,
    color: '#06b6d4', // Cyan
    summary: 'Building and scaling high-impact biotech ventures.',
    items: [
      { title: 'Neural Loink', subtitle: 'BCI Interface Design', img: '/img/neural.jpg' },
      { title: 'BioSynth', subtitle: 'Automated DNA Synthesis', img: '/img/syn.jpg' },
    ],
  },
  {
    id: 'vc',
    title: 'Venture Capital',
    marker: 0.5,
    color: '#8b5cf6', // Violet
    summary: 'Investing in the next generation of life-science founders.',
    items: [
      { title: 'Thesis', subtitle: 'Longevity & Regenerative Med', img: '/img/vc.jpg' },
    ],
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    marker: 0.7,
    color: '#10b981', // Emerald
    summary: 'Creative pursuits outside the lab.',
    items: [
      { title: 'Generative Art', subtitle: 'Processing / p5.js', img: '/img/art.jpg' },
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
      { title: 'DNA Portfolio', subtitle: 'This Website', img: '/img/port.jpg' },
    ],
  },
];
