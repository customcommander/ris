# Copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>

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
  %type %sep %type_value %newline
    {% ([{value: key},,{value}]) => ({key, value}) %}

end ->
  %end %sep _
    {% () => null %}

entry ->
  (entry_std | entry_name | entry_date | entry_pubyear | entry_reprint)
    {% ([[entry]]) => entry %}

entry_std ->
  %std %sep std_value:+
    {% ([{value: key},,value]) => ({key, value: value.join(' ')}) %}

std_value ->
  %std_value %newline
    {% ([{value}]) => value %}

entry_name ->
  %name %sep %name_value %newline
    {% ([{value: key},,{value}]) => ({key, value}) %}

entry_date ->
  %date %sep %date_value %newline
    {% ([{value: key},,{value}]) => ({key, value}) %}

entry_pubyear ->
  %pubyear %sep %pubyear_value %newline
    {% ([{value: key},,{value}]) => ({key, value}) %}

entry_reprint ->
  %reprint %sep %reprint_value %newline
    {% ([{value: key},,{value}]) => ({key, value}) %}
