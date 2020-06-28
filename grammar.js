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
    {"name": "start", "symbols": [(lexer.has("type") ? {type: "type"} : type), (lexer.has("sep") ? {type: "sep"} : sep), (lexer.has("type_value") ? {type: "type_value"} : type_value), (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ([{value: key},,{value}]) => ({key, value})},
    {"name": "end", "symbols": [(lexer.has("end") ? {type: "end"} : end), (lexer.has("sep") ? {type: "sep"} : sep), "_"], "postprocess": () => null},
    {"name": "entry$subexpression$1", "symbols": ["entry_std"]},
    {"name": "entry$subexpression$1", "symbols": ["entry_name"]},
    {"name": "entry$subexpression$1", "symbols": ["entry_date"]},
    {"name": "entry$subexpression$1", "symbols": ["entry_pubyear"]},
    {"name": "entry$subexpression$1", "symbols": ["entry_reprint"]},
    {"name": "entry", "symbols": ["entry$subexpression$1"], "postprocess": ([[entry]]) => entry},
    {"name": "entry_std$ebnf$1", "symbols": ["std_value"]},
    {"name": "entry_std$ebnf$1", "symbols": ["entry_std$ebnf$1", "std_value"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "entry_std", "symbols": [(lexer.has("std") ? {type: "std"} : std), (lexer.has("sep") ? {type: "sep"} : sep), "entry_std$ebnf$1"], "postprocess": ([{value: key},,value]) => ({key, value: value.join(' ')})},
    {"name": "std_value", "symbols": [(lexer.has("std_value") ? {type: "std_value"} : std_value), (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ([{value}]) => value},
    {"name": "entry_name", "symbols": [(lexer.has("name") ? {type: "name"} : name), (lexer.has("sep") ? {type: "sep"} : sep), (lexer.has("name_value") ? {type: "name_value"} : name_value), (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ([{value: key},,{value}]) => ({key, value})},
    {"name": "entry_date", "symbols": [(lexer.has("date") ? {type: "date"} : date), (lexer.has("sep") ? {type: "sep"} : sep), (lexer.has("date_value") ? {type: "date_value"} : date_value), (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ([{value: key},,{value}]) => ({key, value})},
    {"name": "entry_pubyear", "symbols": [(lexer.has("pubyear") ? {type: "pubyear"} : pubyear), (lexer.has("sep") ? {type: "sep"} : sep), (lexer.has("pubyear_value") ? {type: "pubyear_value"} : pubyear_value), (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ([{value: key},,{value}]) => ({key, value})},
    {"name": "entry_reprint", "symbols": [(lexer.has("reprint") ? {type: "reprint"} : reprint), (lexer.has("sep") ? {type: "sep"} : sep), (lexer.has("reprint_value") ? {type: "reprint_value"} : reprint_value), (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ([{value: key},,{value}]) => ({key, value})}
]
  , ParserStart: "ris"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
