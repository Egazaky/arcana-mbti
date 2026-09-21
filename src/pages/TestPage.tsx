import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useMBTI } from '../context/MBTIContext';
import { levels } from '../data/levels';
import { answeredCount, areAllLevelsCompleted, getLevelQuestions, isLevelCompleted } from '../utils/progression';
import { AnswerScale } from '../components/test/AnswerScale';
import { QuestionProgress } from '../components/test/QuestionProgress';
import { Icon } from '../components/common/Icon';
import { Modal } from '../components/common/Modal';

export function TestPage() {
  const { levelId } = useParams();
  const [search, setSearch] = useSearchParams();
  const { answers, highestUnlockedLevel, setAnswer } = useMBTI();
  const [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const level = levels.find(item => String(item.id) === levelId);
  const items = level ? getLevelQuestions(level.id) : [];
  const firstUnanswered = items.findIndex(question => !answers[question.id]);
  const requested = Number(search.get('q'));
  const index = search.has('q') && Number.isInteger(requested) && requested > 0 && requested <= items.length ? requested - 1 : Math.max(0, firstUnanswered);
  // Pin the current question in the URL: answering must not auto-advance.
  useEffect(() => {
    if (level && level.id <= highestUnlockedLevel && items.length && (!search.has('q') || requested !== index + 1)) setSearch({ q: String(index + 1) }, { replace: true });
  }, [index, items.length, requested, search, setSearch, level, highestUnlockedLevel]);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [index, levelId]);
  useEffect(() => { setFinished(false); }, [levelId]);
  if (!level || level.id > highestUnlockedLevel) return <Navigate to="/levels" replace />;
  const question = items[index];
  if (!question) return <div className="container empty-state"><h1>Belum ada pertanyaan</h1><p>Pertanyaan untuk level ini belum tersedia.</p><Link className="button button-primary" to="/levels">Kembali ke Perjalanan</Link></div>;
  const last = index === items.length - 1;
  const answer = answers[question.id];
  const next = () => {
    if (!answer) return;
    if (!last) setSearch({ q: String(index + 2) });
    else if (isLevelCompleted(level.id, answers)) setFinished(true);
    else { const missing = items.findIndex(q => !answers[q.id]); setSearch({ q: String(missing + 1) }); }
  };
  const ready = areAllLevelsCompleted(answers);
  return <div className="test-page container page-enter">
    <div className="test-heading"><Link className="icon-button" to="/levels" aria-label="Kembali ke perjalanan level"><Icon name="back" /></Link><div><span className="eyebrow">FASE {level.roman} · PERJALANAN REFLEKSI</span><h1>Level {level.id}: {level.title}</h1></div><span className="question-counter"><strong>{index + 1}</strong> / {items.length}<small>Pertanyaan</small></span></div>
    <QuestionProgress current={index + 1} total={items.length} answered={answeredCount(answers, items)} />
    <section className="question-stage" aria-labelledby="question-statement"><div className="question-frame"><span className="corner top-left" /><span className="corner top-right" /><span className="corner bottom-left" /><span className="corner bottom-right" /><span className="arcana-heading">✧ ✧ ARCANA MBTI ✧ ✧</span><span className="seal-icon"><Icon name="sun" /></span><span className="question-number">PERNYATAAN {String(index + 1).padStart(2, '0')}</span><h2 ref={heading} tabIndex={-1} id="question-statement" key={question.id}>“{question.statement}”</h2><span className="question-footnote">DENGARKAN DIRIMU · TIDAK ADA JAWABAN SALAH</span></div></section>
    <div className="answer-area"><AnswerScale value={answer} onChange={value => setAnswer(question.id, value)} /><p className="selection-hint" aria-live="polite"><Icon name={answer ? 'check' : 'compass'} />{answer ? 'Pilihan tersimpan. Tekan Lanjut saat kamu siap.' : 'Pilih satu kartu yang paling sesuai dengan keseharianmu.'}</p><div className="question-navigation"><button className="button button-secondary" disabled={index === 0} onClick={() => setSearch({ q: String(index) })}><Icon name="back" />Sebelumnya</button><Link to="/levels" className="text-link">Simpan & keluar</Link><button className="button button-primary" onClick={next} disabled={!answer}>{last ? 'Selesaikan Level' : 'Lanjut'}<Icon name="arrow" /></button></div><p className="question-quote">“Tidak perlu menjadi sempurna untuk mengenal dirimu lebih baik.”</p></div>
    {finished && <Modal title={`Level ${level.id} Selesai!`} onClose={() => setFinished(false)}><div className="completion-content"><span className="seal-icon"><Icon name="check" /></span><span className="eyebrow">SATU LANGKAH LEBIH DEKAT</span><h2>Level {level.id} Selesai!</h2><p>{ready ? 'Seluruh perjalanan telah lengkap. Kartu arketipemu siap diungkap.' : `Gerbang berikutnya terbuka. Lanjutkan perjalananmu ke Level ${Math.min(4, level.id + 1)}.`}</p><div className="button-row">{ready ? <Link className="button button-primary" to="/result">Buka Kartu MBTI-mu<Icon name="arrow" /></Link> : <Link className="button button-primary" onClick={() => setFinished(false)} to={`/test/${Math.min(4, level.id + 1)}`}>Lanjut ke Level {Math.min(4, level.id + 1)}<Icon name="arrow" /></Link>}<Link className="button button-secondary" to="/levels">Lihat Perjalanan</Link></div></div></Modal>}
  </div>;
}
