/**
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const read = require('./read');
const write = require('./write');

const copy = x => x;
const constant = x => () => x;

const NOTATION_ARR = /([^[]+)\[\]$/;
const NOTATION_TXT = /([^+]+)\+$/;

const set = (obj, key, val) => {
  const ks = key.split('.');
  let fk = ks.pop();
  let tk;
  let pt = obj;
  while (tk = ks.shift()) {
    if (pt[tk] == null) pt[tk] = {};
    pt = pt[tk];
  }
  if (NOTATION_TXT.test(fk)) {
    [, fk] = fk.match(NOTATION_TXT);
    pt[fk] = pt[fk] == null ? val : `${pt[fk]}\n${val}`;
    return;
  }
  if (NOTATION_ARR.test(fk)) {
    [, fk] = fk.match(NOTATION_ARR);
    pt[fk] = pt[fk] == null ? [val] : pt[fk].concat(val);
    return;
  }
  pt[fk] = val;
}

// RIS -> Vendor
const from_ris = (validate, map) => text => {
  const ris = read(text);
  if (!ris) return null;
  return ris.reduce((ret, ref) => {
    const type = ref.TY[0];
    const dest = Object.entries(ref).reduce((o, [k, vs]) => {
      const [nk, fn = copy] = map[`${k}.${type}`] || map[k] || [];
      if (nk) vs.forEach(v => set(o, nk, fn(v)));
      return o;
    }, {});
    if (validate(dest)) ret.push(dest);
    return ret;
  }, []);
};

const get = (obj, path) => {
  const ks = path.split('.');
  let k;
  let pt = obj;
  while (k = ks.shift()) pt = pt[k];
  return pt;
}

const generate_keys = obj => Object.entries(obj).flatMap(([k, v]) => {
  const is_obj = (typeof v == 'object') && (!Array.isArray(v)) && (v !== null);
  if (is_obj) return generate_keys(v).map(ck => `${k}.${ck}`);
  return [k];
});

const builder = map => ref => generate_keys(ref).reduce((ris, k) => {
  const [nk, fn = copy] = (map[k] || []);
  if (nk && nk != '??') {
    const v = get(ref, k);
    if (ris[nk] == null) ris[nk] = [];
    (Array.isArray(v) ? v : [v]).forEach(vv => ris[nk].push(fn(vv)));
  }
  return ris;
}, {});

// Vendor -> RIS
const to_ris = (validate, map) => references => {
  if (!Array.isArray(references)) return null;
  const refs = references.filter(ref => validate(ref));
  if (references.length > 0 && refs.length == 0) return null;
  const transform = builder(map);
  return write(refs.map(ref => transform(ref)));
};

module.exports = {
  constant,
  from_ris,
  to_ris
};
