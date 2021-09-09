/**
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const Ajv = require('ajv');
const schema = require('./ris.schema.json');

const ajv = new Ajv();
const validate = ajv.compile(schema);
const identity = x => x;

const name = x => {
  if (typeof x == 'string') return x;

  const {last_name, first_name, suffix, initials} = x;
  let out = last_name;

  if (first_name && initials) {
    out += `, ${first_name} ${initials}`;
  } else if (first_name) {
    out += `, ${first_name}`;
  } else if (initials) {
    out += `, ${initials}`;
  }

  if (suffix) {
    out += `, ${suffix}`;
  }

  return out;
}

const access_date = x => {
  if (typeof x == 'string') return x;
  const {year, month = '', day = '', info = ''} = x;
  return `${year}/${month}/${day}/${info}`;
}

const reprint_status = x => {
  if (typeof x == 'string') return x;
  const {status, year = '', month = '', day = ''} = x;
  if (status != 'ON REQUEST') return status;
  return `${status} (${month}/${day}/${year})`;
}

const fnMap =
  { AU: name
  , A1: name
  , A2: name
  , A3: name
  , A4: name
  , TA: name
  , DA: access_date
  , RP: reprint_status };

const write = (out, {TY, TI, ER, ...rest}) => {
  const data = Object.entries(rest);
  data.sort(([a], [b]) => a > b ? 1 : -1);

  const tmp = [ ['TY', TY]
              , ['TI', TI || []]
              , ...data
              , ['ER', ['']]];

  const ret = tmp.flatMap(([t, xs]) => {
    const fn = fnMap[t] || identity;
    return xs.map(x => `${t}  - ${fn(x)}`);
  });

  return out + ret.join('\n') + '\n';
};

module.exports = inp => {
  if (!Array.isArray(inp)) return '';
  return inp.reduce((out, r, i) => {
    if (!validate(r)) {
      console.log(`RIS.write(inp): inp[${i}] is not valid. Skip.`);
      return out;
    }
    return write((out ? out + '\n' : out), r);
  }, '');
};

module.exports.entry = (k, fn) => (o, v) => {
  if (o[k] == null) o[k] = [];
  o[k].push(fn(v));
}