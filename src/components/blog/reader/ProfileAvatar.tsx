'use client';

import { useEffect, useState } from 'react';

type ProfileAvatarProps = {
  /** Pixel diameter of the avatar. */
  size?: number;
  /** Photo path under /public. Shown only once it successfully loads. */
  src?: string;
  alt?: string;
  monogram?: string;
};

/**
 * Circular profile avatar. Renders a serif monogram by default and only swaps
 * in the photo once it has actually loaded — so before a headshot is added (or
 * if it's missing) the layout shows a clean monogram, never a broken image.
 *
 * To use a real photo: drop a square image at `public/images/hari.jpg`.
 */
export function ProfileAvatar({
  size = 44,
  src = '/images/hari.jpg',
  alt = 'Hari Parthasarathy',
  monogram = 'H',
}: ProfileAvatarProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(false);
    img.src = src;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (!loaded) {
    return (
      <span
        className="reader-avatar reader-avatar--monogram"
        style={{ width: size, height: size, fontSize: Math.round(size * 0.46) }}
        aria-hidden="true"
      >
        {monogram}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="reader-avatar reader-avatar--photo"
      style={{ width: size, height: size }}
    />
  );
}
