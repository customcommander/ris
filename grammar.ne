# Copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>

@{% const lexer = require("./lexer.js"); %}
@lexer lexer
@builtin "whitespace.ne"

RIS
    ->  RECORD:+
        {% ([d]) => d %}

RECORD
    ->  RTYPE OTHER_TAG:* EOR
        {% ast => ast.filter(x => x !== null) %}

# reference type
RTYPE
    ->  %TY %SEP %TY_VAL __
        {% ([,,{value}]) => ({key: 'type', value}) %}

OTHER_TAG
    ->  KEYWORD
        {% ([d]) => d %}

KEYWORD
    ->  %KW %SEP LINE:+
        {% ([,,lines]) => ({key: 'keyword', value: lines.join(' ')}) %}

LINE
    ->  %CONTENT __
        {% ([{value}]) => value %}

# end of reference
EOR
    ->  "ER" %SEP _
        {% () => null %}

