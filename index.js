/**
 * @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const nearley = require('nearley');
const grammar = require('./grammar.js');
const multifun = require('@customcommander/multifun');

const append =
  (acc, {key, value}) =>
    ( acc[key] = (acc[key] || []).concat(value)
    , acc );

const add =
  (acc, {key, value}) =>
    ( acc[key] = value
    , acc );

const to_record =
  multifun
    ( (acc, {key}) => key
    , 'keyword'       , append
    , 'url'           , append
    , 'abstract'      , add
    , 'acc_number'    , add
    , 'author_address', add
    , 'pub_year'      , add
    , 'date'          , (acc, {value: [year, month, day, info]}) =>
                          ( acc.date = {year, month, day, info}
                          , acc )
    , acc => acc
    );

const process_ast =
  ast =>
    ast.map
      ( ([head, tail]) =>
          tail.reduce
            ( to_record
            , {type: head.value}
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
