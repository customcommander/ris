/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const Ajv = require('ajv');
const ajvFormats = require('ajv-formats');
const schema = require('./mendeley.schema.json');
const parser = require('./parser');

const name = ({last_name, first_name}) => ({last_name, first_name});
const ymd = ({year, month, day}) => `${year}-${month}-${day}`;

const ajv = new Ajv();
ajvFormats(ajv);

const validate = ajv.compile(schema);

/*
-- TL; DR ---------------------------------------------------------------------

The following RIS record:

TY  - JOUR
TI  - lorem ipsum
AU  - Doe, John
AU  - Foo, Bart
A1  - Baz, Nina
DO  - doi123
ER  - 

Produces the following raw object:

[ { TY: 'JOUR'
  , TI: 'lorem ipsum'
  , AU: [ {last_name: 'Doe', first_name: 'John', initials: '', suffix: ''}
        , {last_name: 'Foo', first_name: 'Bart', initials: '', suffix: ''}]
  , A1: [ {last_name: 'Baz', first_name: 'Nina', initials: '', suffix: ''}]
  , DO: 'doi123'
  }]

Which is reprocessed into a Mendeley-compatible object:
(See also mendeley.schema.json)

[ { type: 'journal'
  , title: 'lorem ipsum
  , authors: [ {last_name: 'Doe', first_name: 'John'}
             , {last_name: 'Foo', first_name: 'Bart'}
             , {last_name: 'Baz', first_name: 'Nina'}]
  , identifiers: {doi: 'doi123'}
  }]

-------------------------------------------------------------------------------

The following map defines a set of rules for translating objects
from one domain into another.

Each rule is a tuple of one or two elements.

The first element is always the name of the destination key.
There are some special processing notations:

-   `[]` e.g. 'authors[]'
    Indicates that the destination is an array.
    Incoming values should be accumulated into the array.

-   `.` e.g. 'identifiers.doi`
    Indicates that the destination is an object.
    Incoming value should be assigned to `doi` within the `identifiers` object.

-   `+` e.g. 'notes+'
    Incoming values should be appended to the destination
    using a new line character.

The second element (optional) can be either a string or a function:

-   When set to a string, the destination value will be that string.

-   When set to a function, the function is applied to the corresponding
    property in the raw object and the result becomes the destination value.

Don't forget to update the README.md file when appropriate.*/

const map = {
  'A1':       ['authors[]'       , name                    ],
  'A2':       ['editors[]'       , name                    ],
  'A3':       ['authors[]'       , name                    ],
  'A4':       ['authors[]'       , name                    ],
  'AB':       ['abstract'                                  ],
  'AN':       ['identifiers.pmid'                          ],
  'AU':       ['authors[]'       , name                    ],
  'C6.PAT':   ['patent_legal_status'                       ],
  'CY':       ['city'                                      ],
  'DA':       ['accessed'        , ymd                     ],
  'DO':       ['identifiers.doi'                           ],
  'ET':       ['edition'                                   ],
  'IS':       ['issue'                                     ],
  'KW':       ['keywords[]'                                ],
  'L1':       ['websites[]'                                ],
  'L4':       ['websites[]'                                ],
  'LA':       ['language'                                  ],
  'LB':       ['tags[]'                                    ],
  'M1.PAT':   ['patent_application_number'                 ],
  'N1':       ['notes+'                                    ],
  'PB':       ['publisher'                                 ],
  'PY':       ['year'            , Number                  ],
  'RN':       ['notes+'                                    ],
  'SE':       ['chapter'                                   ],
  'SN.JFULL': ['identifiers.issn'                          ],
  'SN.JOUR':  ['identifiers.issn'                          ],
  'SN':       ['identifiers.isbn'                          ],
  'SP':       ['pages'                                     ],
  'ST':       ['short_title'                               ],
  'T2':       ['source'                                    ],
  'T3':       ['series'                                    ],
  'TA':       ['authors[]'       , name                    ],
  'TI':       ['title'                                     ],
  'TY.BILL':  ['type'            , 'bill'                  ],
  'TY.BOOK':  ['type'            , 'book'                  ],
  'TY.CASE':  ['type'            , 'case'                  ],
  'TY.CHAP':  ['type'            , 'book_section'          ],
  'TY.COMP':  ['type'            , 'computer_program'      ],
  'TY.CONF':  ['type'            , 'conference_proceedings'],
  'TY.ENCYC': ['type'            , 'encyclopedia_article'  ],
  'TY.HEAR':  ['type'            , 'hearing'               ],
  'TY.ICOMM': ['type'            , 'web_page'              ],
  'TY.JFULL': ['type'            , 'journal'               ],
  'TY.JOUR':  ['type'            , 'journal'               ],
  'TY.MGZN':  ['type'            , 'magazine_article'      ],
  'TY.MPCT':  ['type'            , 'film'                  ],
  'TY.NEWS':  ['type'            , 'newspaper_article'     ],
  'TY.PAT':   ['type'            , 'patent'                ],
  'TY.RPRT':  ['type'            , 'report'                ],
  'TY.STAT':  ['type'            , 'statute'               ],
  'TY.THES':  ['type'            , 'thesis'                ],
  'TY.UNPB':  ['type'            , 'working_paper'         ],
  'TY':       ['type'            , 'generic'               ],
  'UR':       ['websites[]'                                ],
  'VL.RPRT':  ['series_number'                             ],
  'VL':       ['volume'                                    ]
};

