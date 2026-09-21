import { Link, useSearchParams } from 'react-router-dom';
import { isMBTIType, mbtiCards } from '../data/mbtiCards';
import { mbtiTypes } from '../data/mbtiTypes';
import type { MBTIType } from '../types';
import { CardProfileDialog } from '../components/cards/CardProfileDialog';
import { levels } from '../data/levels';
import { questions } from '../data/questions';
import { CollectionCard } from '../components/cards/CollectionCard';
import { CardArtwork } from '../components/common/CardArtwork';
import { Icon } from '../components/common/Icon';

const dimensions = [
  { title: 'ENERGI', icon: 'compass', poles: [['Extraversion (E)', 'Mengisi energi melalui interaksi dan aktivitas bersama.'], ['Introversion (I)', 'Mengisi energi melalui ruang tenang dan refleksi pribadi.']] },
  { title: 'INFORMASI', icon: 'eye', poles: [['Sensing (S)', 'Memperhatikan fakta, detail, dan pengalaman yang konkret.'], ['Intuition (N)', 'Mencari pola, kemungkinan, dan gambaran yang lebih besar.']] },
  { title: 'KEPUTUSAN', icon: 'shield', poles: [['Thinking (T)', 'Mempertimbangkan logika, konsistensi, dan alasan objektif.'], ['Feeling (F)', 'Mempertimbangkan nilai pribadi dan dampak pada orang lain.']] },
  { title: 'GAYA HIDUP', icon: 'sun', poles: [['Judging (J)', 'Menikmati rencana, struktur, dan keputusan yang jelas.'], ['Perceiving (P)', 'Menikmati fleksibilitas dan ruang untuk pilihan baru.']] },
];

export function LandingPage() {
  const [search, setSearch] = useSearchParams();
  const selectedType = search.get('card') ?? undefined;
  const profile = isMBTIType(selectedType) ? mbtiTypes[selectedType] : undefined;
  // A query opens a preview while keeping this page mounted and its scroll intact.
  const getCardHref = (type: MBTIType) => {
    const next = new URLSearchParams(search);
    next.set('card', type);
    return `/?${next.toString()}`;
  };
  const closePreview = () => {
    const next = new URLSearchParams(search);
    next.delete('card');
    setSearch(next, { replace: true });
  };
  return <div className="page-enter">
    <section className="hero container">
      <div className="hero-copy"><span className="eyebrow label-plate"><Icon name="sparkles" />ORACLE ARCANA · 16 ARKETIPE</span>
        <h1>Kenali Dirimu.<br /><em>Temukan Kartu<br className="desktop-break" /> Kepribadianmu.</em></h1>
        <p>Setiap pilihan menyimpan cerita tentang dirimu. Jelajahi empat level refleksi, temukan kecenderungan kepribadianmu, dan buka kartu arketipe yang mewakili perjalananmu.</p>
        <div className="button-row"><Link className="button button-primary" to="/levels"><Icon name="sparkles" />Mulai Tes<Icon name="arrow" /></Link><Link className="button button-secondary" to="/cards"><Icon name="cards" />Lihat Kartu Tipe Lain</Link></div>
        <div className="hero-stats"><div><strong>16</strong><span>KARTU PERSONA</span></div><div><strong>4 Lv.</strong><span>PERJALANAN REFLEKSI</span></div><div><strong>{questions.length}</strong><span>PILIHAN TENTANG DIRIMU</span></div></div>
      </div>
      <div className="card-fan" aria-label="Pratinjau kartu kepribadian">
        <span className="fan-orbit" aria-hidden="true" />
        {(['INTJ', 'INFJ', 'ENFP'] as const).map((type, index) => <Link to={getCardHref(type)} className={`fan-card fan-card-${index}`} key={type} aria-label={`Jelajahi kartu ${type}`}><CardArtwork eager src={mbtiCards[type]} alt={`Kartu MBTI ${type}`} /></Link>)}
        <span className="fan-caption">ENAM BELAS CERITA. SATU PERJALANANMU.</span>
      </div>
    </section>
    <section className="section section-deep" id="tentang"><div className="container">
      <div className="section-heading"><div><span className="eyebrow">KOMPAS KEPRIBADIAN</span><h2>Empat Gerbang Arketipe Jiwa</h2><p>MBTI mengenalkan empat pasangan preferensi untuk membantu refleksi diri. Setiap level tes memadukan semuanya; tidak ada jawaban benar atau salah.</p></div><span className="section-note"><Icon name="compass" />KENALI KECENDERUNGANMU</span></div>
      <div className="dimension-cards">{dimensions.map((dimension, index) => <article className="panel dimension-card" key={dimension.title}><div className="eyebrow">DIMENSI {['I', 'II', 'III', 'IV'][index]} · {dimension.title}<Icon name={dimension.icon} /></div>{dimension.poles.map(([title, text]) => <div className="dimension-pole" key={title}><h3>{title}</h3><p>{text}</p></div>)}<div className="decorative-rule" /></article>)}</div>
    </div></section>
    <section className="section container"><div className="section-heading"><div><span className="eyebrow">KOLEKSI TERPILIH</span><h2>Galeri Arketipe Tarot</h2><p>Obsidian dan parchment, enam belas cara memandang dunia.<br />Sentuh sebuah kartu untuk mengenal ceritanya.</p></div><Link className="text-link" to="/cards">SEMUA 16 ARKETIPE <Icon name="arrow" /></Link></div>
      <div className="featured-grid">{(['INTJ', 'INTP', 'ENTJ', 'INFJ', 'ENFP', 'ENFJ'] as const).map(type => <CollectionCard key={type} type={type} to={getCardHref(type)} />)}</div>
      <div className="center-actions"><Link className="button button-secondary" to="/cards">Buka Katalog Lengkap<Icon name="arrow" /></Link></div>
    </section>
    <section className="section section-raised"><div className="container"><div className="center-heading"><span className="eyebrow">PROSES PENEMUAN DIRI</span><h2>Ritual 4 Tingkat Perjalanan Kartu</h2><p>Langkah kecil yang membawamu lebih dekat pada dirimu sendiri.</p></div><div className="journey-preview">{levels.map(level => <article key={level.id}><span className="roman-mark">{level.roman}</span><h3>{level.title}</h3><p>{level.description}</p></article>)}</div><div className="ritual-note"><Icon name="book" /><p>Jawab sesuai kebiasaanmu, bukan sosok yang kamu rasa harus menjadi. Kamu bisa berhenti sejenak dan melanjutkan kapan saja.</p></div></div></section>
    <section className="section final-cta container"><span className="seal-icon"><Icon name="cards" /></span><span className="eyebrow">KARTUMU MENANTI</span><h2>Siap Mengklaim Kartu Arcana Pribadimu?</h2><p>Tidak perlu menjadi siapa-siapa. Mulailah dengan menjadi dirimu.</p><Link className="button button-primary" to="/levels">Mulai Tes<Icon name="arrow" /></Link><small>Eksplorasi ini menggunakan pertanyaan prototipe, bukan alat diagnosis psikologis.</small></section>
    {profile && <CardProfileDialog profile={profile} onClose={closePreview} getCardHref={getCardHref} />}
  </div>;
}
