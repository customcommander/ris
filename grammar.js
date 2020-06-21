// Generated automatically by nearley, version 2.19.4
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
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
    {"name": "RIS", "symbols": ["RIS$ebnf$1"]},
    {"name": "RECORD", "symbols": ["RTYPE", "_", "EOR", "_"], "postprocess": ast => ast.filter(x => x !== null)},
    {"name": "RTYPE$string$1", "symbols": [{"literal":"T"}, {"literal":"Y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "RTYPE", "symbols": ["RTYPE$string$1", "SEP", "TY"], "postprocess": ([k,,[v]]) => ({key: 'type', value: v})},
    {"name": "EOR$string$1", "symbols": [{"literal":"E"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "EOR", "symbols": ["EOR$string$1", "SEP"], "postprocess": () => null},
    {"name": "TY$string$1", "symbols": [{"literal":"A"}, {"literal":"B"}, {"literal":"S"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$1"]},
    {"name": "TY$string$2", "symbols": [{"literal":"A"}, {"literal":"D"}, {"literal":"V"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$2"]},
    {"name": "TY$string$3", "symbols": [{"literal":"A"}, {"literal":"G"}, {"literal":"G"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$3"]},
    {"name": "TY$string$4", "symbols": [{"literal":"A"}, {"literal":"N"}, {"literal":"C"}, {"literal":"I"}, {"literal":"E"}, {"literal":"N"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$4"]},
    {"name": "TY$string$5", "symbols": [{"literal":"A"}, {"literal":"R"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$5"]},
    {"name": "TY$string$6", "symbols": [{"literal":"B"}, {"literal":"I"}, {"literal":"L"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$6"]},
    {"name": "TY$string$7", "symbols": [{"literal":"B"}, {"literal":"L"}, {"literal":"O"}, {"literal":"G"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$7"]},
    {"name": "TY$string$8", "symbols": [{"literal":"B"}, {"literal":"O"}, {"literal":"O"}, {"literal":"K"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$8"]},
    {"name": "TY$string$9", "symbols": [{"literal":"C"}, {"literal":"A"}, {"literal":"S"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$9"]},
    {"name": "TY$string$10", "symbols": [{"literal":"C"}, {"literal":"H"}, {"literal":"A"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$10"]},
    {"name": "TY$string$11", "symbols": [{"literal":"C"}, {"literal":"H"}, {"literal":"A"}, {"literal":"R"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$11"]},
    {"name": "TY$string$12", "symbols": [{"literal":"C"}, {"literal":"L"}, {"literal":"S"}, {"literal":"W"}, {"literal":"K"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$12"]},
    {"name": "TY$string$13", "symbols": [{"literal":"C"}, {"literal":"O"}, {"literal":"M"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$13"]},
    {"name": "TY$string$14", "symbols": [{"literal":"C"}, {"literal":"O"}, {"literal":"N"}, {"literal":"F"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$14"]},
    {"name": "TY$string$15", "symbols": [{"literal":"C"}, {"literal":"P"}, {"literal":"A"}, {"literal":"P"}, {"literal":"E"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$15"]},
    {"name": "TY$string$16", "symbols": [{"literal":"C"}, {"literal":"T"}, {"literal":"L"}, {"literal":"G"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$16"]},
    {"name": "TY$string$17", "symbols": [{"literal":"D"}, {"literal":"A"}, {"literal":"T"}, {"literal":"A"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$17"]},
    {"name": "TY$string$18", "symbols": [{"literal":"D"}, {"literal":"B"}, {"literal":"A"}, {"literal":"S"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$18"]},
    {"name": "TY$string$19", "symbols": [{"literal":"D"}, {"literal":"I"}, {"literal":"C"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$19"]},
    {"name": "TY$string$20", "symbols": [{"literal":"E"}, {"literal":"B"}, {"literal":"O"}, {"literal":"O"}, {"literal":"K"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$20"]},
    {"name": "TY$string$21", "symbols": [{"literal":"E"}, {"literal":"C"}, {"literal":"H"}, {"literal":"A"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$21"]},
    {"name": "TY$string$22", "symbols": [{"literal":"E"}, {"literal":"D"}, {"literal":"B"}, {"literal":"O"}, {"literal":"O"}, {"literal":"K"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$22"]},
    {"name": "TY$string$23", "symbols": [{"literal":"E"}, {"literal":"J"}, {"literal":"O"}, {"literal":"U"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$23"]},
    {"name": "TY$string$24", "symbols": [{"literal":"E"}, {"literal":"L"}, {"literal":"E"}, {"literal":"C"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$24"]},
    {"name": "TY$string$25", "symbols": [{"literal":"E"}, {"literal":"N"}, {"literal":"C"}, {"literal":"Y"}, {"literal":"C"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$25"]},
    {"name": "TY$string$26", "symbols": [{"literal":"E"}, {"literal":"Q"}, {"literal":"U"}, {"literal":"A"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$26"]},
    {"name": "TY$string$27", "symbols": [{"literal":"F"}, {"literal":"I"}, {"literal":"G"}, {"literal":"U"}, {"literal":"R"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$27"]},
    {"name": "TY$string$28", "symbols": [{"literal":"G"}, {"literal":"E"}, {"literal":"N"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$28"]},
    {"name": "TY$string$29", "symbols": [{"literal":"G"}, {"literal":"O"}, {"literal":"V"}, {"literal":"D"}, {"literal":"O"}, {"literal":"C"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$29"]},
    {"name": "TY$string$30", "symbols": [{"literal":"G"}, {"literal":"R"}, {"literal":"N"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$30"]},
    {"name": "TY$string$31", "symbols": [{"literal":"H"}, {"literal":"E"}, {"literal":"A"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$31"]},
    {"name": "TY$string$32", "symbols": [{"literal":"I"}, {"literal":"C"}, {"literal":"O"}, {"literal":"M"}, {"literal":"M"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$32"]},
    {"name": "TY$string$33", "symbols": [{"literal":"I"}, {"literal":"N"}, {"literal":"P"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$33"]},
    {"name": "TY$string$34", "symbols": [{"literal":"J"}, {"literal":"F"}, {"literal":"U"}, {"literal":"L"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$34"]},
    {"name": "TY$string$35", "symbols": [{"literal":"J"}, {"literal":"O"}, {"literal":"U"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$35"]},
    {"name": "TY$string$36", "symbols": [{"literal":"L"}, {"literal":"E"}, {"literal":"G"}, {"literal":"A"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$36"]},
    {"name": "TY$string$37", "symbols": [{"literal":"M"}, {"literal":"A"}, {"literal":"N"}, {"literal":"S"}, {"literal":"C"}, {"literal":"P"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$37"]},
    {"name": "TY$string$38", "symbols": [{"literal":"M"}, {"literal":"A"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$38"]},
    {"name": "TY$string$39", "symbols": [{"literal":"M"}, {"literal":"G"}, {"literal":"Z"}, {"literal":"N"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$39"]},
    {"name": "TY$string$40", "symbols": [{"literal":"M"}, {"literal":"P"}, {"literal":"C"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$40"]},
    {"name": "TY$string$41", "symbols": [{"literal":"M"}, {"literal":"U"}, {"literal":"L"}, {"literal":"T"}, {"literal":"I"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$41"]},
    {"name": "TY$string$42", "symbols": [{"literal":"M"}, {"literal":"U"}, {"literal":"S"}, {"literal":"I"}, {"literal":"C"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$42"]},
    {"name": "TY$string$43", "symbols": [{"literal":"N"}, {"literal":"E"}, {"literal":"W"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$43"]},
    {"name": "TY$string$44", "symbols": [{"literal":"P"}, {"literal":"A"}, {"literal":"M"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$44"]},
    {"name": "TY$string$45", "symbols": [{"literal":"P"}, {"literal":"A"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$45"]},
    {"name": "TY$string$46", "symbols": [{"literal":"P"}, {"literal":"C"}, {"literal":"O"}, {"literal":"M"}, {"literal":"M"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$46"]},
    {"name": "TY$string$47", "symbols": [{"literal":"R"}, {"literal":"P"}, {"literal":"R"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$47"]},
    {"name": "TY$string$48", "symbols": [{"literal":"S"}, {"literal":"E"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$48"]},
    {"name": "TY$string$49", "symbols": [{"literal":"S"}, {"literal":"L"}, {"literal":"I"}, {"literal":"D"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$49"]},
    {"name": "TY$string$50", "symbols": [{"literal":"S"}, {"literal":"O"}, {"literal":"U"}, {"literal":"N"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$50"]},
    {"name": "TY$string$51", "symbols": [{"literal":"S"}, {"literal":"T"}, {"literal":"A"}, {"literal":"N"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$51"]},
    {"name": "TY$string$52", "symbols": [{"literal":"S"}, {"literal":"T"}, {"literal":"A"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$52"]},
    {"name": "TY$string$53", "symbols": [{"literal":"T"}, {"literal":"H"}, {"literal":"E"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$53"]},
    {"name": "TY$string$54", "symbols": [{"literal":"U"}, {"literal":"N"}, {"literal":"B"}, {"literal":"I"}, {"literal":"L"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$54"]},
    {"name": "TY$string$55", "symbols": [{"literal":"U"}, {"literal":"N"}, {"literal":"P"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$55"]},
    {"name": "TY$string$56", "symbols": [{"literal":"V"}, {"literal":"I"}, {"literal":"D"}, {"literal":"E"}, {"literal":"O"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "TY", "symbols": ["TY$string$56"]},
    {"name": "SEP$string$1", "symbols": [{"literal":" "}, {"literal":" "}, {"literal":"-"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SEP", "symbols": ["SEP$string$1"]}
]
  , ParserStart: "RIS"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
