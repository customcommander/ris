/**
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const moo = require('moo');

const lexer =
  moo.compile
    ( { newline: {match: /\n/, lineBreaks: true}
      , sep: "  - "
      , type: /TY(?=  - )/
      , person: /(?:AU|A1|A2|A3|A4|TA)(?=  - )/
      , end: /ER(?=  - )/
      , tag: /[A-Z][A-Z0-9](?=  - )/
      , value: {match: /.+/, value: m => m.trim()}
      }
    );

module.exports = lexer;
