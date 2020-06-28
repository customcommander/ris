/**
 * Copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const moo = require('moo');

const lexer =
  moo.compile
    ( { newline: {match: /\n/, lineBreaks: true}
      , sep: "  - "
      /*
      These tokens define the start of a new record entry:

      TY  - JOUR
      KW  - foo
      ER  - 

      So they should be followed by `  - ` (SPACE SPACE HYPHEN SPACE)
      to be considered as such.

      We use a positive lookahead to make sure that
      they aren't accidentally detected when parsing tag content.

      For example:

      KW  - TY foo bar

      In this case `TY` shouldn't be interpreted as a token but
      as part of the content of the `KW` tag.

      >>>
      */
      , type: /TY(?=  - )/
      , end: /ER(?=  - )/
      , std: /(?:AB|AD|AN|AV|BT|C1|C2|C3|C4|C5|C6|C7|C8|CA|CN|CP|CT|CY|DB|DO|DP|ED|EP|ET|ID|IS|J1|J2|JA|JF|JO|KW|L1|L2|L3|L4|LA|LB|LK|M1|M2|M3|N1|N2|NV|OP|PB|PP|RI|RN|SE|SN|SP|ST|T1|T2|T3|TA|TI|TT|U1|U2|U3|U4|U5|UR|VL|VO|Y1|Y2)(?=  - )/
      , name: /(?:A1|A2|A3|A4|AU)(?=  - )/
      , date: /DA(?=  - )/
      , pubyear: /PY(?=  - )/
      , reprint: /RP(?=  - )/
      /* <<< */
      , type_value:
          [ "ABST"   , "ADVS"  , "AGGR"
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
      , reprint_value:
          { match: /(?:IN FILE|NOT IN FILE|ON REQUEST \(\d{2}\/\d{2}\/\d{4}\))/
          , value: m => m.startsWith('ON REQUEST')
                      ? { status: 'ON REQUEST', date: m.match(/(\d{2})\/(\d{2})\/(\d{4})/).slice(1) }
                      : { status: m }
          }
      , date_value:
          { match: /(?:\d{4})?\/(?:(?:\d\d)?\/){2}(?:[A-Za-z \-]+)?/
          , value: m => m.split('/')
          }
      , name_value:
          { match: /[a-zA-Z \-]+,[a-zA-Z \-\.]+(?:,[a-zA-Z\.]+)*/
          , value: name => name.split(',').map(part => part.trim())
          }
      , pubyear_value : /\d{4}/
      , std_value:
            { match: /[a-zA-Z0-9 \-\t:\/\.;]+/
            , value: m => m.trim()
            }
      }
    );

module.exports = lexer;
