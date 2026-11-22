import { Magnet } from './Magnet';

export interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
}

export function ContactButton({ onClick, className = '' }: ContactButtonProps) {
  return (
    <Magnet padding={60} strength={4}>
      <button
        type="button"
        onClick={onClick}
        className={`contact-btn rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base whitespace-nowrap shrink-0 cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] ${className}`}
      >
        Холбоо барих
      </button>
    </Magnet>
  );
}
