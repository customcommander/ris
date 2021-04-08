/**
 * Copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const moo = require('moo');

const lexer =
  moo.compile
    ( { newline: {match: /\n/, lineBreaks: true}
      , sep: "  - "
      , type: /TY(?=  - )/
      , end: /ER(?=  - )/
      , tag: /[A-Z][A-Z0-9](?=  - )/
      , value: { match: /.+/
               , value: m => m.trim()
               }
      }
    );

module.exports = lexer;
