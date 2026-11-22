import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PROFILE, PUBLIC_CONTACT, SERVICES } from '../data/portfolioData';
import { validateContactForm, type ContactValidationResult } from '../utils/portfolioLogic';
import { CopyEmailButton } from './CopyEmailButton';

const quickLinks = [
  { label: 'GitHub', href: PROFILE.githubUrl, external: true },
  { label: 'Instagram', href: PUBLIC_CONTACT.instagramUrl, external: true },
  { label: 'Gmail', href: `mailto:${PUBLIC_CONTACT.email}`, external: false },
];

export interface ContactModalProps {
  open: boolean;
  initialProjectRef?: string;
  onClose: () => void;
}

export function ContactModal({
  open,
  initialProjectRef = '',
  onClose,
}: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(SERVICES[0].name);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactValidationResult['errors']>({});
  const [submitted, setSubmitted] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const handleResetAndClose = useCallback(() => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (open && initialProjectRef) {
      setMessage(
        `Сайн уу, ${PROFILE.name}! «${initialProjectRef}» бүтээлтэй төстэй төслийн талаар ярилцах хүсэлтэй байна.`
      );
    }
  }, [open, initialProjectRef]);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement;
    closeButton.current?.focus();
    return () => {
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleResetAndClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, handleResetAndClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateContactForm({ name, email, service, message });
    setErrors(result.errors);
    if (result.valid) setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          onClick={handleResetAndClose}
          className="contact-modal-backdrop fixed inset-0 z-50 flex justify-center overflow-y-auto p-3 sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="contact-modal-frame my-auto w-full max-w-xl"
          >
            <div className="contact-modal-paper px-4 py-5 sm:px-7 sm:py-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 id="contact-modal-title" className="display-heading min-w-0 text-3xl leading-none sm:text-5xl">
                  Холбоо барих
                </h3>
                <button
                  ref={closeButton}
                  type="button"
                  onClick={handleResetAndClose}
                  aria-label="Холбоо барих цонхыг хаах"
                  className="contact-modal-close"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              <div className="contact-modal-quick-links mb-5 flex flex-wrap items-center gap-2 pb-4 text-sm">
                {quickLinks.map(({ label, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="contact-modal-pill"
                  >
                    {label} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ))}
                <CopyEmailButton label="Хуулах" className="contact-modal-pill contact-modal-copy" />
              </div>

              {submitted ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center" role="status">
                  <CheckCircle2 className="size-9 text-[#713b63]" aria-hidden="true" />
                  <h4 className="display-heading text-3xl">Маягтыг шалгалаа</h4>
                  <p className="max-w-sm text-sm leading-relaxed">
                    Энэ маягт туршилтын горимтой. Надтай Gmail эсвэл GitHub-аар холбогдоорой.
                  </p>
                  <button type="button" onClick={handleResetAndClose} className="contact-modal-pill mt-2">
                    Портфолио руу буцах
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label htmlFor="contact-name" className="contact-modal-label">Таны нэр</label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Нэрээ оруулна уу"
                        className="contact-modal-field"
                        required
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      />
                      {errors.name ? <p className="contact-modal-error" id="contact-name-error" role="alert">{errors.name}</p> : null}
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="contact-email" className="contact-modal-label">Имэйл хаяг</label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="ner@example.com"
                        className="contact-modal-field"
                        required
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      />
                      {errors.email ? <p className="contact-modal-error" id="contact-email-error" role="alert">{errors.email}</p> : null}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="contact-modal-label">Хамтрах чиглэл</label>
                    <select id="contact-service" value={service} onChange={(event) => setService(event.target.value)} className="contact-modal-field">
                      {SERVICES.map((item) => (
                        <option key={item.number} value={item.name}>{item.number} — {item.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="contact-modal-label">Төслийн товч тайлбар</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Төсөл болон хэрэгтэй тусламжийнхаа талаар бичээрэй."
                      className="contact-modal-field resize-y"
                      required
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message ? <p className="contact-modal-error" id="contact-message-error" role="alert">{errors.message}</p> : null}
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2 pt-1 sm:gap-3">
                    <button type="button" onClick={handleResetAndClose} className="contact-modal-pill px-4">
                      Цуцлах
                    </button>
                    <button type="submit" className="contact-btn cursor-pointer rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide text-[#fff7fa] sm:px-6 sm:text-sm">
                      ХҮСЭЛТ ИЛГЭЭХ
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