module.exports.to = risText => parser(risText).reduce((arr, ris) => {
  const mdly = Object.entries(ris).reduce((obj, [rkey, rval]) => {

    const [k, v] = (  map[`${rkey}.${ris.TY}`]
                   || map[rkey]
                   || []);

    if (!k) return obj;

    const fn = ( typeof v == 'function' ? v
               : typeof v == 'string'   ? () => v
                                        : x => x);

    if (k.endsWith('[]')) {
      let sym = k.slice(0, -2); // e.g. 'authors[]' -> 'authors'
      obj[sym] = (obj[sym] || []).concat(Array.isArray(rval) ? rval.map(fn) : fn(rval));
    } else if (k.includes('.')) {
      let [root, child] = k.split('.'); // e.g. 'identifiers.doi' -> ['identifiers', 'doi']
      obj[root] = obj[root] || {};
      obj[root][child] = fn(rval);
    } else if (k.endsWith('+')) {
      let sym = k.slice(0, -1); // e.g. 'notes+' -> 'notes'
      obj[sym] = sym in obj ? `${obj[sym]}\n${fn(rval)}` : fn(rval);
    } else {
      obj[k] = fn(rval);
    }

    return obj;
  }, {});

  if (validate(mdly)) {
    arr.push(mdly);
  }

  return arr;
}, []);



/*****************************************************************************
 * FROM MENDELEY TO RIS                                                      *
 *****************************************************************************/



const ris_copy = (field, value) => `${field}  - ${value}\n`;
const ris_eor = () => 'ER  - \n';
const ris_ignore = () => '';

const ris_name =
  (field, {last_name, first_name}) =>
    (first_name
      ? ris_copy(field, `${last_name}, ${first_name}`)
      : ris_copy(field, last_name));

const ris_dateaccess =
  (field, value) =>
    ris_copy(field, value.replace(/-/g, '/'));

const typeMendeleyToRIS =
  { "bill":                   "BILL"
  , "book":                   "BOOK"
  , "case":                   "CASE"
  , "book_section":           "CHAP"
  , "computer_program":       "COMP"
  , "conference_proceedings": "CONF"
  , "encyclopedia_article":   "ENCYC"
  , "generic":                "GEN"
  , "hearing":                "HEAR"
  , "web_page":               "ICOMM"
  , "journal":                "JFULL"
  , "journal":                "JOUR"
  , "magazine_article":       "MGZN"
  , "film":                   "MPCT"
  , "newspaper_article":      "NEWS"
  , "patent":                 "PAT"
  , "report":                 "RPRT"
  , "statute":                "STAT"
  , "thesis":                 "THES"
  , "working_paper":          "UNPB" };

const ris_type =
  (field, value) =>
    ( value in typeMendeleyToRIS
        ? ris_copy(field, typeMendeleyToRIS[value])
        : ris_copy(field, "GEN"));


/*
Keys in the map correspond to Mendeley references fields.
See https://dev.mendeley.com/methods/#documents

Each Mendeley field is mapped to a RIS field e.g. abstract -> AB and the map
also defines how to handle values when moving them across domains.

Most of the time we simply copy them from one domain into another but there
are certain fields that need to be converted.

For example names in Mendeley are objects e.g. {last_name: 'Doe', first_name: 'John'}
which need to be converted to a string in RIS e.g. 'Doe, John'.

There isn't an obvious RIS equivalent for some of the Mendeley fields.
Those are assigned a fake `??` RIS entry type and are simply ignored.
We want to keep them in this map so that we know which fields in Mendeley
won't be exported into RIS. (Also maybe one day some of these fields can be
assigned to actual RIS fields.) */

