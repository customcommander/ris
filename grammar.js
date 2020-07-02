// Generated automatically by nearley, version 2.19.4
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
 const lexer = require("./lexer.js"); var grammar = {
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
    {"name": "end", "symbols": [(lexer.has("end") ? {type: "end"} : end), (lexer.has("sep") ? {type: "sep"} : sep), "end$ebnf$1", "_"], "postprocess": () => null},
    {"name": "entry$ebnf$1", "symbols": ["value"]},
    {"name": "entry$ebnf$1", "symbols": ["entry$ebnf$1", "value"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "entry", "symbols": [(lexer.has("tag") ? {type: "tag"} : tag), (lexer.has("sep") ? {type: "sep"} : sep), "entry$ebnf$1"], "postprocess": ([{value: key},,value]) => ({key, value: value.join(' ')})},
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
