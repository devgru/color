const hexRegexp = /^#([0-9A-F]{6})|([0-9A-F]{3})$/;

export function validate(hash) {
  if (typeof hash !== 'string') return false;
  if (hash.indexOf('%23') !== -1) return false;
  const upper = hash.toUpperCase();
  if (upper !== hash) return false;

  const colors = upper.split('/');
  return colors.every(c => hexRegexp.test(c));
}
