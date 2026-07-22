'use client';

import { useState } from 'react';

type Company = { name: string; batch: string; init: string; domain?: string };
type Vertical = { label: string; color: string; companies: Company[] };

// Verticals + companies from the source draft. `domain` is set where a real
// company favicon can be fetched; everything else falls back to a monogram tile.
const VERTICALS: Vertical[] = [
  {
    label: 'Coding & Dev',
    color: '#1E4D9C',
    companies: [
      { name: 'Cursor', batch: 'Anysphere · S22', init: 'Cu', domain: 'cursor.com' },
      { name: 'Greptile', batch: 'Code review · W24', init: 'Gr', domain: 'greptile.com' },
      { name: 'Browser Use', batch: 'Web agents · W25', init: 'Bu', domain: 'browser-use.com' },
      { name: 'Superset', batch: 'Agent IDE · F25', init: 'Su' },
    ],
  },
  {
    label: 'Enterprise Agents',
    color: '#1A7A6E',
    companies: [
      { name: 'Zalos', batch: 'Finance agents · F25', init: 'Za' },
      { name: 'Sixtyfour', batch: 'Sales intel · F25', init: '64', domain: 'sixtyfour.ai' },
      { name: 'FuseAI', batch: 'GTM platform · W25', init: 'Fu' },
      { name: 'Rex', batch: 'Order-to-cash · F25', init: 'Rx' },
    ],
  },
  {
    label: 'Healthcare & Bio',
    color: '#2E7D4F',
    companies: [
      { name: 'Clarion Health', batch: 'Patient comms · F25', init: 'Cl' },
      { name: 'Abridge', batch: 'Clinical docs · S17', init: 'Ab', domain: 'abridge.com' },
      { name: 'Andy AI', batch: 'Home health · W25', init: 'An' },
      { name: 'Cair Health', batch: 'RCM agents · F25', init: 'Ca' },
    ],
  },
  {
    label: 'Foundation & Infra',
    color: '#3D5A8A',
    companies: [
      { name: 'Confident AI', batch: 'LLM eval · F25', init: 'Co', domain: 'confident-ai.com' },
      { name: 'Observee', batch: 'MCP platform · S25', init: 'Ob' },
      { name: 'Morphik', batch: 'Document RAG · F25', init: 'Mo', domain: 'morphik.ai' },
      { name: 'Salus', batch: 'Agent safety · F25', init: 'Sa' },
    ],
  },
  {
    label: 'Voice & Multimodal',
    color: '#6B3FA0',
    companies: [
      { name: 'Vogent', batch: 'Voice AI · F25', init: 'Vo', domain: 'vogent.ai' },
      { name: 'Leaping AI', batch: 'Call center · W25', init: 'Le', domain: 'leapingai.com' },
      { name: 'Willow Voice', batch: 'AI dictation · X25', init: 'Wi', domain: 'willowvoice.com' },
      { name: 'Cignara', batch: 'Enterprise voice · F25', init: 'Ci' },
    ],
  },
  {
    label: 'Vertical SaaS',
    color: '#8B5E3C',
    companies: [
      { name: 'YouLearn', batch: 'AI tutor · X25', init: 'YL', domain: 'youlearn.ai' },
      { name: 'Bild AI', batch: 'Construction · W25', init: 'Bi' },
      { name: 'General Legal', batch: 'AI law firm · W26', init: 'GL' },
      { name: 'ValueMate', batch: 'Real estate · X25', init: 'VM' },
    ],
  },
  {
    label: 'Consumer AI',
    color: '#C0492B',
    companies: [
      { name: 'Opennote', batch: 'Notes · S25', init: 'On', domain: 'opennote.com' },
      { name: 'Studdy', batch: 'AI tutor · F25', init: 'St', domain: 'studdy.ai' },
      { name: 'Dollyglot', batch: 'Video avatar · F25', init: 'Dg' },
      { name: 'Pickle', batch: 'Real-time clone · W25', init: 'Pk' },
    ],
  },
  {
    label: 'Hardware & Robotics',
    color: '#3A3A3A',
    companies: [
      { name: 'Topological', batch: 'Physics AI · S25', init: 'Tp' },
      { name: 'Atum Works', batch: 'Nanomfg · X25', init: 'At' },
      { name: 'Sygaldry', batch: 'Quantum AI · X25', init: 'Sy' },
      { name: 'Bucket Robotics', batch: 'Vision QC · S24', init: 'BR' },
    ],
  },
];

function LogoTile({ company, color }: { company: Company; color: string }) {
  const [failed, setFailed] = useState(!company.domain);
  if (failed || !company.domain) {
    return (
      <span
        className="ylogo ylogo--mono"
        style={{ color, borderColor: `${color}40`, background: `${color}12` }}
        aria-hidden="true"
      >
        {company.init}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="ylogo ylogo--img"
      src={`https://icons.duckduckgo.com/ip3/${company.domain}.ico`}
      alt={`${company.name} logo`}
      onError={() => setFailed(true)}
    />
  );
}

export function YCCompanyMap() {
  return (
    <div className="fig">
      <div className="fig-hd">
        <div className="fig-title">YC Fall 2025 — AI Company Map by Vertical</div>
        <div className="fig-sub">92% AI-native · ~160 companies · Representative sample across 8 verticals</div>
      </div>
      <hr className="fig-divider" />
      <div className="yc-outer">
        <div className="yc-hdr">
          <span className="yc-title">Company Map · YC F25</span>
          <span className="yc-sub">8 verticals · 32 companies shown</span>
        </div>
        <div className="yc-body">
          <div className="yc-grid">
            {VERTICALS.map((v) => (
              <div className="ycol" key={v.label}>
                <div className="ycolh" style={{ background: v.color }}>
                  <span>{v.label}</span>
                  <span className="ycolh-n">{v.companies.length}</span>
                </div>
                <div className="ycol-body">
                  {v.companies.map((c) => (
                    <div className="yco" key={c.name}>
                      <LogoTile company={c} color={v.color} />
                      <div className="yco-text">
                        <span className="yname">{c.name}</span>
                        <span className="ybatch">{c.batch}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="yc-prog">
            <div className="yc-prog-fill" style={{ width: '92%' }}>
              92% AI-native
            </div>
            <span className="yc-prog-rest">8% non-AI</span>
          </div>
        </div>
      </div>
      <p className="fig-cap">
        Source: YC F25 batch directory · author&apos;s vertical grouping. Logos shown where a public favicon is
        available; monogram tiles otherwise. &quot;92% AI-native&quot; reflects the share of the batch building with AI.
      </p>
    </div>
  );
}
