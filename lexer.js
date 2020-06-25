/**
 * Copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const moo = require('moo');

const lexer =
  moo.compile
    ( { NL: { match: /\n/, lineBreaks: true }
      , SEP: "  - "
      , TY: "TY"
      , AB: "AB"
      , AD: "AD"
      , AN: "AN"
      , DA: "DA"
      , KW: "KW"
      , PY: "PY"
      , UR: "UR"
      , ER: "ER"
      , TY_VAL: [ "ABST"   , "ADVS"  , "AGGR"
                , "ANCIENT", "ART"   , "BILL"
                , "BLOG"   , "BOOK"  , "CASE"
                , "CHAP"   , "CHART" , "CLSWK"
                , "COMP"   , "CONF"  , "CPAPER"
                , "CTLG"   , "DATA"  , "DBASE"
                , "DICT"   , "EBOOK" , "ECHAP"
                , "EDBOOK" , "EJOUR" , "ELEC"
                , "ENCYC"  , "EQUA"  , "FIGURE"
                , "GEN"    , "GOVDOC", "GRNT"
                , "HEAR"   , "ICOMM" , "INPR"
                , "JFULL"  , "JOUR"  , "LEGAL"
                , "MANSCPT", "MAP"   , "MGZN"
                , "MPCT"   , "MULTI" , "MUSIC"
                , "NEWS"   , "PAMP"  , "PAT"
                , "PCOMM"  , "RPRT"  , "SER"
                , "SLIDE"  , "SOUND" , "STAND"
                , "STAT"   , "THES"  , "UNBILL"
                , "UNPD"   , "VIDEO"
                ]
      , DATE_CONTENT: /(?:\d{4})?\/(?:(?:\d\d)?\/){2}(?:[A-Za-z \-]+)?/
      , PUBYEAR_CONTENT : /\d{4}/
      , CONTENT: /[a-zA-Z0-9 \-\.':/;]+/
      }
    );

module.exports = lexer;
