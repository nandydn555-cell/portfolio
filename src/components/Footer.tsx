import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Clock3, Copy, Mail } from 'lucide-react';
import { PROFILE, PUBLIC_CONTACT } from '../data/portfolioData';
import { validateContactForm, type ContactFormInput, type ContactValidationResult } from '../utils/portfolioLogic';

const ulaanbaatarTime = new Intl.DateTimeFormat('mn-MN', {
  timeZone: 'Asia/Ulaanbaatar',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});
const currentYear = new Intl.DateTimeFormat('mn-MN', {
  timeZone: 'Asia/Ulaanbaatar',
  year: 'numeric',
});
const formFields = [
  { key: 'name', label: 'Таны нэр', placeholder: 'Нэрээ бичээрэй', type: 'text', autoComplete: 'name' },
  { key: 'email', label: 'Таны имэйл', placeholder: 'ner@example.com', type: 'email', autoComplete: 'email' },
] as const;
const contactLinks = [
  { label: 'Email', href: `mailto:${PUBLIC_CONTACT.email}`, external: false },
  { label: 'GitHub', href: PROFILE.githubUrl, external: true },
  { label: 'Instagram', href: PUBLIC_CONTACT.instagramUrl, external: true },
];

function UlaanbaatarClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#dbc1be] bg-[#f7e9e6] px-3 py-2 text-xs font-semibold text-[#61343f]">
      <Clock3 className="size-3.5" aria-hidden="true" />
      Улаанбаатар
      <time dateTime={now.toISOString()} className="tabular-nums">{ulaanbaatarTime.format(now)}</time>
    </div>
  );
}

function FooterContactForm() {
  const [errors, setErrors] = useState<ContactValidationResult['errors']>({});
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const input: ContactFormInput = {
      name: String(values.get('name') ?? '').trim(),
      email: String(values.get('email') ?? '').trim(),
      message: String(values.get('message') ?? '').trim(),
      service: '',
    };
    const result = validateContactForm(input);
    setErrors(result.errors);
    if (!result.valid) {
      setDraft(null);
      const firstError = form.elements.namedItem(Object.keys(result.errors)[0]);
      if (firstError instanceof HTMLElement) firstError.focus();
      return;
    }
    setDraft({
      subject: `Портфолиогоор холбогдсон нь · ${input.name}`,
      body: `${input.message}\n\n${input.name}\nХариу авах имэйл: ${input.email}`,
    });
  };

  const mailto = draft
    ? `mailto:${PUBLIC_CONTACT.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`
    : '';

  return (
    <form id="footer-contact-form" onSubmit={handleSubmit} onChange={() => setDraft(null)} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {formFields.map(({ key, label, placeholder, type, autoComplete }) => (
          <div key={key} className="min-w-0">
            <label className="footer-field-label" htmlFor={`footer-${key}`}>{label}</label>
            <input
              className="footer-field"
              id={`footer-${key}`}
              name={key}
              type={type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              required
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `footer-${key}-error` : undefined}
            />
            {errors[key] ? <p className="footer-error" id={`footer-${key}-error`}>{errors[key]}</p> : null}
          </div>
        ))}
      </div>
      <div>
        <label className="footer-field-label" htmlFor="footer-message">Мессеж</label>
        <textarea
          className="footer-field min-h-28 resize-y"
          id="footer-message"
          name="message"
          rows={4}
          placeholder="Юун дээр хамт ажилламаар байгаагаа бичээрэй."
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'footer-message-error' : undefined}
        />
        {errors.message ? <p className="footer-error" id="footer-message-error">{errors.message}</p> : null}
      </div>
      <button type="submit" className="footer-submit justify-self-start">
        Имэйлийн ноорог бэлдэх <ArrowUpRight className="size-4" aria-hidden="true" />
      </button>
      <div aria-live="polite">
        {draft ? (
          <p className="flex items-start gap-2 text-sm font-medium text-[#5a303e]">
            <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Ноорог бэлэн. Имэйл апп дээрээ нээгээд илгээгээрэй.
          </p>
        ) : null}
      </div>
      {mailto ? (
        <a href={mailto} className="footer-link justify-self-start">
          Имэйл апп нээх <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      ) : null}
    </form>
  );
}

export function Footer() {
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
    <footer id="contact" aria-labelledby="footer-heading" className="portfolio-footer px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="portfolio-footer-card grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="portfolio-footer-intro flex flex-col items-start justify-center gap-5 p-6 sm:p-9 lg:p-12">
            <span aria-hidden="true" className="footer-stamp">
              <Mail className="size-5" strokeWidth={1.5} />
            </span>
            <h2 id="footer-heading" className="display-heading max-w-[12ch] text-[clamp(2.8rem,6vw,5.15rem)] leading-[0.94]">
              Гоё зүйл хамт бүтээцгээе
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[#623c45] sm:text-base">
              Шинэ санаа, хамтын төсөл эсвэл зүгээр л мэнд мэдэх бол над руу бичээрэй.
            </p>
            <ul aria-label="Холбоо барих сувгууд" className="mt-1 flex flex-wrap gap-2">
              {contactLinks.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    className="footer-link"
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                  >
                    {label} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex min-h-9 flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <button type="button" className="footer-copy" onClick={copyEmail}>
                {copyStatus === 'copied' ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {copyStatus === 'copied' ? 'Хуулагдлаа!' : 'Имэйл хуулах'}
              </button>
              <span className="sr-only" role="status">{copyStatus === 'copied' ? 'Имэйл хаяг хуулагдлаа.' : ''}</span>
              {copyStatus === 'failed' ? <span role="status" className="break-all">{PUBLIC_CONTACT.email}</span> : null}
            </div>
          </div>

          <div className="portfolio-footer-form p-6 sm:p-9 lg:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h3 className="display-heading text-3xl leading-none sm:text-4xl">Надтай холбогдох</h3>
              <UlaanbaatarClock />
            </div>
            <FooterContactForm />
          </div>
        </div>
        <div className="mt-6 border-t border-[#ad7e803f] pt-4 text-center text-sm text-[#623c45] sm:text-left">
          © {currentYear.format(new Date())} Nainii. Хувийн портфолио.
        </div>
      </div>
    </footer>
  );
}
