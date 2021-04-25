# Copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>

@{% const lexer = require("./lexer.js"); %}
@lexer lexer
@builtin "whitespace.ne"

@{%

const zip =
  (keys, values) =>
    keys.reduce((o, k, i) =>
      (o[k] = values[i], o), {});

// Convert US date to date object
// e.g. "06/30/2020" -> {year: "2020", month: "06", day: "30"}
const from_mdy =
  str =>
    zip(['month', 'day', 'year'], str.split('/'));

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

const processUrls = value =>
  ( /(?:\d{4})?\/(?:(?:\d\d)?\/){2}(?:[A-Za-z \-]+)?/.test(value)
    ? zip(['year', 'month', 'day', 'info'], value.split('/'))
    : value );

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
    personEntry     {% id %}
  | urlEntry        {% id %}
  | dateaccessEntry {% id %}
  | reprintEntry    {% id %}
  | otherEntry      {% id %}

personEntry ->
  %person %sep value
    {% ([{value: key},,name]) => ({key, value: processName(name)}) %}

urlEntry ->
  %url %sep value:+
    {% ([{value: key}, /*sep (ignored)*/ , lines]) =>
      ({ key,
         value: lines.flatMap(line =>
                  line.split(';').map(s => s.trim()).filter(Boolean))}) %}

dateaccessEntry ->
  %dateaccess %sep value:+
    {% ([{value: key},/*sep (ignored)*/, lines]) =>
      ({ key
       , value: processUrls(lines.join(''))}) %}

reprintEntry ->
  %reprint %sep value
    {% ([{value: key},/*sep (ignored)*/, value]) =>
      ({ key
       , value: ((value === 'IN FILE' || value === 'NOT IN FILE')
                  ? { status: value }
                  : { status: 'ON REQUEST'
                    , date: from_mdy(value.match(/\d{2}\/\d{2}\/\d{4}/)[0]) })}) %}

otherEntry ->
  %tag %sep value:+
    {% ([{value: key},,value]) => ({key, value: value.join(' ')}) %}

value ->
  %value %newline
    {% ([{value}]) => value %}
