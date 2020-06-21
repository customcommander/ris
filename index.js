/**
 * @copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const nearley = require('nearley');
const grammar = require('./grammar');

const parser =
  new nearley.Parser
    ( nearley.Grammar.fromCompiled(grammar)
    , { keepHistory: true }
    );

const process_ast =
  ast =>
    ast.map
      ( xs => xs.reduce
          ( (acc, o) => (acc[o.key] = o.value, acc)
          , {}
          )
      );

const parse = text => {
  try {
    parser.feed(text);
    return process_ast(parser.results[0][0]);
  } catch (e) {
    // ...
  }
};

module.exports = parse;
