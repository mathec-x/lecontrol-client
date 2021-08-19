/* eslint-disable no-plusplus */
export default class string {
  /**
     * @description - six digits,1 number, 1 special char, 1 uc letter
     */
  static testPassword(self) {
    return /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g.test(self);
  }

  static testEmail(self) {
    return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g.test(self);
  }

  static testName(self) {
    return /^[a-z\u00C0-\u017F]{3,}([-']?[a-z\u00C0-\u017F]+)*( [a-z\u00C0-\u017F]{2,}([-']?[a-z\u00C0-\u017F]+)*)+$/gi.test(self);
  }

  static Capitalize(self) {
    return self.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()).replace(/\s\s+/, ' ');
  }

  static percentage(self, max, fix = 0) {
    return ((self / max) * 100).toFixed(fix);
  }

  static last(self, prop) {
    const sorted = self.map((e) => e[prop]).sort((a, b) => b - a);
    return sorted[0] || null;
  }

  static $filter(self, query) {
    if (!self || !query) return self || [];

    // eslint-disable-next-line no-misleading-character-class
    const match = /[\u00c7-\u00e7|\u0300-\u036f]/g;
    const parts = query && query.trim().normalize('NFD').replace(match, '').split(/\s+/);
    const keys = Object.keys(self[0]);

    if (!parts || !parts.length) return self || [];

    return self.filter((obj) => parts.every((part) => keys.some((key) => String(obj[key]).toLowerCase().indexOf(part.normalize('NFD').replace(match, '').toLowerCase()) > -1)));
  }

  static Format(self, mask, placeholder = '0') {
    let s = `${self}` || ''; let
      r = '';
    while (s.length < mask.match(/#/g).length) s = placeholder + s;

    for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
      r += mask.charAt(im) === '#' ? s.charAt(is++) : mask.charAt(im);
    }
    return r;
  }
}
