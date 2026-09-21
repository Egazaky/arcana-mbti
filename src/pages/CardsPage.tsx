import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { mbtiCodes, isMBTIType } from '../data/mbtiCards';
import { mbtiTypes, groupClass } from '../data/mbtiTypes';
import type { ArchetypeGroup } from '../types';
import { CollectionCard } from '../components/cards/CollectionCard';
import { CardProfileDialog } from '../components/cards/CardProfileDialog';
import { Icon } from '../components/common/Icon';

export function CardsPage() {
  const [filter, setFilter] = useState<ArchetypeGroup | 'Semua'>('Semua');
  const [query, setQuery] = useState('');
  const { type } = useParams();
  const navigate = useNavigate();
  if (type && !isMBTIType(type)) return <Navigate to="/cards" replace />;
  const profile = isMBTIType(type) ? mbtiTypes[type] : undefined;
  const shown = mbtiCodes.filter(code => (filter === 'Semua' || mbtiTypes[code].group === filter) && `${code} ${mbtiTypes[code].title}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="container cards-page page-enter"><div className="section-heading collection-heading"><div><span className="eyebrow"><Icon name="book" />GRIMOIRE ARCHETYPAL · ARCANA</span><h1>Koleksi Kartu MBTI <span>(16 Tipe)</span></h1><p>Enam belas arketipe, beragam cara menjadi diri sendiri.<br />Telusuri kartu dan temukan cerita di balik setiap kepribadian.</p></div><div className="collection-stats"><span><Icon name="cards" /><strong>16 / 16</strong> ARKETIPE</span><span><small>EDISI ORIGINAL</small><strong>Victorian Gilded Vellum</strong></span></div></div>
    <div className="collection-toolbar"><div className="filter-group" aria-label="Filter kelompok">{(['Semua', 'Analis', 'Diplomat', 'Pengawal', 'Penjelajah'] as const).map(group => <button key={group} className={`filter-button ${filter === group ? 'active' : ''}`} aria-pressed={filter === group} onClick={() => setFilter(group)}>{group !== 'Semua' && <span className={`group-dot ${groupClass[group]}`} />}{group}{group === 'Semua' ? ' (16)' : ''}</button>)}</div><label className="search-input"><Icon name="search" /><input type="search" aria-label="Cari tipe atau julukan" placeholder="Cari tipe atau julukan…" value={query} onChange={event => setQuery(event.target.value)} /></label></div>
    <p className="collection-count" aria-live="polite">Menampilkan {shown.length} dari 16 kartu</p>
    <div className="collection-grid">{shown.map(code => <CollectionCard key={code} type={code} />)}</div>
    {shown.length === 0 && <div className="empty-state"><Icon name="search" /><h2>Kartu belum ditemukan</h2><p>Coba kode MBTI atau nama arketipe lain.</p><button className="button button-secondary" onClick={() => { setQuery(''); setFilter('Semua'); }}>Hapus Filter</button></div>}
    <div className="collection-lore"><article className="panel"><Icon name="book" /><div><h3>Enam Belas Cerita</h3><p>Tidak ada tipe yang lebih baik. Setiap arketipe memiliki kekuatan dan ruang untuk tumbuh.</p></div></article><article className="panel"><Icon name="cards" /><div><h3>Dual-Tone Vellum</h3><p>Ilustrasi asli dalam obsidian dan parchment, dibingkai ornamen emas antik.</p></div></article><article className="panel"><Icon name="compass" /><div><h3>Ritual Buka Tabir</h3><p>Pilih kartu untuk melihat profil, kekuatan, gaya komunikasi, dan relasinya.</p></div></article></div>
    {profile && <CardProfileDialog profile={profile} onClose={() => navigate('/cards', { replace: true })} />}
  </div>;
}
