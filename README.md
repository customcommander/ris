# RIS

A package for parsing bibliographic content in the [RIS format][ris-file-format].

[ris-file-format]: https://en.wikipedia.org/wiki/RIS_(file_format)

## Install

```
yarn add @customcommander/ris
```

or

```
npm -i @customcommander/ris
```

## Usage

```javascript
const parse = require('@customcommander/ris');

parse(`
TY  - JOUR
ER  - 
TY  - BOOK
ER  - 
TY  - CHAP
ER  - 
`);

//=> [ { TY: "JOUR" }
//=> , { TY: "BOOK" }
//=> , { TY: "CHAP" }
//=> ]
```

## Mapping Tag

RIS tags are quite terse. They can be mapped to human-friendly names:

```javascript
const parse = require('@customcommander/ris');

parse(`
TY  - JOUR
AB  - this is my abstract
ER  - 
`);

//=> [ { TY: "JOUR"
//=>   , AB: "this is my abstract"
//=>   }
//=> ]

// vs

parse.map(`
TY  - JOUR
AB  - this is my abstract
ER  - 
`);

//=> [ { '@type': "Journal"
//=>   , abstract: "this is my abstract"
//=>   }
//=> ]
```

Here's the complete map for each type of RIS reference:

|Type|TY|A2|A3|A4|AB|AD|AN|AU|C1|C2|C3|C4|C5|C6|C7|C8|CA|CN|CT|CY|DA|DB|DO|DP|ET|IS|J2|KW|L1|L4|LA|LB|M1|M2|M3|N1|NV|OP|PB|PY|RI|RN|RP|SE|SN|SP|ST|SV|T2|T3|TA|TI|TT|UR|VL|
|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
|ABST|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|author|legal_note|pmcid|_N/A_|_N/A_|_N/A_|nihmsid|article_no|_N/A_|caption|call_no|_N/A_|_N/A_|date|db_name|doi|db_provider|epub_date|issue|journal_alt|keywords|file_attm|figure|language|label|_N/A_|page_start|type|notes|_N/A_|original_publ|_N/A_|year|reviewed_item|research_notes|reprint_edition|_N/A_|issn|pages|title_short|_N/A_|journal|_N/A_|author_translated|title|title_translated|url|volume|
|ADVS|@type|performers|series_editor|_N/A_|abstract|author_addr|accession_no|author|cast|credits|size_or_length|_N/A_|format|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|number|_N/A_|type|notes|extent_of_work|content|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|isbn|_N/A_|title_short|_N/A_|_N/A_|series_title|author_translated|title|title_translated|url|volume|
|AGGR|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|author|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|_N/A_|_N/A_|city|date_accessed|db_name|doi|db_provider|date_published|_N/A_|title_alt|keywords|file_attm|figure|language|label|publication_no|_N/A_|type|notes|_N/A_|original_publ|publisher|year|_N/A_|research_notes|_N/A_|screens|isbn_issn|pages|title_short|_N/A_|periodical|_N/A_|author_translated|title|title_translated|url|volume|
|ANCIENT|@type|editor|_N/A_|translator|abstract|author_addr|accession_no|author|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|publication_abbr|keywords|file_attm|figure|language|label|text_no|_N/A_|type|notes|volumes_count|original_publ|publisher|year|reviewed_item|research_notes|reprint_edition|_N/A_|isbn|pages|title_short|_N/A_|publication_title|volume_title|author_translated|title|title_translated|url|volume|
|ART|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|artist|_N/A_|_N/A_|size_or_length|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|size|_N/A_|type|notes|_N/A_|_N/A_|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|description|title_short|_N/A_|_N/A_|_N/A_|author_translated|title|title_translated|url|_N/A_|
|BILL|@type|sponsor|_N/A_|_N/A_|abstract|author_addr|accession_no|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|_N/A_|date|db_name|doi|db_provider|session|_N/A_|_N/A_|keywords|file_attm|figure|language|label|bill_no|_N/A_|_N/A_|notes|_N/A_|history|_N/A_|year|_N/A_|research_notes|_N/A_|code_section|_N/A_|code_pages|title_short|_N/A_|code|legislative_body|author_translated|title|title_translated|url|code_volume|
|BLOG|@type|editor|illustrator|_N/A_|abstract|author_addr|accession_no|author|author_affiliation|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|last_updated|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|_N/A_|_N/A_|type|notes|_N/A_|content|publisher|year|_N/A_|research_notes|_N/A_|message_no|isbn|description|title_short|_N/A_|title|institution|author_translated|entry_title|title_translated|url|access_year|
|BOOK|@type|series_editor|editor|translator|abstract|author_addr|accession_no|author|_N/A_|_N/A_|title_prefix|reviewer|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|abbreviation|keywords|file_attm|figure|language|label|series_volume|_N/A_|type|notes|volumes_count|original_publ|publisher|year|_N/A_|research_notes|reprint_edition|pages|isbn|pages_count|title_short|_N/A_|series_title|_N/A_|author_translated|title|title_translated|url|volume|
|CASE|@type|reporter|higher_court|counsel|abstract|author_addr|accession_no|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|_N/A_|date_decided|db_name|doi|db_provider|action_of_higher_court|_N/A_|_N/A_|keywords|file_attm|figure|language|label|_N/A_|_N/A_|citation_of_reversal|notes|reporter_abbrev|history|court|year_decided|_N/A_|research_notes|_N/A_|date_filed|_N/A_|page_first|case_name_abbr|_N/A_|_N/A_|decision|author_translated|case_name|title_translated|url|reporter_volume|
|CHAP|@type|editor|series_editor|translator|abstract|author_addr|accession_no|author|section|_N/A_|title_prefix|reviewer|packaging_method|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|_N/A_|db_name|doi|db_provider|edition|volumes_count|abbreviation|keywords|file_attm|figure|language|label|_N/A_|_N/A_|_N/A_|notes|_N/A_|original_publ|publisher|year|reviewed_item|research_notes|reprint_edition|chapter|isbn|pages|title_short|series_volume|title_book|series_title|author_translated|title|title_translated|url|volume|
|CHART|@type|file_name|_N/A_|_N/A_|abstract|author_addr|accession_no|created_by|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|version|_N/A_|_N/A_|keywords|file_attm|figure|language|label|number|_N/A_|type|notes|_N/A_|_N/A_|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|description|_N/A_|_N/A_|source|_N/A_|author_translated|title|title_translated|url|size|
|CLSWK|@type|series_editor|_N/A_|translator|abstract|author_addr|accession_no|attribution|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|_N/A_|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|series_volume|_N/A_|type|notes|volumes_count|original_publ|publisher|year|_N/A_|research_notes|reprint_edition|_N/A_|isbn_issn|pages_count|title_short|_N/A_|series_title|_N/A_|author_translated|title|title_translated|url|volume|
|COMP|@type|series_editor|_N/A_|_N/A_|abstract|author_addr|accession_no|programmer|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|_N/A_|db_name|doi|db_provider|version|_N/A_|title_alt|keywords|file_attm|figure|language|label|computer|_N/A_|type|notes|_N/A_|content|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|isbn|description|title_short|_N/A_|series_title|_N/A_|author_translated|title|title_translated|url|edition|
|CONF|@type|editor|series_editor|sponsor|abstract|author_addr|accession_no|author|place_published|year_published|proceedings_title|_N/A_|packaging_method|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|conf_loc|date|db_name|doi|db_provider|edition|_N/A_|_N/A_|keywords|file_attm|figure|language|label|issue|_N/A_|_N/A_|notes|volumes_count|_N/A_|publisher|conf_year|_N/A_|research_notes|_N/A_|_N/A_|isbn|pages|title_short|_N/A_|conf_name|series_title|author_translated|title|title_translated|url|volume|
|CPAPER|@type|editor|_N/A_|_N/A_|abstract|author_addr|accession_no|author|place_published|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|_N/A_|_N/A_|conf_loc|date|db_name|doi|db_provider|_N/A_|_N/A_|_N/A_|keywords|file_attm|figure|language|label|_N/A_|_N/A_|type|notes|_N/A_|_N/A_|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|pages|_N/A_|_N/A_|conf_name|_N/A_|author_translated|title|title_translated|url|volume|
|CTLG|@type|institution|_N/A_|translator|abstract|author_addr|accession_no|author|_N/A_|_N/A_|_N/A_|_N/A_|packaging_method|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|abbreviation|keywords|file_attm|figure|language|label|series_volume|_N/A_|type|notes|catalog_no|original_publ|publisher|year|_N/A_|research_notes|reprint_edition|pages_count|isbn|pages|title_short|_N/A_|series_title|_N/A_|author_translated|title|title_translated|url|volume|
|DATA|@type|producer|_N/A_|funding_agency|abstract|author_addr|accession_no|investigators|time_period|unit_of_observation|type|dataset|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date_of_collection|db_name|doi|db_provider|version|_N/A_|abbreviation|keywords|file_attm|figure|language|label|_N/A_|_N/A_|_N/A_|notes|study_no|version_history|distributor|year|geographic_coverage|research_notes|_N/A_|date_original_release|issn|_N/A_|title_short|_N/A_|_N/A_|series_title|author_translated|title|title_translated|url|_N/A_|
|DBASE|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|author|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|_N/A_|_N/A_|place_published|date_accessed|db_name|doi|db_provider|date_published|_N/A_|_N/A_|keywords|file_attm|figure|language|label|_N/A_|_N/A_|type|notes|_N/A_|_N/A_|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|report_no|pages|_N/A_|_N/A_|periodical|_N/A_|author_translated|title|title_translated|url|volume|
|DICT|@type|editor|_N/A_|translator|abstract|author_addr|accession_no|author|term|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|_N/A_|db_name|doi|db_provider|edition|_N/A_|abbreviation|keywords|file_attm|figure|language|label|number|_N/A_|type|notes|volumes_count|original_publ|publisher|year|reviewed_item|research_notes|reprint_edition|version|isbn|pages|title_short|_N/A_|dictionary_title|_N/A_|author_translated|title|title_translated|url|volume|
|EBOOK|@type|editor|series_editor|_N/A_|abstract|author_addr|accession_no|author|year_cited|date_cited|title_prefix|reviewer|last_updated|nihmsid|pmcid|_N/A_|caption|call_no|_N/A_|place_published|date_accessed|db_name|doi|db_provider|edition|_N/A_|_N/A_|keywords|file_attm|figure|language|label|_N/A_|_N/A_|type|notes|version|original_publ|publisher|year|reviewed_item|research_notes|reprint_edition|_N/A_|isbn|pages_count|_N/A_|_N/A_|title_secondary|series_title|author_translated|title|title_translated|url|volume|
|ECHAP|@type|editor|_N/A_|_N/A_|abstract|author_addr|accession_no|author|section|_N/A_|title_prefix|reviewer|packaging_method|nihmsid|pmcid|_N/A_|caption|call_no|_N/A_|place_published|date_accessed|db_name|doi|db_provider|edition|_N/A_|_N/A_|keywords|file_attm|figure|language|label|chapter|_N/A_|type|notes|volumes_count|original_publ|publisher|year|reviewed_item|research_notes|reprint_edition|_N/A_|isbn|pages|title_short|_N/A_|title_book|series_title|author_translated|title|title_translated|url|volume|
|EDBOOK|@type|series_editor|_N/A_|translator|abstract|editor_addr|accession_no|editor|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|series_volume|_N/A_|type|notes|volumes_count|original_publ|publisher|year|_N/A_|research_notes|reprint_edition|_N/A_|isbn|pages_count|title_short|_N/A_|title_secondary|_N/A_|author_translated|title|title_translated|url|volume|
|EJOUR|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|author|year_cited|date_cited|pmcid|reviewer|issue_title|nihmsid|article_no|_N/A_|caption|_N/A_|_N/A_|place_published|date_accessed|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|issue|_N/A_|type|notes|document_no|_N/A_|publisher|year|reviewed_item|research_notes|reprint_edition|epub_date|issn|pages|title_short|_N/A_|periodical|website_title|author_translated|title|title_translated|url|volume|
|ELEC|@type|series_editor|_N/A_|_N/A_|abstract|author_addr|accession_no|author|year_cited|date_cited|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|last_updated|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|date_accessed|_N/A_|type|notes|_N/A_|content|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|isbn|description|title_short|_N/A_|series_title|_N/A_|author_translated|title|title_translated|url|access_year|
|ENCYC|@type|editor|_N/A_|translator|abstract|author_addr|accession_no|author|term|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|abbreviation|keywords|file_attm|figure|language|label|_N/A_|_N/A_|_N/A_|notes|volumes_count|original_publ|publisher|year|reviewed_item|research_notes|reprint_edition|_N/A_|isbn|pages|title_short|_N/A_|title_ency|_N/A_|author_translated|title|title_translated|url|volume|
|EQUA|@type|file_name|_N/A_|_N/A_|abstract|author_addr|accession_no|created_by|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|version|_N/A_|_N/A_|keywords|file_attm|figure|language|label|number|_N/A_|type|notes|_N/A_|_N/A_|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|description|_N/A_|_N/A_|image_source_program|_N/A_|author_translated|title|title_translated|url|image_size|
|FIGURE|@type|file_name|_N/A_|_N/A_|abstract|author_addr|accession_no|created_by|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|call_no|caption|city|date|db_name|doi|db_provider|version|_N/A_|_N/A_|keywords|file_attm|figure|language|label|number|_N/A_|type|notes|_N/A_|_N/A_|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|description|_N/A_|_N/A_|image_source_program|_N/A_|author_translated|title|title_translated|url|image_size|
|GEN|@type|author_secondary|author_tertiary|author_subsidiary|abstract|author_addr|accession_no|author|custom1|custom2|custom3|custom4|custom5|custom6|custom7|custom8|caption|call_no|_N/A_|place_published|date|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|number|_N/A_|type|notes|volumes_count|original_publ|publisher|year|reviewed_item|research_notes|reprint_edition|section|isbn_issn|pages|title_short|_N/A_|title_secondary|title_tertiary|author_translated|title|title_translated|url|Volume|
|GOVDOC|@type|dept|_N/A_|_N/A_|abstract|author_addr|accession_no|author|government_body|congr_no|congr_sess|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|_N/A_|_N/A_|city|_N/A_|db_name|doi|db_provider|edition|_N/A_|_N/A_|keywords|file_attm|figure|language|label|issue|_N/A_|_N/A_|notes|_N/A_|_N/A_|publisher|year|_N/A_|research_notes|_N/A_|section|report_no|pages|_N/A_|_N/A_|_N/A_|series_title|author_translated|title|title_translated|url|volume|
|GRANT|@type|_N/A_|_N/A_|translator|abstract|author_addr|accession_no|investigators|contact_name|contact_addr|contact_phone|contact_fax|funding_number|no_cfda|_N/A_|_N/A_|caption|call_no|_N/A_|activity_loc|deadline|db_name|doi|db_provider|requirement|_N/A_|abbreviation|keywords|file_attm|figure|language|label|status|_N/A_|type|notes|amount_received|grant_orig_no|sponsor|year|reviewed_item|research_notes|review_date|grant_duration|_N/A_|pages|title_short|_N/A_|_N/A_|_N/A_|author_translated|title|title_translated|url|amount_requested|
|HEAR|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|_N/A_|_N/A_|congr_no|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|session|_N/A_|_N/A_|keywords|file_attm|url|language|label|document_no|_N/A_|_N/A_|notes|volumes_count|history|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|isbn|pages|title_short|_N/A_|committee|legislative_body|author_translated|title|title_translated|url|_N/A_|
|ICOMM|@type|recipient|_N/A_|_N/A_|abstract|author_addr|accession_no|author|email_sender|email_recipient|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|description|_N/A_|abbreviation|keywords|file_attm|figure|language|label|folio_no|_N/A_|type|notes|comm_no|_N/A_|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|pages|title_short|_N/A_|_N/A_|_N/A_|author_translated|title|title_translated|url|_N/A_|
|INPR|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|author|legal_note|pmcid|_N/A_|_N/A_|_N/A_|nihmsid|article_no|_N/A_|caption|call_no|_N/A_|_N/A_|date|db_name|doi|db_provider|epub_date|issue|journal_alt|keywords|file_attm|figure|language|label|_N/A_|page_start|type|notes|_N/A_|original_publ|_N/A_|year|reviewed_item|research_notes|reprint_edition|_N/A_|issn|pages|title_short|_N/A_|journal|_N/A_|author_translated|title|title_translated|url|volume|
|JFULL|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|author|legal_note|pmcid|_N/A_|_N/A_|_N/A_|nihmsid|article_no|_N/A_|caption|call_no|_N/A_|_N/A_|date|db_name|doi|db_provider|epub_date|issue|journal_alt|keywords|file_attm|figure|language|label|_N/A_|page_start|type|notes|_N/A_|original_publ|_N/A_|year|reviewed_item|research_notes|reprint_edition|_N/A_|issn|pages|title_short|_N/A_|journal|_N/A_|author_translated|title|title_translated|url|volume|
|JOUR|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|author|legal_note|pmcid|_N/A_|_N/A_|_N/A_|nihmsid|article_no|_N/A_|caption|call_no|_N/A_|_N/A_|date|db_name|doi|db_provider|epub_date|issue|journal_alt|keywords|file_attm|figure|language|label|_N/A_|page_start|type|notes|_N/A_|original_publ|_N/A_|year|reviewed_item|research_notes|reprint_edition|_N/A_|issn|pages|title_short|_N/A_|journal|_N/A_|author_translated|title|title_translated|url|volume|
|LEGAL|@type|issuing_org|_N/A_|_N/A_|abstract|author_addr|accession_no|author|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|place_published|date_code_ed|db_name|doi|db_provider|edition|_N/A_|abbreviation|keywords|file_attm|figure|language|label|page_start|_N/A_|type|notes|session_no|history|publisher|year|_N/A_|research_notes|_N/A_|section_no|document_no|pages|_N/A_|_N/A_|title_no|supplement_no|author_translated|title|title_translated|url|rule_no|
|MANSCPT|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|author|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|descr_material|_N/A_|abbreviation|keywords|file_attm|figure|language|label|folio_no|_N/A_|type|notes|manuscript_no|_N/A_|library_or_archive|year|_N/A_|research_notes|reprint_edition|page_start|_N/A_|pages|title_short|_N/A_|coll_title|_N/A_|author_translated|title|title_translated|url|volume_or_container|
|MAP|@type|series_editor|_N/A_|_N/A_|abstract|author_addr|accession_no|cartographer|scale|area|size|_N/A_|packaging_method|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|_N/A_|_N/A_|type|notes|_N/A_|_N/A_|publisher|year|_N/A_|research_notes|reprint_edition|_N/A_|isbn|description|title_short|_N/A_|series_title|_N/A_|author_translated|title|title_translated|url|_N/A_|
|MGZN|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|author|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|place_published|date|db_name|doi|db_provider|edition|_N/A_|mag_alt|keywords|file_attm|figure|language|label|issue_no|_N/A_|type|notes|frequency|original_publ|publisher|year|reviewed_item|research_notes|reprint_edition|page_start|issn|pages|title_short|_N/A_|magazine|_N/A_|author_translated|title|title_translated|url|volume|
|MPCT|@type|series_director|producer|performers|synopsis|author_addr|accession_no|director|cast|credits|_N/A_|genre|format|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|country|date_released|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|_N/A_|_N/A_|medium|notes|_N/A_|_N/A_|distributor|year_released|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|running_time|title_short|_N/A_|series_title|_N/A_|author_translated|title|title_translated|url|_N/A_|
|MULTI|@type|series_editor|_N/A_|_N/A_|abstract|author_addr|accession_no|created_by|year_cited|date_cited|_N/A_|_N/A_|format_length|_N/A_|_N/A_|_N/A_|caption|_N/A_|_N/A_|_N/A_|date_accessed|db_name|doi|db_provider|_N/A_|_N/A_|_N/A_|keywords|file_attm|figure|language|label|screens_count|_N/A_|type|notes|_N/A_|_N/A_|distributor|year|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|series_title|_N/A_|author_translated|title|title_translated|url|_N/A_|
|MUSIC|@type|editor|series_editor|producer|abstract|author_addr|accession_no|composer|format_of_music|form_of_composition|music_parts|target_audience|accompanying_matter|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|place_published|date|db_name|doi|db_provider|edition|_N/A_|_N/A_|keywords|file_attm|figure|language|label|_N/A_|_N/A_|form_of_item|notes|volumes_count|original_publ|publisher|year|_N/A_|research_notes|reprint_edition|section|issn|pages|title_short|_N/A_|title_album|series_title|author_translated|title|title_translated|url|volume|
|NEWS|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|reporter|column|issue|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|_N/A_|db_name|doi|db_provider|edition|_N/A_|_N/A_|keywords|figure|file_attm|language|_N/A_|page_start|_N/A_|type|notes|frequency|_N/A_|publisher|year|reviewed_item|research_notes|reprint_edition|section|issn|pages|title_short|_N/A_|newspaper|_N/A_|author_translated|title|title_translated|url|volume|
|PAMP|@type|institution|_N/A_|translator|abstract|author_addr|accession_no|author|_N/A_|_N/A_|_N/A_|_N/A_|packaging_method|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|abbreviation|keywords|file_attm|figure|language|label|series_volume|pages_count|type|notes|_N/A_|original_publ|publisher|year|_N/A_|research_notes|reprint_edition|_N/A_|isbn|pages|title_short|_N/A_|published_source|_N/A_|author_translated|title|title_translated|url|number|
|PAT|@type|issuing_org|author_international|_N/A_|abstract|inventor_addr|accession_no|inventor|_N/A_|issue_date|designated_states|attorney_agent|references|legal_status|_N/A_|_N/A_|caption|call_no|_N/A_|country|date|db_name|doi|db_provider|international_patent_classification|_N/A_|_N/A_|keywords|file_attm|figure|language|label|applic_no|_N/A_|type|notes|us_patent_classification|priority_numbers|assignee|year|_N/A_|research_notes|notes|international_patent_no|patent_no|pages|title_short|_N/A_|published_source|title_intl|author_translated|title|title_translated|url|patent_version_no|
|PCOMM|@type|recipient|_N/A_|_N/A_|abstract|author_addr|accession_no|author|email_sender|email_recipient|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|description|_N/A_|abbreviation|keywords|file_attm|figure|language|label|folio_no|_N/A_|type|notes|comm_no|_N/A_|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|pages|title_short|_N/A_|_N/A_|_N/A_|author_translated|title|title_translated|url|_N/A_|
|RPRT|@type|series_editor|publisher|dept_div|abstract|author_addr|accession_no|author|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|issue|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|document_no|_N/A_|type|notes|series_volume|content|institution|year|_N/A_|research_notes|notes|_N/A_|report_no|pages|title_short|_N/A_|series_title|_N/A_|author_translated|title|title_translated|url|volume|
|SER|@type|editor|series_editor|volume_editor|abstract|author_addr|accession_no|author|section|report_no|_N/A_|_N/A_|packaging_method|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|abbreviation|keywords|file_attm|figure|language|label|series_volume|_N/A_|type|notes|volumes_count|original_publ|publisher|year|reviewed_item|research_notes|reprint_edition|chapter|isbn|pages|title_short|_N/A_|title_secondary|series_title|author_translated|title|title_translated|url|Volume|
|SLIDE|@type|performers|series_editor|_N/A_|abstract|author_addr|accession_no|author|cast|credits|size_or_length|_N/A_|format|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|number|_N/A_|type|notes|extent_of_work|content|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|isbn|_N/A_|title_short|_N/A_|_N/A_|series_title|author_translated|title|title_translated|url|volume|
|SOUND|@type|performers|series_editor|_N/A_|abstract|author_addr|accession_no|author|cast|credits|size_or_length|_N/A_|format|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|number|_N/A_|type|notes|extent_of_work|content|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|isbn|_N/A_|title_short|_N/A_|_N/A_|series_title|author_translated|title|title_translated|url|volume|
|STAND|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|institution|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|place_published|date|db_name|doi|db_provider|_N/A_|_N/A_|abbreviation|keywords|file_attm|figure|language|label|page_start|_N/A_|type|notes|session_no|_N/A_|publisher|year|_N/A_|research_notes|_N/A_|section_no|document_no|pages|_N/A_|_N/A_|section_title|paper_no|author_translated|title|title_translated|url|rule_no|
|STAT|@type|_N/A_|_N/A_|_N/A_|abstract|author_addr|accession_no|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|publisher|volume|_N/A_|_N/A_|caption|call_no|_N/A_|country|date_enacted|db_name|doi|db_provider|session|_N/A_|abbreviation|keywords|file_attm|figure|language|label|public_law_no|_N/A_|_N/A_|notes|statute_no|history|source|year|article_no|research_notes|_N/A_|section|_N/A_|pages|title_short|_N/A_|code|international_source|author_translated|act_name|title_translated|url|code_no|
|THES|@type|_N/A_|advisor|_N/A_|abstract|author_addr|accession_no|author|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|_N/A_|_N/A_|_N/A_|keywords|file_attm|figure|language|label|document_no|_N/A_|type|notes|_N/A_|_N/A_|university|year|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|pages_count|title_short|_N/A_|acad_dept|_N/A_|author_translated|title|title_translated|url|degree|
|UNBILL|@type|sponsor|_N/A_|_N/A_|abstract|author_addr|accession_no|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|_N/A_|date|db_name|doi|db_provider|session|_N/A_|_N/A_|keywords|file_attm|figure|language|label|bill_no|_N/A_|_N/A_|notes|_N/A_|history|_N/A_|year|_N/A_|research_notes|_N/A_|code_section|_N/A_|code_pages|title_short|_N/A_|code|legislative_body|author_translated|title|title_translated|url|code_volume|
|UNPB|@type|series_editor|_N/A_|_N/A_|abstract|author_addr|_N/A_|author|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|_N/A_|caption|_N/A_|_N/A_|city|date|db_name|doi|db_provider|_N/A_|_N/A_|abbreviation|keywords|file_attm|figure|language|label|number|_N/A_|type|notes|_N/A_|_N/A_|institution|year|_N/A_|research_notes|_N/A_|_N/A_|_N/A_|pages|title_short|_N/A_|series_title|dept|author_translated|title|title_translated|url|_N/A_|
|VIDEO|@type|performers|series_editor|_N/A_|abstract|author_addr|accession_no|author|cast|credits|size_or_length|_N/A_|format|_N/A_|_N/A_|_N/A_|caption|call_no|_N/A_|city|date|db_name|doi|db_provider|edition|_N/A_|title_alt|keywords|file_attm|figure|language|label|number|_N/A_|type|notes|extent_of_work|content|publisher|year|_N/A_|research_notes|_N/A_|_N/A_|isbn|_N/A_|title_short|_N/A_|_N/A_|series_title|author_translated|title|title_translated|url|volume|

