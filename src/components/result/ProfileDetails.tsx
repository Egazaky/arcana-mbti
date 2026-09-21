import { Link } from 'react-router-dom';
import { mbtiCodes } from '../../data/mbtiCards';
import { mbtiTypes, groupClass } from '../../data/mbtiTypes';
import type { MBTIProfile, MBTIType } from '../../types';
import { Icon } from '../common/Icon';

export function ProfileDetails({ profile, getCardHref = code => `/cards/${code}` }: { profile: MBTIProfile; getCardHref?: (type: MBTIType) => string }) {
  const peers = mbtiCodes.filter(code => mbtiTypes[code].group === profile.group);
  return <div className="profile-details">
    <section className="panel profile-story"><span className="eyebrow"><Icon name="book" />RISALAH ARKETIPE</span><h2>Mengenal {profile.title}</h2><p>{profile.description}</p><span className="small-label">CIRI UTAMA</span><div className="trait-list">{profile.traits.map(trait => <span key={trait}>{trait}</span>)}</div></section>
    <section className="panel group-panel"><span className="eyebrow">POSISI DALAM 16 DEK ARCANA</span><h2 className={groupClass[profile.group]}>Kuadran {profile.group}</h2><p>Empat arketipe, beragam cara melihat dunia. Jelajahi cerita di balik setiap kartu.</p><div className="peer-links">{peers.map(code => <Link key={code} className={code === profile.code ? 'current' : ''} to={getCardHref(code)}>{code}<small>{mbtiTypes[code].title.replace('Sang ', '')}</small></Link>)}</div></section>
    <section className="panel strengths"><h3><Icon name="sun" />Landasan & Kekuatan</h3><ul>{profile.strengths.map(text => <li key={text}><Icon name="check" />{text}</li>)}</ul></section>
    <section className="panel challenges"><h3><Icon name="shield" />Ruang untuk Bertumbuh</h3><ul>{profile.challenges.map(text => <li key={text}><span aria-hidden="true">◇</span>{text}</li>)}</ul></section>
    <section className="panel info-panel"><span className="eyebrow">GAYA KOMUNIKASI</span><h3>Jembatan percakapan</h3><p>{profile.communication}</p></section>
    <section className="panel info-panel"><span className="eyebrow">LINGKUNGAN YANG MENDUKUNG</span><h3>Ruang untuk berkembang</h3><p>{profile.environment}</p></section>
    <section className="panel info-panel"><span className="eyebrow">RELASI & INTERAKSI</span><h3>Terhubung dengan sesama</h3><p>{profile.relationships}</p></section>
  </div>;
}
