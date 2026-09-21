import { Link } from 'react-router-dom';
import { mbtiTypes, groupClass } from '../../data/mbtiTypes';
import type { MBTIType } from '../../types';
import { CardArtwork } from '../common/CardArtwork';

export function CollectionCard({ type, to = `/cards/${type}` }: { type: MBTIType; to?: string }) {
  const profile = mbtiTypes[type];
  return <Link className="collection-card" to={to} aria-label={`Lihat ${type} — ${profile.title}`}>
    <CardArtwork src={profile.cardAsset} alt={`Kartu MBTI ${type} — ${profile.title}`} />
    <div className="collection-caption"><div><strong>{type}</strong><span>{profile.title}</span></div><span className={`group-badge ${groupClass[profile.group]}`}>{profile.group}</span></div>
  </Link>;
}
