import { Link } from 'react-router-dom';
import { useMBTI } from '../context/MBTIContext';
import { levels } from '../data/levels';
import { questions } from '../data/questions';
import { answeredCount, areAllLevelsCompleted, getLevelQuestions, getLevelStatus, isLevelCompleted } from '../utils/progression';
import { Icon } from '../components/common/Icon';
import { ResetTest } from '../components/common/ResetTest';

const statuses = { locked: 'Terkunci', available: 'Tersedia', 'in-progress': 'Sedang dimainkan', completed: 'Selesai' };
export function LevelsPage() {
  const { answers, highestUnlockedLevel } = useMBTI();
  const completeCount = levels.filter(level => isLevelCompleted(level.id, answers)).length;
  const ready = areAllLevelsCompleted(answers);
  const totalAnswered = answeredCount(answers, questions);
  const percent = questions.length ? Math.round(totalAnswered / questions.length * 100) : 0;
  return <div className="container levels-page page-enter">
    <div className="center-heading"><span className="eyebrow label-plate"><Icon name="book" />BABAK PENYINGKAPAN DIRI</span><h1>Perjalananmu</h1><p>Jelajahi setiap tahap untuk mengenal dirimu lebih dekat.<br />Selesaikan empat level dan temukan kartu arketipemu.</p></div>
    <section className="expedition panel" aria-label="Progres keseluruhan"><div className="expedition-heading"><span className="square-icon"><Icon name="compass" /></span><div><span className="small-label">STATUS EKSPEDISI</span><h3>{completeCount} / 4 Level Selesai</h3></div><span className="expedition-count">{totalAnswered} / {questions.length} jawaban</span></div><div className="progress-track" role="progressbar" aria-label="Jawaban keseluruhan" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${percent}%` }} /></div><div className="expedition-stages">{levels.map(level => <span className={level.id <= highestUnlockedLevel ? 'unlocked' : ''} key={level.id}>◆ {['GERBANG', 'LABIRIN', 'CERMIN', 'RUANG ARKETIPE'][level.id - 1]}</span>)}</div></section>
    <div className="level-grid">{levels.map(level => {
      const status = getLevelStatus(level.id, answers, highestUnlockedLevel);
      const locked = status === 'locked';
      const count = answeredCount(answers, getLevelQuestions(level.id));
      const total = getLevelQuestions(level.id).length;
      return <article className={`level-card ${status}`} key={level.id} aria-label={`Level ${level.id}: ${level.title}`}>
        <div className="level-top"><span>LEVEL {level.id}</span><span className="level-status"><Icon name={locked ? 'lock' : status === 'completed' ? 'check' : 'sparkles'} />{statuses[status]}</span></div>
        <div className="level-altar"><span className="small-label">ARCANA JOURNEY</span><span className="altar-roman">{level.roman}</span><span className="seal-icon"><Icon name={level.seal} /></span><h3>{level.subtitle}</h3><span className="altar-count">{total} pertanyaan refleksi</span></div>
        <h2>{level.title}</h2><p>{level.description}</p>
        <div className="level-action"><div className="level-counter"><span>Pertanyaan</span><strong>{count} / {total} terjawab</strong></div>{locked ? <button className="button button-secondary" disabled><Icon name="lock" />Selesaikan Level {level.id - 1}</button> : <Link className={`button ${status === 'completed' ? 'button-secondary' : 'button-primary'}`} to={`/test/${level.id}`}>{status === 'completed' ? 'Tinjau Jawaban' : status === 'in-progress' ? 'Lanjutkan Level' : 'Mainkan Level'}<Icon name={status === 'completed' ? 'book' : 'arrow'} /></Link>}</div>
      </article>;
    })}</div>
    <section className="reward-banner"><div className="card-back miniature" aria-hidden="true"><span>ARCANA · XVI</span><Icon name={ready ? 'cards' : 'lock'} /><span>ORACLE DECK</span></div><div className="reward-copy"><span className="eyebrow"><Icon name="sun" />HADIAH PERJALANANMU</span><h2>Buka Kartu MBTI-mu</h2><p>{ready ? 'Seluruh level telah selesai. Saatnya membuka kartu dan menjelajahi cerita di balik pilihanmu.' : 'Selesaikan empat level untuk membuka kartu asli berilustrasi dan mengenali kecenderungan kepribadianmu.'}</p><span className="small-label">16 ARKETIPE · SATU CERITA TENTANG DIRIMU</span></div><div className="reward-actions">{ready ? <Link to="/result" className="button button-primary">Buka Kartu MBTI-mu<Icon name="arrow" /></Link> : <button className="button button-secondary" disabled><Icon name="lock" />Selesaikan Semua Level</button>}<Link to="/cards" className="button button-secondary"><Icon name="eye" />Intip Katalog</Link></div></section>
    <div className="journey-bottom"><p><Icon name="sun" />Jawab dengan jujur. Setiap pilihan adalah bagian dari perjalananmu.</p>{totalAnswered > 0 && <ResetTest />}</div>
  </div>;
}
