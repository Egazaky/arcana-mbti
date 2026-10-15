import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useMBTI } from '../context/MBTIContext';
import { levels } from '../data/levels';
import { answeredCount, areAllLevelsCompleted, getLevelQuestions, isLevelCompleted } from '../utils/progression';
import { AnswerScale } from '../components/test/AnswerScale';
import { QuestionProgress } from '../components/test/QuestionProgress';
import { Icon } from '../components/common/Icon';
import { Modal } from '../components/common/Modal';
import type { AnswerValue } from '../types';

/** How many statements are shown together before the player has to press "Lanjut". */
export const QUESTIONS_PER_PAGE = 8;
const scrollBehavior = (): ScrollBehavior => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export function TestPage() {
  const { levelId } = useParams();
  const [search, setSearch] = useSearchParams();
  const { answers, highestUnlockedLevel, setAnswer } = useMBTI();
  const [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const level = levels.find(item => String(item.id) === levelId);
  const items = level ? getLevelQuestions(level.id) : [];
  const pageCount = Math.max(1, Math.ceil(items.length / QUESTIONS_PER_PAGE));
  const firstUnanswered = items.findIndex(question => !answers[question.id]);
  const requested = Number(search.get('page'));
  const page = search.has('page') && Number.isInteger(requested) && requested > 0 && requested <= pageCount ? requested - 1 : Math.floor(Math.max(0, firstUnanswered) / QUESTIONS_PER_PAGE);
  // Pin the current page in the URL so reloads and browser history keep the player's place.
  useEffect(() => {
    if (level && level.id <= highestUnlockedLevel && items.length && (!search.has('page') || requested !== page + 1)) setSearch({ page: String(page + 1) }, { replace: true });
  }, [page, items.length, requested, search, setSearch, level, highestUnlockedLevel]);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); window.scrollTo({ top: 0 }); }, [page, levelId]);
  useEffect(() => { setFinished(false); }, [levelId]);
  if (!level || level.id > highestUnlockedLevel) return <Navigate to="/levels" replace />;
  if (!items.length) return <div className="container empty-state"><h1>Belum ada pertanyaan</h1><p>Pertanyaan untuk level ini belum tersedia.</p><Link className="button button-primary" to="/levels">Kembali ke Perjalanan</Link></div>;
  const start = page * QUESTIONS_PER_PAGE;
  const pageItems = items.slice(start, start + QUESTIONS_PER_PAGE);
  const remaining = pageItems.filter(q => !answers[q.id]).length;
  const pageComplete = remaining === 0;
  const last = page === pageCount - 1;
  const scrollTo = (id: string) => itemRefs.current[id]?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
  const answer = (questionId: string, value: AnswerValue) => {
    const wasAnswered = Boolean(answers[questionId]);
    setAnswer(questionId, value);
    if (wasAnswered) return;
    // Gently guide the player to the next statement that still needs an answer.
    const position = pageItems.findIndex(q => q.id === questionId);
    const nextOpen = [...pageItems.slice(position + 1), ...pageItems.slice(0, position)].find(q => !answers[q.id]);
    if (nextOpen) window.setTimeout(() => scrollTo(nextOpen.id), 180);
  };
  const next = () => {
    if (!pageComplete) return;
    if (!last) setSearch({ page: String(page + 2) });
    else if (isLevelCompleted(level.id, answers)) setFinished(true);
    else { const missing = items.findIndex(q => !answers[q.id]); setSearch({ page: String(Math.floor(missing / QUESTIONS_PER_PAGE) + 1) }); }
  };
  const ready = areAllLevelsCompleted(answers);
  const answered = answeredCount(answers, items);
  return <div className="test-page container page-enter">
    <div className="test-heading"><Link className="icon-button" to="/levels" aria-label="Kembali ke perjalanan level"><Icon name="back" /></Link><div><span className="eyebrow">FASE {level.roman} · PERJALANAN REFLEKSI</span><h1 ref={heading} tabIndex={-1}>Level {level.id}: {level.title}</h1></div><span className="question-counter"><strong>{answered}</strong> / {items.length}<small>Terjawab</small></span></div>
    <QuestionProgress current={answered} total={items.length} answered={answered} />
    <div className="question-list-intro"><span className="arcana-heading">✧ ✧ ARCANA MBTI ✧ ✧</span><p>Seberapa sesuai setiap pernyataan ini dengan dirimu?</p><span className="question-footnote">DENGARKAN DIRIMU · TIDAK ADA JAWABAN SALAH</span></div>
    <ol className="question-list" start={start + 1}>
      {pageItems.map((question, offset) => {
        const value = answers[question.id];
        const statementId = `question-statement-${question.id}`;
        return <li key={question.id} ref={element => { itemRefs.current[question.id] = element; }} className={`question-item ${value ? 'answered' : ''}`} data-testid="question-item">
          <div className="question-item-head"><span className="question-number">PERNYATAAN {String(start + offset + 1).padStart(2, '0')}</span>{value && <span className="question-item-done"><Icon name="check" />Terjawab</span>}</div>
          <h2 id={statementId} className="question-statement">“{question.statement}”</h2>
          <AnswerScale compact labelledBy={statementId} value={value} onChange={v => answer(question.id, v)} />
        </li>;
      })}
    </ol>
    <div className="answer-area"><p className="selection-hint" aria-live="polite"><Icon name={pageComplete ? 'check' : 'compass'} />{pageComplete ? `Semua pernyataan terjawab. Tekan ${last ? 'Selesaikan Level' : 'Lanjut'} saat kamu siap.` : `Tinggal ${remaining} pernyataan lagi di halaman ini.`}</p><div className="question-navigation"><button className="button button-secondary" disabled={page === 0} onClick={() => setSearch({ page: String(page) })}><Icon name="back" />Sebelumnya</button><Link to="/levels" className="text-link">Simpan &amp; keluar</Link><button className="button button-primary" onClick={next} disabled={!pageComplete}>{last ? 'Selesaikan Level' : 'Lanjut'}<Icon name="arrow" /></button></div><p className="question-quote">“Tidak perlu menjadi sempurna untuk mengenal dirimu lebih baik.”</p></div>
    {finished && <Modal title={`Level ${level.id} Selesai!`} onClose={() => setFinished(false)}><div className="completion-content"><span className="seal-icon"><Icon name="check" /></span><span className="eyebrow">SATU LANGKAH LEBIH DEKAT</span><h2>Level {level.id} Selesai!</h2><p>{ready ? 'Seluruh perjalanan telah lengkap. Kartu arketipemu siap diungkap.' : `Gerbang berikutnya terbuka. Lanjutkan perjalananmu ke Level ${Math.min(4, level.id + 1)}.`}</p><div className="button-row">{ready ? <Link className="button button-primary" to="/result">Buka Kartu MBTI-mu<Icon name="arrow" /></Link> : <Link className="button button-primary" onClick={() => setFinished(false)} to={`/test/${Math.min(4, level.id + 1)}`}>Lanjut ke Level {Math.min(4, level.id + 1)}<Icon name="arrow" /></Link>}<Link className="button button-secondary" to="/levels">Lihat Perjalanan</Link></div></div></Modal>}
  </div>;
}
