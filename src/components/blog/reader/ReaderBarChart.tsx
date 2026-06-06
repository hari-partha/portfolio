import type { BarChartBar } from '@/lib/contentBlocks/types';

type ReaderBarChartProps = {
  label?: string;
  caption?: string;
  bars: BarChartBar[];
};

export function ReaderBarChart({ label, caption, bars }: ReaderBarChartProps) {
  const maxValue = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <figure className="reader-chart-wrap">
      {label && <div className="reader-chart-label">{label}</div>}
      <div className="reader-chart" role="img" aria-label={label ?? 'Bar chart'}>
        {bars.map((bar) => (
          <div key={bar.label} className="reader-chart-row">
            <span className="reader-chart-row-label">{bar.label}</span>
            <div className="reader-chart-bar-track">
              <div
                className={`reader-chart-bar${bar.variant === 'accent' ? ' reader-chart-bar--accent' : ''}`}
                style={{ width: `${(bar.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="reader-chart-row-value">{bar.value}</span>
          </div>
        ))}
      </div>
      {caption && <figcaption className="reader-chart-caption">{caption}</figcaption>}
    </figure>
  );
}
