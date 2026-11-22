export const GAZE_RING = [
  'e',
  'ene',
  'ne',
  'nne',
  'n',
  'nnw',
  'nw',
  'wnw',
  'w',
  'wsw',
  'sw',
  'ssw',
  's',
  'sse',
  'se',
  'ese',
] as const;

export type GazeCell = (typeof GAZE_RING)[number];
export type PortraitZone =
  | 'hair'
  | 'brow'
  | 'eyeL'
  | 'eyeR'
  | 'nose'
  | 'mouth'
  | 'chin'
  | 'cheek';

export function computeMarqueeOffset(
  scrollY: number,
  sectionTop: number,
  innerHeight: number
): number {
  return (scrollY - sectionTop + innerHeight) * 0.3;
}

export function computeCardTargetScale(index: number, totalCards: number): number {
  return 1 - (totalCards - 1 - index) * 0.03;
}

export function computeCardTopOffset(index: number): number {
  return index * 28;
}

export function computeCharProgressRange(
  charIndex: number,
  totalChars: number
): [number, number] {
  if (totalChars <= 0) return [0, 1];
  const start = charIndex / totalChars;
  const end = start + 1 / totalChars;
  return [start, end];
}

export function computeRingDirection(dx: number, dy: number): GazeCell {
  const angle = (Math.atan2(-dy, dx) + Math.PI * 2) % (Math.PI * 2);
  const index = Math.round(angle / (Math.PI / 8)) % 16;
  return GAZE_RING[index];
}

export function detectPortraitZone(u: number, v: number): PortraitZone {
  const a = (u - 0.505) / 0.225;
  const b = (v - 0.485) / 0.33;
  if (a * a + b * b > 1 || v < 0.23) return 'hair';
  if (v < 0.385) return 'brow';
  if (Math.abs(v - 0.455) < 0.05 && u > 0.33 && u < 0.455) return 'eyeL';
  if (Math.abs(v - 0.455) < 0.05 && u > 0.545 && u < 0.67) return 'eyeR';
  if (Math.abs(u - 0.5) < 0.055 && v < 0.6) return 'nose';
  if (v > 0.6 && v < 0.71 && Math.abs(u - 0.5) < 0.1) return 'mouth';
  return v > 0.71 ? 'chin' : 'cheek';
}

export interface ContactFormInput {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};
  if (!input.name.trim()) {
    errors.name = 'Нэрээ оруулна уу.';
  }
  const emailTrimmed = input.email.trim();
  if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
    errors.email = 'Зөв имэйл хаяг оруулна уу.';
  }
  if (!input.message.trim() || input.message.trim().length < 10) {
    errors.message = 'Төслийн талаар дор хаяж 10 тэмдэгт бичнэ үү.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
