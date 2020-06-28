/**
 * @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const nearley = require('nearley');
const grammar = require('./grammar.js');

const append =
  (acc, {key, value}) =>
    ( acc[key] = (acc[key] || []).concat(value)
    , acc );

const add =
  (acc, {key, value}) =>
    ( acc[key] = value
    , acc );

const name_add =
  (acc, {key, value: [last_name, first_name, suffix = '']}) =>
    ( acc[key] = acc[key] || []
    , acc[key].push({last_name, first_name, suffix})
    , acc );

const defaults =
  acc =>
    Object.assign
      ( { RP: {status: 'NOT IN FILE'}
        }
      , acc );

const OPS =
  { A1: name_add
  , A2: name_add
  , A3: name_add
  , A4: name_add
  , AB: add
  , AD: add
  , AN: add
  , AU: name_add
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
  , DA: (acc, {value: [year, month, day, info]}) =>
          ( acc.DA = {year, month, day, info}
          , acc )
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
  , RP: (acc, {value: {status, date}}) =>
          ( acc.RP = status !== 'ON REQUEST'
                        ? {status}
                        : {status, date: { year: date[2]
                                         , month: date[0]
                                         , day: date[1]
                                         }}
          , acc )
  , SE: add
  , SN: add
  , SP: add
  , ST: add
  , T1: add
  , T2: add
  , T3: add
  , TA: add
  , TI: add
  , TT: add
  , TY: add
  , U1: add
  , U2: add
  , U3: add
  , U4: add
  , U5: add
  , UR: (acc, {value}) =>
      ( acc.UR = (acc.UR || []).concat(
          value.split(';')
            .map(url => url.trim())
              .filter(Boolean))
      , acc )
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
  try {
    parser.feed(text);
    return process_ast(parser.results[0]);
  } catch (e) {
    // ...
  }
};

module.exports = parse;
