# Copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>

@{% const lexer = require("./lexer.js"); %}
@lexer lexer
@builtin "whitespace.ne"

RIS
    ->  RECORD:+

RECORD
    ->  RTYPE EOR
        {% ast => ast.filter(x => x !== null) %}

# reference type
RTYPE
    ->  %TY %SEP %TY_VAL __
        {% ([,,{value}]) => ({key: 'type', value}) %}

# end of reference
EOR
    ->  "ER" %SEP _
        {% () => null %}

