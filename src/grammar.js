// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
 const lexer = require("./lexer.js"); 


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

const processAccessDate = value =>
  (value.includes('/')
    ? zip(['year', 'month', 'day', 'info'], value.split('/'))
    : value);

const processRP = value => {
  const match = value.match(/^(IN FILE|NOT IN FILE|ON REQUEST)(?:\s+\((\d{2})\/(\d{2})\/(\d{4})\))?$/);
  if (!match) return value;
  const [, status, month, day, year] = match;
  if (status != 'ON REQUEST') return {status};
  return {status, date: {year, month, day}};
};

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "ris$ebnf$1", "symbols": ["reference"]},
    {"name": "ris$ebnf$1", "symbols": ["ris$ebnf$1", "reference"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ris", "symbols": ["_", "ris$ebnf$1"], "postprocess": ([,references]) => references},
    {"name": "reference$ebnf$1", "symbols": []},
    {"name": "reference$ebnf$1", "symbols": ["reference$ebnf$1", "entry"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "reference", "symbols": ["start", "reference$ebnf$1", "end"], "postprocess": ([type, entries]) => [type, entries]},
    {"name": "start", "symbols": [(lexer.has("type") ? {type: "type"} : type), (lexer.has("sep") ? {type: "sep"} : sep), (lexer.has("value") ? {type: "value"} : value), (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ([{value: key},,{value}]) => ({key, value})},
    {"name": "end$ebnf$1", "symbols": []},
    {"name": "end$ebnf$1", "symbols": ["end$ebnf$1", (lexer.has("value") ? {type: "value"} : value)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "end", "symbols": [(lexer.has("end") ? {type: "end"} : end), "end$ebnf$1", "_"], "postprocess": () => null},
    {"name": "entry", "symbols": ["personEntry"], "postprocess": id},
    {"name": "entry", "symbols": ["urlEntry"], "postprocess": id},
    {"name": "entry", "symbols": ["dateaccessEntry"], "postprocess": id},
    {"name": "entry", "symbols": ["reprintEntry"], "postprocess": id},
    {"name": "entry", "symbols": ["otherEntry"], "postprocess": id},
    {"name": "personEntry", "symbols": [(lexer.has("person") ? {type: "person"} : person), (lexer.has("sep") ? {type: "sep"} : sep), "value"], "postprocess": ([{value: key},,name]) => ({key, value: processName(name)})},
    {"name": "urlEntry$ebnf$1", "symbols": ["value"]},
    {"name": "urlEntry$ebnf$1", "symbols": ["urlEntry$ebnf$1", "value"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "urlEntry", "symbols": [(lexer.has("url") ? {type: "url"} : url), (lexer.has("sep") ? {type: "sep"} : sep), "urlEntry$ebnf$1"], "postprocess":  ([{value: key}, /*sep (ignored)*/ , lines]) =>
        ({ key,
           value: lines.flatMap(line =>
                    line.split(';').map(s => s.trim()).filter(Boolean))}) },
    {"name": "dateaccessEntry", "symbols": [(lexer.has("dateaccess") ? {type: "dateaccess"} : dateaccess), (lexer.has("sep") ? {type: "sep"} : sep), "value"], "postprocess":  ([{value: key},/*sep (ignored)*/, value]) =>
        ({ key
         , value: processAccessDate(value)}) },
    {"name": "reprintEntry", "symbols": [(lexer.has("reprint") ? {type: "reprint"} : reprint), (lexer.has("sep") ? {type: "sep"} : sep), "value"], "postprocess":  ([{value: key},/*sep (ignored)*/, value]) =>
        ({ key
         , value: processRP(value)}) },
    {"name": "otherEntry$ebnf$1", "symbols": ["value"]},
    {"name": "otherEntry$ebnf$1", "symbols": ["otherEntry$ebnf$1", "value"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "otherEntry", "symbols": [(lexer.has("tag") ? {type: "tag"} : tag), (lexer.has("sep") ? {type: "sep"} : sep), "otherEntry$ebnf$1"], "postprocess": ([{value: key},,value]) => ({key, value: value.join(' ')})},
    {"name": "value", "symbols": [(lexer.has("value") ? {type: "value"} : value), (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ([{value}]) => value}
]
  , ParserStart: "ris"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
