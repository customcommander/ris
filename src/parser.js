/**
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const nearley = require('nearley');
const grammar = require('./grammar.js');

const append =
  (acc, {key, value}) =>
    ( acc[key] = (acc[key] || []).concat(value)
    , acc );

const process_ast =
  ast =>
    ast.map
      ( ([{key, value}, tail]) =>
          tail.reduce
            ( (ref, entry) => append(ref, entry)
            , {[key]: [value]}
            )
      );

const parse = text => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(text);
  if (parser.results.length != 1) {
    console.log(`
      @customcommander/ris: unable to parse this content!
      If you think this is a bug please submit an issue ;)
      https://github.com/customcommander/ris/issues/new
    `);
    return null;
  }
  return process_ast(parser.results[0]);
};

module.exports = parse;
