/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const Ajv = require('ajv');
const ajvFormats = require('ajv-formats');
const schema = require('./mendeley.schema.json');
const read = require('./read');
const write = require('./write');

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

module.exports.to = risText => read(risText).reduce((arr, ris) => {
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
      obj[sym] = (obj[sym] || []).concat(rval.map(fn));
    } else if (k.includes('.')) {
      let [root, child] = k.split('.'); // e.g. 'identifiers.doi' -> ['identifiers', 'doi']
      obj[root] = obj[root] || {};
      obj[root][child] = fn(rval[0]);
    } else if (k.endsWith('+')) {
      let sym = k.slice(0, -1); // e.g. 'notes+' -> 'notes'
      obj[sym] = sym in obj ? `${obj[sym]}\n${fn(rval[0])}` : fn(rval[0]);
    } else {
      obj[k] = fn(rval[0]);
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


const ris_entry = fn => k => (ris, v) => {
  const v2 = fn(v);
  if (v2 != null) {
    if (!ris[k]) ris[k] = [];
    ris[k].push(v2)
  };
}

const ris_copy = ris_entry(v => v);

const ris_ignore = ris => ris;

const ris_name =
  ris_entry(({last_name, first_name}) =>
    (first_name
      ? `${last_name}, ${first_name}`
      : last_name));

const ris_dateaccess = ris_entry(v => v.replace(/-/g, '/'));

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

const ris_type = ris_entry(v => typeMendeleyToRIS[v] || "GEN");


/*
Keys in the map correspond to Mendeley references fields.
See https://dev.mendeley.com/methods/#documents

Each Mendeley field is mapped to a RIS field e.g. abstract -> AB and the map
also defines how to handle values when moving them across domains.

Most of the time we simply copy them from one domain into another but there
are certain fields that need to be converted.

For example names in Mendeley are objects e.g. {last_name: 'Doe', first_name: 'John'}
which need to be converted to a string in RIS e.g. 'Doe, John'.

There isn't an obvious RIS equivalent for some
of the Mendeley fields and those are simply ignored.
We want to keep them in this map so that we know which fields in Mendeley
won't be exported into RIS. (Also maybe one day some of these fields can be
assigned to actual RIS fields.) */

const map_from =
  { "abstract":                  ris_copy("AB")
  , "accessed":                  ris_dateaccess("DA")
  , "authors":                   ris_name("AU")
  , "chapter":                   ris_copy("SE")
  , "citation_key":              ris_ignore
  , "city":                      ris_copy("CY")
  , "code":                      ris_ignore
  , "country":                   ris_ignore
  , "department":                ris_ignore
  , "edition":                   ris_copy("ET")
  , "editors":                   ris_name("A2")
  , "genre":                     ris_ignore
  , "identifiers.arxiv":         ris_ignore
  , "identifiers.doi":           ris_copy("DO")
  , "identifiers.isbn":          ris_copy("SN")
  , "identifiers.issn":          ris_copy("SN")
  , "identifiers.pii":           ris_ignore
  , "identifiers.pmid":          ris_copy("AN")
  , "identifiers.pui":           ris_ignore
  , "identifiers.scopus":        ris_ignore
  , "identifiers.sgr":           ris_ignore
  , "institution":               ris_copy("AU")
  , "issue":                     ris_copy("IS")
  , "keywords":                  ris_copy("KW")
  , "language":                  ris_copy("LA")
  , "medium":                    ris_copy("M3")
  , "notes":                     ris_copy("RN")
  , "pages":                     ris_copy("SP")
  , "patent_application_number": ris_copy("M1")
  , "patent_legal_status":       ris_copy("C6")
  , "patent_owner":              ris_ignore
  , "publisher":                 ris_copy("PB")
  , "reprint_edition":           ris_ignore
  , "revision":                  ris_ignore
  , "series":                    ris_copy("T3")
  , "series_editor":             ris_copy("AU")
  , "series_number":             ris_copy("VL")
  , "short_title":               ris_copy("ST")
  , "source":                    ris_copy("T2")
  , "source_type":               ris_ignore
  , "tags":                      ris_copy("LB")
  , "title":                     ris_copy("TI")
  , "translators":               ris_name("TA")
  , "type":                      ris_type("TY")
  , "user_context":              ris_ignore
  , "volume":                    ris_copy("VL")
  , "websites":                  ris_copy("UR")
  , "year":                      ris_copy("PY")};

/*
Transform a Mendeley reference into a RIS record.
See mendeley.schema.json
*/
const ris_record = ref => Object.entries(ref).reduce((ris, [mk, mv]) => {
  if (mk == "identifiers") {
    let {arxiv, doi, isbn, issn, pii, pmid, pui, scopus, sgr} = mv;
    map_from['identifiers.arxiv' ](ris, arxiv);
    map_from['identifiers.doi'   ](ris, doi);
    map_from['identifiers.isbn'  ](ris, isbn);
    map_from['identifiers.issn'  ](ris, issn);
    map_from['identifiers.pii'   ](ris, pii);
    map_from['identifiers.pmid'  ](ris, pmid);
    map_from['identifiers.pui'   ](ris, pui);
    map_from['identifiers.scopus'](ris, scopus);
    map_from['identifiers.sgr'   ](ris, sgr);
  } else if (Array.isArray(mv)) {
    mv.forEach(v => map_from[mk](ris, v));
  } else {
    map_from[mk](ris, mv);
  }
  return ris;
}, {});

module.exports.from = references => {
  if (!Array.isArray(references)) return '';
  return write(references.flatMap(ref => validate(ref) === true ? [ris_record(ref)] : []));
}
