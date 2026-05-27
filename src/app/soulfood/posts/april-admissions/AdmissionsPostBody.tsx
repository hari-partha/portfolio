import {
  admissionsInsights,
  admissionsIntroParagraphs,
  admissionsRollingNote,
} from './admissionsInsightsData';

export function AdmissionsPostBody() {
  return (
    <>
      <div className="editorial-essay-lede">
        {admissionsIntroParagraphs.map((text, i) => (
          <p key={`intro-${i}`}>{text}</p>
        ))}
      </div>

      <p className="editorial-note" style={{ marginTop: 0, borderTop: 'none', paddingTop: 0 }}>
        {admissionsRollingNote}
      </p>

      {admissionsInsights.map((insight, idx) => (
        <section key={insight.heading} className="editorial-insight-block">
          {idx > 0 && <hr className="editorial-essay-break" />}
          <h3 className="editorial-h3">{insight.heading}</h3>
          <p className="editorial-abridged">{insight.abridged}</p>
          {insight.paragraphs.map((text, pi) => (
            <p key={`${idx}-${pi}`} className="editorial-p">
              {text}
            </p>
          ))}
        </section>
      ))}
    </>
  );
}
