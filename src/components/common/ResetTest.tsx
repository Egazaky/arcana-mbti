import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMBTI } from '../../context/MBTIContext';
import { Modal } from './Modal';
import { Icon } from './Icon';

export function ResetTest() {
  const [open, setOpen] = useState(false);
  const { resetTest } = useMBTI();
  const navigate = useNavigate();
  return <>
    <button className="button button-ghost" onClick={() => setOpen(true)}><Icon name="refresh" />Ulangi Tes</button>
    {open && <Modal title="Ulangi perjalananmu?" onClose={() => setOpen(false)}>
      <span className="eyebrow">LEMBARAN BARU</span><h2>Ulangi perjalananmu?</h2>
      <p>Semua jawaban dan hasil tes ini akan dihapus. Perjalanan dimulai kembali dari Level 1.</p>
      <div className="button-row"><button className="button button-secondary" autoFocus onClick={() => setOpen(false)}>Batal</button><button className="button button-primary" onClick={() => { resetTest(); setOpen(false); navigate('/levels'); }}>Ya, ulangi tes</button></div>
    </Modal>}
  </>;
}
