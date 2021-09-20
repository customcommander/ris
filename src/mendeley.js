/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const Ajv = require('ajv');
const ajvFormats = require('ajv-formats');
const schema = require('./mendeley.schema.json');
const { constant, from_ris, to_ris } = require('./transform');

const ajv = new Ajv();
ajvFormats(ajv);

const validate = ajv.compile(schema);

const mdly_name = ({last_name, first_name}) => ({last_name, first_name});
const mdly_ymd = ({year, month, day}) => `${year}-${month}-${day}`;

// RIS -> Mendeley
module.exports.to = from_ris(validate,
  { 'A1':       ['authors[]'                , mdly_name                         ]
  , 'A2':       ['editors[]'                , mdly_name                         ]
  , 'A3':       ['authors[]'                , mdly_name                         ]
  , 'A4':       ['authors[]'                , mdly_name                         ]
  , 'AB':       ['abstract'                                                     ]
  , 'AN':       ['identifiers.pmid'                                             ]
  , 'AU':       ['authors[]'                , mdly_name                         ]
  , 'C6.PAT':   ['patent_legal_status'                                          ]
  , 'CY':       ['city'                                                         ]
  , 'DA':       ['accessed'                 , mdly_ymd                          ]
  , 'DO':       ['identifiers.doi'                                              ]
  , 'ET':       ['edition'                                                      ]
  , 'IS':       ['issue'                                                        ]
  , 'KW':       ['keywords[]'                                                   ]
  , 'L1':       ['websites[]'                                                   ]
  , 'L4':       ['websites[]'                                                   ]
  , 'LA':       ['language'                                                     ]
  , 'LB':       ['tags[]'                                                       ]
  , 'M1.PAT':   ['patent_application_number'                                    ]
  , 'N1':       ['notes+'                                                       ]
  , 'PB':       ['publisher'                                                    ]
  , 'PY':       ['year'                     , Number                            ]
  , 'RN':       ['notes+'                                                       ]
  , 'SE':       ['chapter'                                                      ]
  , 'SN.JFULL': ['identifiers.issn'                                             ]
  , 'SN.JOUR':  ['identifiers.issn'                                             ]
  , 'SN':       ['identifiers.isbn'                                             ]
  , 'SP':       ['pages'                                                        ]
  , 'ST':       ['short_title'                                                  ]
  , 'T2':       ['source'                                                       ]
  , 'T3':       ['series'                                                       ]
  , 'TA':       ['authors[]'                , mdly_name                         ]
  , 'TI':       ['title'                                                        ]
  , 'TY.BILL':  ['type'                     , constant('bill')                  ]
  , 'TY.BOOK':  ['type'                     , constant('book')                  ]
  , 'TY.CASE':  ['type'                     , constant('case')                  ]
  , 'TY.CHAP':  ['type'                     , constant('book_section')          ]
  , 'TY.COMP':  ['type'                     , constant('computer_program')      ]
  , 'TY.CONF':  ['type'                     , constant('conference_proceedings')]
  , 'TY.ENCYC': ['type'                     , constant('encyclopedia_article')  ]
  , 'TY.HEAR':  ['type'                     , constant('hearing')               ]
  , 'TY.ICOMM': ['type'                     , constant('web_page')              ]
  , 'TY.JFULL': ['type'                     , constant('journal')               ]
  , 'TY.JOUR':  ['type'                     , constant('journal')               ]
  , 'TY.MGZN':  ['type'                     , constant('magazine_article')      ]
  , 'TY.MPCT':  ['type'                     , constant('film')                  ]
  , 'TY.NEWS':  ['type'                     , constant('newspaper_article')     ]
  , 'TY.PAT':   ['type'                     , constant('patent')                ]
  , 'TY.RPRT':  ['type'                     , constant('report')                ]
  , 'TY.STAT':  ['type'                     , constant('statute')               ]
  , 'TY.THES':  ['type'                     , constant('thesis')                ]
  , 'TY.UNPB':  ['type'                     , constant('working_paper')         ]
  , 'TY':       ['type'                     , constant('generic')               ]
  , 'UR':       ['websites[]'                                                   ]
  , 'VL.RPRT':  ['series_number'                                                ]
  , 'VL':       ['volume'                                                       ]});

const ris_name =
  ({last_name, first_name}) =>
    (first_name
      ? `${last_name}, ${first_name}`
      : last_name);

const ris_type = (m => v => m[v] || 'GEN')(
  { bill:                   'BILL'
  , book:                   'BOOK'
  , case:                   'CASE'
  , book_section:           'CHAP'
  , computer_program:       'COMP'
  , conference_proceedings: 'CONF'
  , encyclopedia_article:   'ENCYC'
  , generic:                'GEN'
  , hearing:                'HEAR'
  , web_page:               'ICOMM'
  , journal:                'JFULL'
  , journal:                'JOUR'
  , magazine_article:       'MGZN'
  , film:                   'MPCT'
  , newspaper_article:      'NEWS'
  , patent:                 'PAT'
  , report:                 'RPRT'
  , statute:                'STAT'
  , thesis:                 'THES'
  , working_paper:          'UNPB'});

// Mendeley -> RIS
module.exports.from = to_ris(validate,
  { 'abstract':                  ['AB'                            ]
  , 'accessed':                  ['DA', v => v.replace(/-/g, '/') ]
  , 'authors':                   ['AU', ris_name                  ]
  , 'chapter':                   ['SE'                            ]
  , 'citation_key':              ['??'                            ]
  , 'city':                      ['CY'                            ]
  , 'code':                      ['??'                            ]
  , 'country':                   ['??'                            ]
  , 'department':                ['??'                            ]
  , 'edition':                   ['ET'                            ]
  , 'editors':                   ['A2', ris_name                  ]
  , 'genre':                     ['??'                            ]
  , 'identifiers.arxiv':         ['??'                            ]
  , 'identifiers.doi':           ['DO'                            ]
  , 'identifiers.isbn':          ['SN'                            ]
  , 'identifiers.issn':          ['SN'                            ]
  , 'identifiers.pii':           ['??'                            ]
  , 'identifiers.pmid':          ['AN'                            ]
  , 'identifiers.pui':           ['??'                            ]
  , 'identifiers.scopus':        ['??'                            ]
  , 'identifiers.sgr':           ['??'                            ]
  , 'institution':               ['AU'                            ]
  , 'issue':                     ['IS'                            ]
  , 'keywords':                  ['KW'                            ]
  , 'language':                  ['LA'                            ]
  , 'medium':                    ['M3'                            ]
  , 'notes':                     ['RN'                            ]
  , 'pages':                     ['SP'                            ]
  , 'patent_application_number': ['M1'                            ]
  , 'patent_legal_status':       ['C6'                            ]
  , 'patent_owner':              ['??'                            ]
  , 'publisher':                 ['PB'                            ]
  , 'reprint_edition':           ['??'                            ]
  , 'revision':                  ['??'                            ]
  , 'series':                    ['T3'                            ]
  , 'series_editor':             ['AU'                            ]
  , 'series_number':             ['VL'                            ]
  , 'short_title':               ['ST'                            ]
  , 'source':                    ['T2'                            ]
  , 'source_type':               ['??'                            ]
  , 'tags':                      ['LB'                            ]
  , 'title':                     ['TI'                            ]
  , 'translators':               ['TA', ris_name                  ]
  , 'type':                      ['TY', ris_type                  ]
  , 'user_context':              ['??'                            ]
  , 'volume':                    ['VL'                            ]
  , 'websites':                  ['UR'                            ]
  , 'year':                      ['PY'                            ]});
