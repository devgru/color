const hexRegexp = /^#([0-9A-F]{6})|([0-9A-F]{3})$/;

export function validate (hash) {
  if (typeof hash != 'string') return false;
  const upper = hash.toUpperCase();
  if (upper != hash) return false;

  const colors = upper.split('/');
  return colors.every((c) => hexRegexp.test(c));
}

export function rebuild() {

}
