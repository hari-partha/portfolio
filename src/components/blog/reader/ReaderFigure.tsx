import Image from 'next/image';

type ReaderFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
};

export function ReaderFigure({ src, alt, caption, fullWidth }: ReaderFigureProps) {
  const isExternal = src.startsWith('http://') || src.startsWith('https://');

  return (
    <figure className={`reader-figure${fullWidth ? ' reader-figure--full' : ''}`}>
      <div className="reader-figure-frame">
        {isExternal ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="reader-figure-img" />
        ) : (
          <Image src={src} alt={alt} width={680} height={400} className="reader-figure-img" />
        )}
      </div>
      {caption && <figcaption className="reader-figure-caption">{caption}</figcaption>}
    </figure>
  );
}
