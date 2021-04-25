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