## Reference Types

Source: https://en.wikipedia.org/wiki/RIS_(file_format)

| TY | Description |
|:---|:------------|
|ABST|Abstract|
|ADVS|Audiovisual material|
|AGGR|Aggregated Database|
|ANCIENT|Ancient Text|
|ART|Art Work|
|BILL|Bill|
|BLOG|Blog|
|BOOK|Whole book|
|CASE|Case|
|CHAP|Book chapter|
|CHART|Chart|
|CLSWK|Classical Work|
|COMP|Computer program|
|CONF|Conference proceeding|
|CPAPER|Conference paper|
|CTLG|Catalog|
|DATA|Data file|
|DBASE|Online Database|
|DICT|Dictionary|
|EBOOK|Electronic Book|
|ECHAP|Electronic Book Section|
|EDBOOK|Edited Book|
|EJOUR|Electronic Article|
|ELEC|Web Page|
|ENCYC|Encyclopedia|
|EQUA|Equation|
|FIGURE|Figure|
|GEN|Generic|
|GOVDOC|Government Document|
|GRANT|Grant|
|HEAR|Hearing|
|ICOMM|Internet Communication|
|INPR|In Press|
|JFULL|Journal (full)|
|JOUR|Journal|
|LEGAL|Legal Rule or Regulation|
|MANSCPT|Manuscript|
|MAP|Map|
|MGZN|Magazine article|
|MPCT|Motion picture|
|MULTI|Online Multimedia|
|MUSIC|Music score|
|NEWS|Newspaper|
|PAMP|Pamphlet|
|PAT|Patent|
|PCOMM|Personal communication|
|RPRT|Report|
|SER|Serial publication|
|SLIDE|Slide|
|SOUND|Sound recording|
|STAND|Standard|
|STAT|Statute|
|THES|Thesis/Dissertation|
|UNBILL|Unenacted Bill|
|UNPB|Unpublished work|
|VIDEO|Video recording|

## Development

The following command will:

1.  Compile the grammar.
2.  Test the grammar against the `sample.ris` file.
3.  Output the result to the standard output.
4.  Write the output to `out.txt`. (This file is ignored by Git.)

```
make sample
```
