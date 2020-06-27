/**
 * Copyright (c) 2020 Julien Gonzalez <hello@spinjs.com>
 */

const moo = require('moo');

const lexer =
  moo.compile
    ( { NL: { match: /\n/, lineBreaks: true }
      , SEP: "  - "
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
      , TY: /TY(?=  - )/
      , AB: /AB(?=  - )/
      , AD: /AD(?=  - )/
      , AN: /AN(?=  - )/
      , AU: /AU(?=  - )/
      , A2: /A2(?=  - )/
      , A3: /A3(?=  - )/
      , A4: /A4(?=  - )/
      , AV: /AV(?=  - )/
      , BT: /BT(?=  - )/
      , C1: /C1(?=  - )/
      , C2: /C2(?=  - )/
      , C3: /C3(?=  - )/
      , C4: /C4(?=  - )/
      , C5: /C5(?=  - )/
      , C6: /C6(?=  - )/
      , C7: /C7(?=  - )/
      , C8: /C8(?=  - )/
      , CA: /CA(?=  - )/
      , CN: /CN(?=  - )/
      , CY: /CY(?=  - )/
      , DA: /DA(?=  - )/
      , DB: /DB(?=  - )/
      , DO: /DO(?=  - )/
      , DP: /DP(?=  - )/
      , ET: /ET(?=  - )/
      , J2: /J2(?=  - )/
      , KW: /KW(?=  - )/
      , PY: /PY(?=  - )/
      , RP: /RP(?=  - )/
      , UR: /UR(?=  - )/
      , ER: /ER(?=  - )/
      /* <<< */
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
      , RP_CONTENT: /(?:IN FILE|NOT IN FILE|ON REQUEST \(\d{2}\/\d{2}\/\d{4}\))/
      , DATE_CONTENT: /(?:\d{4})?\/(?:(?:\d\d)?\/){2}(?:[A-Za-z \-]+)?/
      , NAME_CONTENT: { match: /[a-zA-Z \-]+,[a-zA-Z \-\.]+(?:,[a-zA-Z\.]+)*/
                      , value:  name => name.split(',').map(part => part.trim())
                      }
      , PUBYEAR_CONTENT : /\d{4}/
      , CONTENT: /[a-zA-Z0-9 \-\.':/;]+/
      }
    );

module.exports = lexer;
