import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icon';

export function Modal({ children, title, onClose, wide = false }: { children: ReactNode; title: string; onClose: () => void; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const requestClose = () => setClosing(true);
  useEffect(() => {
    const dialog = ref.current;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      // React removes the dialog on close, so restore focus explicitly without scrolling.
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, []);
  return <dialog ref={ref} className={`modal ${wide ? 'modal-wide' : ''} ${closing ? 'is-closing' : ''}`} aria-label={title} onAnimationEnd={event => { if (closing && event.target === event.currentTarget && event.animationName === 'modal-exit') onClose(); }} onCancel={event => { event.preventDefault(); requestClose(); }} onClick={event => { if (event.target === event.currentTarget) requestClose(); }}>
    <div className="modal-content">
      <button type="button" className="icon-button modal-close" aria-label="Tutup dialog" onClick={requestClose}><Icon name="close" /></button>
      {children}
    </div>
  </dialog>;
}
