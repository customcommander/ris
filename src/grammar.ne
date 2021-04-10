# Copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>

@{% const lexer = require("./lexer.js"); %}
@lexer lexer
@builtin "whitespace.ne"

ris ->
  _ reference:+
    {% ([,references]) => references %}

reference ->
  start entry:* end
    {% ([type, entries]) => [type, entries] %}

start ->
  %type %sep %value %newline
    {% ([{value: key},,{value}]) => ({key, value}) %}

end ->
  %end %sep %value:* _
    {% () => null %}

entry ->
  %tag %sep value:+
    {% ([{value: key},,value]) => ({key, value: value.join(' ')}) %}

value ->
  %value %newline
    {% ([{value}]) => value %}

