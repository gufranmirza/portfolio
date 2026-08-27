export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const navDelay = 1000;
export const loaderDelay = 2000;

export const KEY_CODES = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_LEFT_IE11: 'Left',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_RIGHT_IE11: 'Right',
  ARROW_UP: 'ArrowUp',
  ARROW_UP_IE11: 'Up',
  ARROW_DOWN: 'ArrowDown',
  ARROW_DOWN_IE11: 'Down',
  ESCAPE: 'Escape',
  ESCAPE_IE11: 'Esc',
  TAB: 'Tab',
  SPACE: ' ',
  SPACE_IE11: 'Spacebar',
  ENTER: 'Enter',
};

export * from './topics';

/**
 * Date formatting for post meta.
 *
 * Parses the ISO parts by hand rather than via `new Date(iso)`: that parses a
 * bare `YYYY-MM-DD` as UTC midnight, which renders as the previous day in any
 * negative-offset timezone. The design prototype splits the string for the
 * same reason.
 */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatDate = iso => {
  const [y, mo, da] = String(iso).slice(0, 10).split('-').map(Number);
  return `${MONTHS[mo - 1]} ${da}, ${y}`;
};

export const formatDateShort = iso => {
  const [y, mo] = String(iso).slice(0, 10).split('-').map(Number);
  return `${MONTHS[mo - 1]} ${y}`;
};
