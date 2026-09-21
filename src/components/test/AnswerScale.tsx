import { useRef, type KeyboardEvent } from 'react';
import type { AnswerValue } from '../../types';
import { answerCardAsset } from '../../data/mbtiCards';
import { CardArtwork } from '../common/CardArtwork';
import { Icon } from '../common/Icon';

export const answerOptions = [
  { value: 1, label: 'Sangat Tidak Sesuai' }, { value: 2, label: 'Tidak Sesuai' },
  { value: 3, label: 'Netral' }, { value: 4, label: 'Sesuai' }, { value: 5, label: 'Sangat Sesuai' },
] as const;
export function AnswerScale({ value, onChange }: { value: AnswerValue | undefined; onChange: (value: AnswerValue) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKeyDown(event: KeyboardEvent, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % answerOptions.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + answerOptions.length) % answerOptions.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = answerOptions.length - 1;
    else return;
    event.preventDefault(); onChange(answerOptions[next].value); refs.current[next]?.focus();
  }
  return <fieldset className="answer-fieldset"><legend>Seberapa sesuai pernyataan ini dengan dirimu?</legend><div className="scale-endpoints"><span>SANGAT TIDAK SESUAI</span><span>SANGAT SESUAI</span></div><div className="answer-scale" role="radiogroup" aria-label="Pilih jawaban">
    {answerOptions.map((option, index) => <button key={option.value} ref={element => { refs.current[index] = element; }} className={`answer-card ${value === option.value ? 'selected' : ''}`} type="button" role="radio" aria-checked={value === option.value} aria-label={`${option.value} — ${option.label}`} tabIndex={value === option.value || (!value && index === 0) ? 0 : -1} onClick={() => onChange(option.value)} onKeyDown={event => onKeyDown(event, index)}>
      <span className="answer-art"><CardArtwork eager src={answerCardAsset(option.value, value === option.value)} alt={`Kartu jawaban ${option.value}`} />{value === option.value && <span className="selected-tick"><Icon name="check" /></span>}</span><span className="answer-label">{option.label}</span>
    </button>)}
  </div></fieldset>;
}
