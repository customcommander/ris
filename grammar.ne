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

OTHER_TAG   ->  ( KEYWORD
                | URL
                | DATE
                | PUBYEAR
                | ABSTRACT
                | AUTHOR_ADDR
                | ACC_NUMBER
                | ARCH_LOC
                | RP_STATUS
                | CAPTION
                )
                {% ([[d]]) => d %}

ABSTRACT    ->  %AB %SEP %CONTENT __    {% ([,,{value}]) => ({key: 'abstract'      , value}) %}
AUTHOR_ADDR ->  %AD %SEP %CONTENT __    {% ([,,{value}]) => ({key: 'author_address', value}) %}
ACC_NUMBER  ->  %AN %SEP %CONTENT __    {% ([,,{value}]) => ({key: 'acc_number'    , value}) %}
ARCH_LOC    ->  %AV %SEP %CONTENT __    {% ([,,{value}]) => ({key: 'arch_loc'      , value}) %}
RP_STATUS   ->  %RP %SEP %RP_CONTENT __ {% ([,,{value}]) => ({key: 'reprint'       , value}) %}
CAPTION     ->  %CA %SEP %CONTENT __    {% ([,,{value}]) => ({key: 'caption'       , value}) %}

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
