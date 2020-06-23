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
    {"name": "RIS$ebnf$1", "symbols": ["RECORD"]},
    {"name": "RIS$ebnf$1", "symbols": ["RIS$ebnf$1", "RECORD"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "RIS", "symbols": ["RIS$ebnf$1"], "postprocess": ([d]) => d},
    {"name": "RECORD$ebnf$1", "symbols": []},
    {"name": "RECORD$ebnf$1", "symbols": ["RECORD$ebnf$1", "OTHER_TAG"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "RECORD", "symbols": ["RTYPE", "RECORD$ebnf$1", "EOR"], "postprocess": ast => ast.filter(x => x !== null)},
    {"name": "RTYPE", "symbols": [(lexer.has("TY") ? {type: "TY"} : TY), (lexer.has("SEP") ? {type: "SEP"} : SEP), (lexer.has("TY_VAL") ? {type: "TY_VAL"} : TY_VAL), "__"], "postprocess": ([,,{value}]) => ({key: 'type', value})},
    {"name": "OTHER_TAG", "symbols": ["KEYWORD"], "postprocess": ([d]) => d},
    {"name": "KEYWORD$ebnf$1", "symbols": ["LINE"]},
    {"name": "KEYWORD$ebnf$1", "symbols": ["KEYWORD$ebnf$1", "LINE"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "KEYWORD", "symbols": [(lexer.has("KW") ? {type: "KW"} : KW), (lexer.has("SEP") ? {type: "SEP"} : SEP), "KEYWORD$ebnf$1"], "postprocess": ([,,lines]) => ({key: 'keyword', value: lines.join(' ')})},
    {"name": "LINE", "symbols": [(lexer.has("CONTENT") ? {type: "CONTENT"} : CONTENT), "__"], "postprocess": ([{value}]) => value},
    {"name": "EOR", "symbols": [{"literal":"ER"}, (lexer.has("SEP") ? {type: "SEP"} : SEP), "_"], "postprocess": () => null}
]
  , ParserStart: "RIS"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
