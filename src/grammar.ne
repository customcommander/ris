# Copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>

@{% const lexer = require("./lexer.js"); %}
@lexer lexer
@builtin "whitespace.ne"

@{%

const processName = (name) => {
  const initialsRegex = /(?:[a-zA-Z]\.)+/
  const [part1, part2 = '', part3 = ''] = name.split(',').map(s => s.trim());
  const [firstname = '', initials = ''] = part2.split(/( +)/g).reduce(([fname, init], str) =>
   initialsRegex.test(str)
      ? [fname, init + str]
      : [fname + str, init], ['', '']);

  return {
    last_name: part1,
    first_name: firstname.trim(),
    suffix: part3,
    initials: initials.trim()
  };
}

%}

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
    personEntry {% id %}
  | otherEntry {% id %}

personEntry ->
  %person %sep value
    {% ([{value: key},,name]) => ({key, value: processName(name)}) %}

otherEntry ->
  %tag %sep value:+
    {% ([{value: key},,value]) => ({key, value: value.join(' ')}) %}

value ->
  %value %newline
    {% ([{value}]) => value %}
