/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const Ajv = require('ajv');
const ajvFormats = require('ajv-formats');
const schema = require('./mendeley.schema.json');
const read = require('./read');
const write = require('./write');

const ajv = new Ajv();
ajvFormats(ajv);

const validate = ajv.compile(schema);

const copy = x => x;
const constant = x => () => x;
const noop = () => {};

const mdly_name = ({last_name, first_name}) => ({last_name, first_name});
const mdly_ymd = ({year, month, day}) => `${year}-${month}-${day}`;

const mdly_entry = op => (k, fn) => (o, vs) => {
  vs.map(v => fn(v)).forEach(v => {
    op(o, k, v);
  });
};

const mdly_set = mdly_entry((o, k, v) => {
  o[k] = v;
});

const mdly_txt = mdly_entry((o, k, v) => {
  o[k] = o[k] == null ? v : `${o[k]}\n${v}`;
});

const mdly_arr = mdly_entry((o, k, v) => {
  if (o[k] == null) o[k] = [];
  o[k].push(v);
});

const mdly_obj = mdly_entry((o, k, v) => {
  const ks = k.split('.'); // k is a path e.g. 'foo.bar.baz'
  const fk = ks.pop(); // final key e.g. 'baz' in 'foo.bar.baz'
  let tk; // temporary key
  let p = o; // pointer
  while (tk = ks.shift()) {
    if (p[tk] == null) p[tk] = {};
    p = p[tk];
  }
  p[fk] = v;
});

const map_to =
  { 'A1':       mdly_arr('authors'                  , mdly_name                         )
  , 'A2':       mdly_arr('editors'                  , mdly_name                         )
  , 'A3':       mdly_arr('authors'                  , mdly_name                         )
  , 'A4':       mdly_arr('authors'                  , mdly_name                         )
  , 'AB':       mdly_set('abstract'                 , copy                              )
  , 'AN':       mdly_obj('identifiers.pmid'         , copy                              )
  , 'AU':       mdly_arr('authors'                  , mdly_name                         )
  , 'C6.PAT':   mdly_set('patent_legal_status'      , copy                              )
  , 'CY':       mdly_set('city'                     , copy                              )
  , 'DA':       mdly_set('accessed'                 , mdly_ymd                          )
  , 'DO':       mdly_obj('identifiers.doi'          , copy                              )
  , 'ET':       mdly_set('edition'                  , copy                              )
  , 'IS':       mdly_set('issue'                    , copy                              )
  , 'KW':       mdly_arr('keywords'                 , copy                              )
  , 'L1':       mdly_arr('websites'                 , copy                              )
  , 'L4':       mdly_arr('websites'                 , copy                              )
  , 'LA':       mdly_set('language'                 , copy                              )
  , 'LB':       mdly_arr('tags'                     , copy                              )
  , 'M1.PAT':   mdly_set('patent_application_number', copy                              )
  , 'N1':       mdly_txt('notes'                    , copy                              )
  , 'PB':       mdly_set('publisher'                , copy                              )
  , 'PY':       mdly_set('year'                     , Number                            )
  , 'RN':       mdly_txt('notes'                    , copy                              )
  , 'SE':       mdly_set('chapter'                  , copy                              )
  , 'SN.JFULL': mdly_obj('identifiers.issn'         , copy                              )
  , 'SN.JOUR':  mdly_obj('identifiers.issn'         , copy                              )
  , 'SN':       mdly_obj('identifiers.isbn'         , copy                              )
  , 'SP':       mdly_set('pages'                    , copy                              )
  , 'ST':       mdly_set('short_title'              , copy                              )
  , 'T2':       mdly_set('source'                   , copy                              )
  , 'T3':       mdly_set('series'                   , copy                              )
  , 'TA':       mdly_arr('authors'                  , mdly_name                         )
  , 'TI':       mdly_set('title'                    , copy                              )
  , 'TY.BILL':  mdly_set('type'                     , constant('bill'                  ))
  , 'TY.BOOK':  mdly_set('type'                     , constant('book'                  ))
  , 'TY.CASE':  mdly_set('type'                     , constant('case'                  ))
  , 'TY.CHAP':  mdly_set('type'                     , constant('book_section'          ))
  , 'TY.COMP':  mdly_set('type'                     , constant('computer_program'      ))
  , 'TY.CONF':  mdly_set('type'                     , constant('conference_proceedings'))
  , 'TY.ENCYC': mdly_set('type'                     , constant('encyclopedia_article'  ))
  , 'TY.HEAR':  mdly_set('type'                     , constant('hearing'               ))
  , 'TY.ICOMM': mdly_set('type'                     , constant('web_page'              ))
  , 'TY.JFULL': mdly_set('type'                     , constant('journal'               ))
  , 'TY.JOUR':  mdly_set('type'                     , constant('journal'               ))
  , 'TY.MGZN':  mdly_set('type'                     , constant('magazine_article'      ))
  , 'TY.MPCT':  mdly_set('type'                     , constant('film'                  ))
  , 'TY.NEWS':  mdly_set('type'                     , constant('newspaper_article'     ))
  , 'TY.PAT':   mdly_set('type'                     , constant('patent'                ))
  , 'TY.RPRT':  mdly_set('type'                     , constant('report'                ))
  , 'TY.STAT':  mdly_set('type'                     , constant('statute'               ))
  , 'TY.THES':  mdly_set('type'                     , constant('thesis'                ))
  , 'TY.UNPB':  mdly_set('type'                     , constant('working_paper'         ))
  , 'TY':       mdly_set('type'                     , constant('generic'               ))
  , 'UR':       mdly_arr('websites'                 , copy                              )
  , 'VL.RPRT':  mdly_set('series_number'            , copy                              )
  , 'VL':       mdly_set('volume'                   , copy                              )};

