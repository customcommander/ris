/**
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const nearley = require('nearley');
const grammar = require('./grammar.js');
const type_map = require('./type-map.json');
const fields_map = require('./fields-map.json');

const append =
  (acc, {key, value}) =>
    ( acc[key] = (acc[key] || []).concat(value)
    , acc );

const add =
  (acc, {key, value}) =>
    ( acc[key] = value
    , acc );

const defaults =
  acc =>
    Object.assign
      ( { RP: {status: 'NOT IN FILE'}
        }
      , acc );

const OPS =
  { A1: append
  , A2: append
  , A3: append
  , A4: append
  , AB: add
  , AD: add
  , AN: add
  , AU: append
  , AV: add
  , BT: add
  , C1: add
  , C2: add
  , C3: add
  , C4: add
  , C5: add
  , C6: add
  , C7: add
  , C8: add
  , CA: add
  , CN: add
  , CP: add
  , CT: add
  , CY: add
  , DA: add
  , DB: add
  , DO: add
  , DP: add
  , ED: add
  , EP: add
  , ET: add
  , ID: add
  , IS: add
  , J1: add
  , J2: add
  , JA: add
  , JF: add
  , JO: add
  , KW: append
  , L1: add
  , L2: add
  , L3: add
  , L4: add
  , LA: add
  , LB: add
  , LK: add
  , M1: add
  , M2: add
  , M3: add
  , N1: add
  , N2: add
  , NV: add
  , OP: add
  , PB: add
  , PP: add
  , PY: add
  , RI: add
  , RN: add
  , RP: add
  , SE: add
  , SN: add
  , SP: add
  , ST: add
  , T1: add
  , T2: add
  , T3: add
  , TA: append
  , TI: add
  , TT: add
  , TY: add
  , U1: add
  , U2: add
  , U3: add
  , U4: add
  , U5: add
  , UR: append
  , VL: add
  , VO: add
  , Y1: add
  , Y2: add
  };

const process_ast =
  ast =>
    ast.map
      ( ([{key, value}, tail]) =>
          tail.reduce
            ( (ref, entry) => OPS[entry.key](ref, entry)
            , defaults({[key]: value})
            )
      );

const parse = text => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(text);
  if (parser.results.length > 1) throw new Error('grammar is ambiguous');
  return process_ast(parser.results[0]);
};

parse.map = text => {
  const parsed = parse(text);
  return parsed.map(
    p => Object.keys(p).reduce(
      (mapped, key) => {
        const new_key = fields_map[`${p.TY}.${key}`] || (key === 'TY' ? '@type' : key);
        mapped[new_key] = new_key !== '@type' ? p[key] : type_map[p.TY];
        return mapped;
      }, {}));
};

module.exports = parse;
