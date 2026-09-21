import { useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useMBTI } from '../../context/MBTIContext';
import { levels } from '../../data/levels';
import { areAllLevelsCompleted, isLevelCompleted } from '../../utils/progression';
import { Icon } from './Icon';

export function Layout() {
  const { answers, storageAvailable } = useMBTI();
  const complete = levels.filter(level => isLevelCompleted(level.id, answers)).length;
  const ready = areAllLevelsCompleted(answers);
  const { pathname } = useLocation();
  // Card profiles share one page; switching them must preserve dialog focus and gallery scroll.
  const pagePath = pathname === '/cards' || pathname.startsWith('/cards/') ? '/cards' : pathname;
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
    const title = pagePath === '/' ? 'Kenali Dirimu' : pagePath.startsWith('/test') ? 'Ritual Refleksi' : pagePath === '/levels' ? 'Perjalananmu' : pagePath === '/result' ? 'Kartu Saya' : 'Koleksi Kartu';
    document.title = `${title} — Arcana MBTI`;
  }, [pagePath]);
  return <div className="app-shell">
    <a className="skip-link" href="#main">Lewati ke konten</a>
    <header className="site-header"><div className="header-inner">
      <Link className="brand" to="/" aria-label="Arcana MBTI — Beranda"><span className="brand-mark"><Icon name="cards" /></span><span><strong>ARCANA MBTI</strong><small>ORACLE DECK</small></span></Link>
      <nav aria-label="Navigasi utama">
        <NavLink to="/" end>Beranda</NavLink>
        <NavLink to="/levels" className={({ isActive }) => isActive || pathname.startsWith('/test') ? 'active' : ''}>Perjalanan Level</NavLink>
        <NavLink to="/result">Kartu Saya<span className={`status-dot ${ready ? 'ready' : ''}`} /></NavLink>
        <NavLink to="/cards">Koleksi Kartu <span className="nav-extra">(16 Tipe)</span></NavLink>
      </nav>
      <div className="header-progress"><Icon name="sparkles" /><span>{complete} / 4 LEVEL SELESAI</span></div>
    </div></header>
    {!storageAvailable && <p className="storage-warning" role="status">Penyimpanan browser tidak tersedia. Jawaban tetap bisa digunakan selama halaman ini terbuka, tetapi tidak tersimpan saat dimuat ulang.</p>}
    <main id="main" ref={mainRef} tabIndex={-1}><Outlet /></main>
    <footer className="site-footer"><div className="container footer-inner"><span><Icon name="sparkles" />Arcana MBTI © {new Date().getFullYear()} · Perjalanan mengenal diri.</span><p>Eksplorasi kepribadian, bukan diagnosis psikologis.</p><Link to="/cards">JELAJAHI ARKETIPE <Icon name="arrow" /></Link></div></footer>
  </div>;
}
