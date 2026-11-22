import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { PUBLIC_CONTACT } from '../data/portfolioData';

interface CopyEmailButtonProps {
  label: string;
  className: string;
}

export function CopyEmailButton({ label, className }: CopyEmailButtonProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (copyStatus === 'idle') return;
    const timeout = window.setTimeout(() => setCopyStatus('idle'), 2400);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PUBLIC_CONTACT.email);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  };

  return (
    <>
      <button type="button" className={className} onClick={copyEmail}>
        {copyStatus === 'copied'
          ? <Check className="size-4" aria-hidden="true" />
          : <Copy className="size-4" aria-hidden="true" />}
        {copyStatus === 'copied' ? 'Хуулагдлаа!' : label}
      </button>
      <span className="sr-only" role="status">{copyStatus === 'copied' ? 'Имэйл хаяг хуулагдлаа.' : ''}</span>
      {copyStatus === 'failed' ? <span role="status" className="break-all">{PUBLIC_CONTACT.email}</span> : null}
    </>
  );
}
