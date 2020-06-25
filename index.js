/**
 * @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const nearley = require('nearley');
const grammar = require('./grammar.js');
const multifun = require('@customcommander/multifun');

const to_record =
  multifun
    ( (acc, {key}) => key
    , 'keyword' , (acc, {value}) =>
                    ( acc.keyword = acc.keyword || []
                    , acc.keyword.push(value)
                    , acc
                    )
    , 'url'     , (acc, {value}) =>
                    ( acc.url = (acc.url || []).concat(value)
                    , acc
                    )
    , 'date'    , (acc, {value: [year, month, day, info]}) =>
                    ( acc.date = {year, month, day, info}
                    , acc
                    )
    , 'pub_year', (acc, {value}) =>
                    ( acc.pub_year = value
                    , acc
                    )
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
