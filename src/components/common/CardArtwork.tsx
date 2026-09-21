import { useState } from 'react';

export function CardArtwork({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return <div className={`artwork-error ${className}`} role="img" aria-label={alt}>{alt}<small>Illustrasi tidak dapat dimuat. Coba muat ulang halaman.</small></div>;
  return <img className={`card-artwork ${className}`} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />;
}
