import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMBTI } from '../context/MBTIContext';
import { areAllLevelsCompleted } from '../utils/progression';
import { calculateMBTI, calculatePercentages, calculateScores } from '../utils/scoring';
import { mbtiTypes, groupClass } from '../data/mbtiTypes';
import { questions } from '../data/questions';
import { CardArtwork } from '../components/common/CardArtwork';
import { Icon } from '../components/common/Icon';
import { ResetTest } from '../components/common/ResetTest';
import { ProfileDetails } from '../components/result/ProfileDetails';

const directionNames = { E: 'Extraversion', I: 'Introversion', S: 'Sensing', N: 'Intuition', T: 'Thinking', F: 'Feeling', J: 'Judging', P: 'Perceiving' };
export function ResultPage() {
  const { answers } = useMBTI();
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450);
    return () => window.clearTimeout(timer);
  }, []);
  if (!areAllLevelsCompleted(answers)) return <Navigate to="/levels" replace />;
  const type = calculateMBTI(answers);
  const profile = mbtiTypes[type];
  const percentages = calculatePercentages(calculateScores(answers));
  return <div className="container result-page page-enter"><div className="result-status"><span className="eyebrow"><Icon name="sun" />RITUAL PENGUNGKAPAN DIRI · ARCANA XVI</span><span className="small-label"><Icon name="check" />4 LEVEL SELESAI</span></div>
    <section className="result-hero"><div className="reveal-altar"><div className={`flip-stage ${revealed ? 'is-revealed' : ''}`}><div className="flip-inner"><div className="flip-face flip-back card-back" aria-hidden={revealed}><span>ARCANA · XVI</span><Icon name="sparkles" /><strong>KENALI DIRIMU</strong><span>ORACLE DECK</span></div><div className="flip-face flip-front" aria-hidden={!revealed}><CardArtwork eager src={profile.cardAsset} alt={`Kartu hasil MBTI ${type} — ${profile.title}`} /></div></div></div><button className="button button-ghost" onClick={() => setRevealed(value => !value)}><Icon name="refresh" />{revealed ? 'Balik / Rahasiakan Kartu' : 'Ungkap Kartu'}</button></div>
      <div className={`result-identity ${revealed ? 'identity-visible' : ''}`}><span className={`group-badge ${groupClass[profile.group]}`}><Icon name="sparkles" />ARKETIPE {profile.group.toUpperCase()}</span><h1>{profile.title} <span>({type})</span></h1><p className="result-tagline">“{profile.shortDescription}”</p><p>Berdasarkan jawabanmu, kecenderungan hasil tesmu adalah <strong className="gold">{type}</strong>. {profile.description}</p><div className="result-traits">{profile.traits.map(trait => <span key={trait}>{trait}</span>)}</div><div className="button-row"><a className="button button-primary" href={profile.cardAsset} download={`Arcana-MBTI-${type}.png`}><Icon name="download" />Simpan Kartu</a><Link className="button button-secondary" to="/levels">Tinjau Jawaban<Icon name="arrow" /></Link><ResetTest /></div></div>
    </section>
    <section className="panel spectrum"><div className="section-heading"><div><span className="eyebrow">METRIK PREFERENSI DIRI</span><h2>Keseimbangan Spektrum Kepribadian</h2></div><span className="small-label">Dihitung dari {questions.length} jawabanmu</span></div><div className="spectrum-grid">{percentages.map(pair => <div className="dimension-result" key={pair.dimension} data-testid={`score-${pair.dimension}`}><div className="spectrum-labels"><strong>{directionNames[pair.left]} ({pair.left}) · {pair.leftPercent}%</strong><span>{pair.rightPercent}% · {directionNames[pair.right]} ({pair.right})</span></div><div className="spectrum-track" role="img" aria-label={`${pair.left} ${pair.leftPercent} persen, ${pair.right} ${pair.rightPercent} persen`}><span style={{ width: `${pair.leftPercent}%` }} /></div><div className="spectrum-labels spectrum-sides"><span>{pair.left}</span><span>{pair.right}</span></div></div>)}</div>{percentages.some(pair => pair.tied) && <p className="tie-note">Ada preferensi yang seimbang (50/50). Untuk menampilkan satu kartu, hasil seri menggunakan urutan tetap E, N, T, J; kedua sisi tetap sama kuat dalam jawabanmu.</p>}</section>
    <ProfileDetails profile={profile} />
    <section className="discovery-banner"><div><span className="eyebrow">SETIAP KARTU MEMILIKI CERITA</span><h2>Kenali Bagaimana {type}<br />Terhubung dengan Arketipe Lain</h2><p>Temukan persamaan, hargai perbedaan, dan jelajahi seluruh koleksi.</p></div><Link className="button button-primary" to="/cards">Lihat Kartu Tipe Lain<Icon name="arrow" /></Link></section><p className="result-disclaimer">Hasil ini adalah bahan refleksi dari pertanyaan prototipe, bukan diagnosis atau definisi mutlak dirimu. Preferensi dapat berubah sesuai pengalaman dan situasi.</p>
  </div>;
}