const mapFrom =
  { "abstract":                  ["AB", ris_copy       ]
  , "accessed":                  ["DA", ris_dateaccess ]
  , "authors":                   ["AU", ris_name       ]
  , "chapter":                   ["SE", ris_copy       ]
  , "citation_key":              ["??", ris_ignore     ]
  , "city":                      ["CY", ris_copy       ]
  , "code":                      ["??", ris_ignore     ]
  , "country":                   ["??", ris_ignore     ]
  , "department":                ["??", ris_ignore     ]
  , "edition":                   ["ET", ris_copy       ]
  , "editors":                   ["A2", ris_name       ]
  , "genre":                     ["??", ris_ignore     ]
  , "identifiers.arxiv":         ["??", ris_ignore     ]
  , "identifiers.doi":           ["DO", ris_copy       ]
  , "identifiers.isbn":          ["SN", ris_copy       ]
  , "identifiers.issn":          ["SN", ris_copy       ]
  , "identifiers.pii":           ["??", ris_ignore     ]
  , "identifiers.pmid":          ["AN", ris_copy       ]
  , "identifiers.pui":           ["??", ris_ignore     ]
  , "identifiers.scopus":        ["??", ris_ignore     ]
  , "identifiers.sgr":           ["??", ris_ignore     ]
  , "institution":               ["AU", ris_copy       ]
  , "issue":                     ["IS", ris_copy       ]
  , "keywords":                  ["KW", ris_copy       ]
  , "language":                  ["LA", ris_copy       ]
  , "medium":                    ["M3", ris_copy       ]
  , "notes":                     ["RN", ris_copy       ]
  , "pages":                     ["SP", ris_copy       ]
  , "patent_application_number": ["M1", ris_copy       ]
  , "patent_legal_status":       ["C6", ris_copy       ]
  , "patent_owner":              ["??", ris_ignore     ]
  , "publisher":                 ["PB", ris_copy       ]
  , "reprint_edition":           ["??", ris_ignore     ]
  , "revision":                  ["??", ris_ignore     ]
  , "series":                    ["T3", ris_copy       ]
  , "series_editor":             ["AU", ris_copy       ]
  , "series_number":             ["VL", ris_copy       ]
  , "short_title":               ["ST", ris_copy       ]
  , "source":                    ["T2", ris_copy       ]
  , "source_type":               ["??", ris_ignore     ]
  , "tags":                      ["LB", ris_copy       ]
  , "title":                     ["TI", ris_copy       ]
  , "translators":               ["TA", ris_name       ]
  , "type":                      ["TY", ris_type       ]
  , "user_context":              ["??", ris_ignore     ]
  , "volume":                    ["VL", ris_copy       ]
  , "websites":                  ["UR", ris_copy       ]
  , "year":                      ["PY", ris_copy       ]};

/*
Transform a Mendeley reference into a RIS record.
See mendeley.schema.json
*/
const ris_record = ref => {
  const rec = Object.entries(ref).reduce((ris, [mk, mv/*Mendeley key & value*/]) => {
    let rk; //RIS key
    let rv; //RIS value
    if (mk == "identifiers") {
      let {arxiv, doi, isbn, issn, pii, pmid, pui, scopus, sgr} = mv;
      [rk, rv] = mapFrom['identifiers.arxiv' ]; ris += arxiv  ? rv(rk, arxiv)  : '';
      [rk, rv] = mapFrom['identifiers.doi'   ]; ris += doi    ? rv(rk, doi)    : '';
      [rk, rv] = mapFrom['identifiers.isbn'  ]; ris += isbn   ? rv(rk, isbn)   : '';
      [rk, rv] = mapFrom['identifiers.issn'  ]; ris += issn   ? rv(rk, issn)   : '';
      [rk, rv] = mapFrom['identifiers.pii'   ]; ris += pii    ? rv(rk, pii)    : '';
      [rk, rv] = mapFrom['identifiers.pmid'  ]; ris += pmid   ? rv(rk, pmid)   : '';
      [rk, rv] = mapFrom['identifiers.pui'   ]; ris += pui    ? rv(rk, pui)    : '';
      [rk, rv] = mapFrom['identifiers.scopus']; ris += scopus ? rv(rk, scopus) : '';
      [rk, rv] = mapFrom['identifiers.sgr'   ]; ris += sgr    ? rv(rk, sgr)    : '';
    } else if (Array.isArray(mv)) {
      [rk, rv] = mapFrom[mk];
      ris += mv.map(x => rv(rk, x)).join('');
    } else {
      [rk, rv] = mapFrom[mk];
      ris += rv(rk, mv);
    }
    return ris;
  }, '');
  if (!rec) return '';
  return rec + ris_eor();
};

module.exports.from =
  references =>
    references.reduce((ris, ref) =>
      ( validate(ref)
          ? ris + ris_record(ref)
          : ris), '');
