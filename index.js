/**
 * @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const nearley = require('nearley');
const grammar = require('./grammar.js');
const multifun = require('@customcommander/multifun');

const zip =
  keys => values =>
    keys.reduce((acc, k, i) =>
      ( acc[k] = values[i], acc ), {});

const append =
  (acc, {key, value}) =>
    ( acc[key] = (acc[key] || []).concat(value)
    , acc );

const add =
  (acc, {key, value}) =>
    ( acc[key] = value
    , acc );

const custom_add =
  /*
    {key: 'custom', value: ['C1', 'foo']} -> acc.custom[0] = foo
    {key: 'custom', value: ['C8', 'foo']} -> acc.custom[7] = foo
  */
  (acc, {value: [k, v]}) =>
    ( acc.custom = acc.custom || Array(8).fill('')
    , acc.custom[k[1] - 1] = v
    , acc );

const defaults =
  acc =>
    Object.assign
      ( { reprint: 'NOT IN FILE'
        }
      , acc );

const to_record =
  multifun
    ( (acc, {key}) => key
    , 'keyword'       , append
    , 'url'           , append
    , 'abstract'      , add
    , 'acc_number'    , add
    , 'author_address', add
    , 'arch_loc'      , add
    , 'call_number'   , add
    , 'caption'       , add
    , 'custom'        , custom_add
    , 'db_name'       , add
    , 'db_provider'   , add
    , 'doi'           , add
    , 'edition'       , add
    , 'pub_year'      , add
    , 'pub_loc'       , add
    , 'title_alt'     , add
    , 'date'          , (acc, {value}) =>
                          ( acc.date = zip(['year', 'month', 'day', 'info'])(value)
                          , acc )
    , 'reprint'       , (acc, {value}) => /* when reprint is on request, it's value is set to  "ON REQUEST (dd/mm/yyyy)" */
                          ( acc.reprint = ( value === 'IN FILE'     ? 'IN FILE'
                                          : value === 'NOT IN FILE' ? 'NOT IN FILE'
                                                                    : 'ON REQUEST' )
                          , acc.reprint_date = ( acc.reprint !== 'ON REQUEST'
                                                  ? undefined
                                                  : zip(['month', 'day', 'year'])
                                                      (value.match(/(\d{2})\/(\d{2})\/(\d{4})/).slice(1)))
                          , acc )
    , acc => acc
    );

const process_ast =
  ast =>
    ast.map
      ( ([head, tail]) =>
          tail.reduce
            ( to_record
            , defaults({type: head.value})
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