module.exports.to = risText => read(risText).reduce((arr, ris) => {
  const mdly = Object.entries(ris).reduce((obj, [rkey, rval]) => {
    const fn = map_to[`${rkey}.${ris.TY[0]}`] || map_to[rkey] || noop;
    fn(obj, rval);
    return obj;
  }, {});
  if (validate(mdly)) arr.push(mdly);
  return arr;
}, []);

/*****************************************************************************
 * FROM MENDELEY TO RIS                                                      *
 *****************************************************************************/

const ris_name =
  ({last_name, first_name}) =>
    (first_name
      ? `${last_name}, ${first_name}`
      : last_name);

const ris_type = (m => v => m[v] || "GEN")(
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
  , working_paper:          'UNPB"'});

const map_from = (m => k => m[k] || noop)(
  { "abstract":                  write.entry("AB", copy)
  , "accessed":                  write.entry("DA", v => v.replace(/-/g, '/'))
  , "authors":                   write.entry("AU", ris_name)
  , "chapter":                   write.entry("SE", copy)
  , "citation_key":              noop
  , "city":                      write.entry("CY", copy)
  , "code":                      noop
  , "country":                   noop
  , "department":                noop
  , "edition":                   write.entry("ET", copy)
  , "editors":                   write.entry("A2", ris_name)
  , "genre":                     noop
  , "identifiers.arxiv":         noop
  , "identifiers.doi":           write.entry("DO", copy)
  , "identifiers.isbn":          write.entry("SN", copy)
  , "identifiers.issn":          write.entry("SN", copy)
  , "identifiers.pii":           noop
  , "identifiers.pmid":          write.entry("AN", copy)
  , "identifiers.pui":           noop
  , "identifiers.scopus":        noop
  , "identifiers.sgr":           noop
  , "institution":               write.entry("AU", copy)
  , "issue":                     write.entry("IS", copy)
  , "keywords":                  write.entry("KW", copy)
  , "language":                  write.entry("LA", copy)
  , "medium":                    write.entry("M3", copy)
  , "notes":                     write.entry("RN", copy)
  , "pages":                     write.entry("SP", copy)
  , "patent_application_number": write.entry("M1", copy)
  , "patent_legal_status":       write.entry("C6", copy)
  , "patent_owner":              noop
  , "publisher":                 write.entry("PB", copy)
  , "reprint_edition":           noop
  , "revision":                  noop
  , "series":                    write.entry("T3", copy)
  , "series_editor":             write.entry("AU", copy)
  , "series_number":             write.entry("VL", copy)
  , "short_title":               write.entry("ST", copy)
  , "source":                    write.entry("T2", copy)
  , "source_type":               noop
  , "tags":                      write.entry("LB", copy)
  , "title":                     write.entry("TI", copy)
  , "translators":               write.entry("TA", ris_name)
  , "type":                      write.entry("TY", ris_type)
  , "user_context":              noop
  , "volume":                    write.entry("VL", copy)
  , "websites":                  write.entry("UR", copy)
  , "year":                      write.entry("PY", copy)});

/*
Transform a Mendeley reference into a RIS record.
See mendeley.schema.json
*/
const ris_record = ref => Object.entries(ref).reduce((ris, [mk, mv]) => {
  if (mk == "identifiers") {
    const {arxiv, doi, isbn, issn, pii, pmid, pui, scopus, sgr} = mv;
    if (arxiv)  map_from('identifiers.arxiv' )(ris, arxiv);
    if (doi)    map_from('identifiers.doi'   )(ris, doi);
    if (isbn)   map_from('identifiers.isbn'  )(ris, isbn);
    if (issn)   map_from('identifiers.issn'  )(ris, issn);
    if (pii)    map_from('identifiers.pii'   )(ris, pii);
    if (pmid)   map_from('identifiers.pmid'  )(ris, pmid);
    if (pui)    map_from('identifiers.pui'   )(ris, pui);
    if (scopus) map_from('identifiers.scopus')(ris, scopus);
    if (sgr)    map_from('identifiers.sgr'   )(ris, sgr);
    return ris;
  }
  const fn = map_from(mk);
  (Array.isArray(mv) ? mv : [mv]).forEach(v => fn(ris, v));
  return ris;
}, {});

module.exports.from = references => {
  if (!Array.isArray(references)) return '';
  return write(references.flatMap(ref => validate(ref) === true ? [ris_record(ref)] : []));
}
