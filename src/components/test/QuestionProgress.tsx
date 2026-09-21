export function QuestionProgress({ current, total, answered }: { current: number; total: number; answered: number }) {
  const percent = total ? Math.round(answered / total * 100) : 0;
  return <div className="question-progress"><div><span className="eyebrow">PERJALANAN KARTU · {current} / {total}</span><span>{answered} terjawab · {percent}%</span></div><div className="progress-track" role="progressbar" aria-label="Progres level" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${percent}%` }} /></div></div>;
}
