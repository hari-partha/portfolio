import Image from 'next/image';
import type { DiptychPanel } from '@/lib/contentBlocks/types';

type ReaderDiptychProps = {
  left: DiptychPanel;
  right: DiptychPanel;
};

function DiptychPanelImage({ panel }: { panel: DiptychPanel }) {
  const isExternal = panel.src.startsWith('http://') || panel.src.startsWith('https://');

  return (
    <figure className="reader-diptych-panel">
      <div className="reader-diptych-frame">
        {isExternal ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={panel.src} alt={panel.alt} className="reader-diptych-img" />
        ) : (
          <Image src={panel.src} alt={panel.alt} width={320} height={240} className="reader-diptych-img" />
        )}
      </div>
      {panel.caption && <figcaption className="reader-diptych-caption">{panel.caption}</figcaption>}
    </figure>
  );
}

export function ReaderDiptych({ left, right }: ReaderDiptychProps) {
  return (
    <div className="reader-diptych">
      <DiptychPanelImage panel={left} />
      <DiptychPanelImage panel={right} />
    </div>
  );
}
