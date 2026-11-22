import { useEffect, useState, type FormEvent } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE, SERVICES } from '../data/portfolioData';
import { validateContactForm } from '../utils/portfolioLogic';

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open && initialProjectRef) {
      setMessage(
        `Сайн уу, ${PROFILE.name}! «${initialProjectRef}» бүтээлтэй төстэй төслийн талаар ярилцах хүсэлтэй байна.`
      );
    }
  }, [open, initialProjectRef]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateContactForm({ name, email, service, message });
    if (!result.valid) {
      setErrors(result.errors as Record<string, string>);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-[32px] border border-[#D7E2EA]/30 bg-[#0C0C0C] text-[#D7E2EA] p-6 sm:p-8 md:p-10 my-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3
                  id="contact-modal-title"
                  className="display-heading text-3xl sm:text-4xl text-[#F5E6F0]"
                >
                  Холбоо барих
                </h3>
                <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline underline-offset-4">
                  GitHub
                </a>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                aria-label="Холбоо барих цонхыг хаах"
                className="w-11 h-11 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 flex flex-col items-center text-center gap-4">
                <CheckCircle2 className="w-12 h-12 text-[#BBCCD7]" />
                <h4 className="text-xl font-semibold uppercase tracking-wide">
                  Маягтыг шалгалаа
                </h4>
                <p className="text-sm sm:text-base text-[#D7E2EA]/75 font-light max-w-md leading-relaxed">
                  Энэ маягт туршилтын горимтой. Надтай GitHub-аар холбогдоорой.
                </p>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="mt-2 rounded-full border border-[#D7E2EA]/50 px-8 py-3 text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                >
                  Портфолио руу буцах
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-2"
                  >
                    Таны нэр
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[#D7E2EA]/25 bg-[#141414] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 focus:outline-none focus:border-[#BBCCD7]"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-2"
                  >
                    Имэйл хаяг
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ner@example.com"
                    className="w-full rounded-xl border border-[#D7E2EA]/25 bg-[#141414] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 focus:outline-none focus:border-[#BBCCD7]"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-service"
                    className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-2"
                  >
                    Хамтрах чиглэл
                  </label>
                  <select
                    id="contact-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-[#D7E2EA]/25 bg-[#141414] px-4 py-3 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7]"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.number} value={s.name}>
                        {s.number} — {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-2"
                  >
                    Төслийн товч тайлбар
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Төсөл болон хэрэгтэй тусламжийнхаа талаар бичээрэй."
                    className="w-full rounded-xl border border-[#D7E2EA]/25 bg-[#141414] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 focus:outline-none focus:border-[#BBCCD7] resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="rounded-full border border-[#D7E2EA]/30 px-6 py-3 text-xs uppercase tracking-widest text-[#D7E2EA]/80 hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                  >
                    Цуцлах
                  </button>
                  <button
                    type="submit"
                    className="contact-btn rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 text-xs sm:text-sm cursor-pointer"
                  >
                    Хүсэлт илгээх
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
