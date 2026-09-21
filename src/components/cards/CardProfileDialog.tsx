import { Link } from 'react-router-dom';
import { groupClass } from '../../data/mbtiTypes';
import type { MBTIProfile, MBTIType } from '../../types';
import { CardArtwork } from '../common/CardArtwork';
import { Icon } from '../common/Icon';
import { Modal } from '../common/Modal';
import { ProfileDetails } from '../result/ProfileDetails';

interface CardProfileDialogProps {
  profile: MBTIProfile;
  onClose: () => void;
  getCardHref?: (type: MBTIType) => string;
}

export function CardProfileDialog({ profile, onClose, getCardHref }: CardProfileDialogProps) {
  return <Modal title={`${profile.code} — ${profile.title}`} wide onClose={onClose}>
    <div className="detail-hero">
      <CardArtwork eager src={profile.cardAsset} alt={`Kartu MBTI ${profile.code} — ${profile.title}`} />
      <div>
        <span className={`group-badge ${groupClass[profile.group]}`}>{profile.group}</span>
        <h2>{profile.code}<br />{profile.title}</h2>
        <p className="result-tagline">{profile.shortDescription}</p>
        <p>Kenali kecenderungan arketipe ini sebagai bahan refleksi, bukan label yang membatasi.</p>
        <Link to="/levels" className="button button-primary">Temukan Kartumu<Icon name="arrow" /></Link>
      </div>
    </div>
    <ProfileDetails profile={profile} getCardHref={getCardHref} />
  </Modal>;
}
