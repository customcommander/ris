# Copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>

@{% const lexer = require("./lexer.js"); %}
@lexer lexer
@builtin "whitespace.ne"

RIS         ->  _ RECORD:+
                {% ([, d]) => d %}

RECORD      ->  RTYPE OTHER_TAG:* EOR
                {% ast => ast.filter(x => x !== null) %}

RTYPE       ->  %TY %SEP %TY_VAL __
                {% ([,,{value}]) => ({key: 'type', value}) %}

OTHER_TAG   ->  (KEYWORD | URL | DATE | PUBYEAR)
                {% ([[d]]) => d %}

KEYWORD     ->  %KW %SEP LINE:+
                {% ([,,lines]) =>
                        ( { key: 'keyword'
                          , value: lines.join(' ')
                          }
                        )
                %}

DATE        ->  %DA %SEP %DATE_CONTENT __
                {% ([,,{value}]) =>
                        ( { key: 'date'
                          , value: value.split('/')
                          }
                        )
                %}

PUBYEAR     ->  %PY %SEP %PUBYEAR_CONTENT __
                {% ([,,{value}]) =>
                        ( { key: 'pub_year'
                          , value
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
