# Copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>

@{% const lexer = require("./lexer.js"); %}
@lexer lexer
@builtin "whitespace.ne"

RIS         ->  RECORD:+
                {% ([d]) => d %}

RECORD      ->  RTYPE OTHER_TAG:* EOR
                {% ast => ast.filter(x => x !== null) %}

RTYPE       ->  %TY %SEP %TY_VAL __
                {% ([,,{value}]) => ({key: 'type', value}) %}

OTHER_TAG   ->  (KEYWORD | URL)
                {% ([[d]]) => d %}

KEYWORD     ->  %KW %SEP LINE:+
                {% ([,,lines]) =>
                        ( { key: 'keyword'
                          , value: lines.join(' ')
                          }
                        )
                %}

URL         ->  %UR %SEP LINE:+
                {% ([,,lines]) =>
                        ( { key: 'url'
                          , value: lines.flatMap(line => line.split(';').map(url => url.trim()).filter(Boolean))
                          }
                        )
                %}

LINE        ->  %CONTENT __
                {% ([{value}]) => value %}

EOR         ->  %ER %SEP _
                {% () => null %}
