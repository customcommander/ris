Feature: RIS Parser

Scenario: Returns a list of references
  Given I have this RIS file
    """
    TY  - JOUR
    ER  - 

    TY  - BOOK
    ER  - 

    TY  - CHAP
    ER  - 
    """
  When I parse the file
  Then I will get a list of references

Scenario: URLs
  Given I have this RIS file
    """
    TY  - JOUR
    KW  - foo
    UR  - url1
    UR  - url2; url3
    KW  - bar
    UR  - url4;
    url5;
    url6;
    ER  - 
    """
  When I parse the file
  Then I will find a reference where 'url' is set to
    """
    [ "url1"
    , "url2"
    , "url3"
    , "url4"
    , "url5"
    , "url6"
    ]
    """

Scenario Outline: DA - Date
  Given I have this RIS file
  """
  TY  - JOUR
  DA  - <date>
  ER  - 
  """
  When I parse the file
  Then I will find a reference where '<field>' is set to '<value>'

  Examples:
    | date          | field | value                                                        |
    | 2020/06/25/   | date  | {"year": "2020", "month": "06", "day": "25", "info": ""}     |
    | ///           | date  | {"year": ""    , "month": ""  , "day": ""  , "info": ""}     |
    | /06//         | date  | {"year": ""    , "month": "06", "day": ""  , "info": ""}     |
    | 2020//25/Conf | date  | {"year": "2020", "month": ""  , "day": "25", "info": "Conf"} |

Scenario Outline: Authors
  Given I have this RIS file
    """
    TY  - JOUR
    AU  - Doe, John
    A2  - Doe, John
    A3  - Doe, John
    A4  - Doe, John
    <tag>  - <content>
    ER  - 
    """
  When I parse the file
  Then I will find a reference where '<field>' is set to '<value>'

  Examples:
    | tag | content               | field      | value                                                                                                                 |
    | AU  | Phillips, A.J         | author     | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J","suffix":""}]         |
    | AU  | Phillips, Albert John | author     | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"Albert John","suffix":""}] |
    | AU  | Phillips,A.J.,Sr.     | author     | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J.","suffix":"Sr."}]     |
    | A2  | Phillips, A.J         | author_sec | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J","suffix":""}]         |
    | A2  | Phillips, Albert John | author_sec | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"Albert John","suffix":""}] |
    | A2  | Phillips,A.J.,Sr.     | author_sec | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J.","suffix":"Sr."}]     |
    | A3  | Phillips, A.J         | author_ter | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J","suffix":""}]         |
    | A3  | Phillips, Albert John | author_ter | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"Albert John","suffix":""}] |
    | A3  | Phillips,A.J.,Sr.     | author_ter | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J.","suffix":"Sr."}]     |
    | A4  | Phillips, A.J         | author_sub | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J","suffix":""}]         |
    | A4  | Phillips, Albert John | author_sub | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"Albert John","suffix":""}] |
    | A4  | Phillips,A.J.,Sr.     | author_sub | [{"last_name":"Doe","first_name":"John","suffix":""},{"last_name":"Phillips","first_name":"A.J.","suffix":"Sr."}]     |

Scenario Outline: Other tags
  Given I have this RIS file
    """
    TY  - JOUR
    <tag>  - <content>
    ER  - 
    """
  When I parse the file
  Then I will find a reference where '<field>' is set to '<value>'

  Examples:
    | tag | content                  | field          | value                                        |
    | AB  | foobar                   | abstract       | foobar                                       |
    | AD  | fulham road              | author_address | fulham road                                  |
    | AN  | 12ABC                    | acc_number     | 12ABC                                        |
    | AV  | 99ABC                    | arch_loc       | 99ABC                                        |
    | BT  | BT VALUE                 | BT             | BT VALUE                                     |
    | C1  | aa                       | custom         | ["aa",""  ,""  ,""  ,""  ,""  ,""  ,""  ]    |
    | C2  | bb                       | custom         | [""  ,"bb",""  ,""  ,""  ,""  ,""  ,""  ]    |
    | C3  | cc                       | custom         | [""  ,""  ,"cc",""  ,""  ,""  ,""  ,""  ]    |
    | C4  | dd                       | custom         | [""  ,""  ,""  ,"dd",""  ,""  ,""  ,""  ]    |
    | C5  | ee                       | custom         | [""  ,""  ,""  ,""  ,"ee",""  ,""  ,""  ]    |
    | C6  | ff                       | custom         | [""  ,""  ,""  ,""  ,""  ,"ff",""  ,""  ]    |
    | C7  | gg                       | custom         | [""  ,""  ,""  ,""  ,""  ,""  ,"gg",""  ]    |
    | C8  | hh                       | custom         | [""  ,""  ,""  ,""  ,""  ,""  ,""  ,"hh"]    |
    | CA  | my caption               | caption        | my caption                                   |
    | CN  | CALLNUM123               | call_number    | CALLNUM123                                   |
    | CT  | CT VALUE                 | CT             | CT VALUE                                     |
    | CY  | pubplace                 | pub_loc        | pubplace                                     |
    | DB  | mydb345                  | db_name        | mydb345                                      |
    | DP  | dbprovidedby1            | db_provider    | dbprovidedby1                                |
    | DO  | 10.1177/0003122411414817 | doi            | 10.1177/0003122411414817                     |
    | ET  | 4th Ed.                  | edition        | 4th Ed.                                      |
    | J2  | R2D2                     | title_alt      | R2D2                                         |
    | RP  | IN FILE                  | reprint        | IN FILE                                      |
    | RP  | NOT IN FILE              | reprint        | NOT IN FILE                                  |
    | RP  | ON REQUEST (06/26/2020)  | reprint        | ON REQUEST                                   |
    | RP  | ON REQUEST (06/26/2020)  | reprint_date   | {"year": "2020", "month": "06", "day": "26"} |
    | PY  | 2014                     | pub_year       | "2014"                                       |

Scenario: Default values
  Given I have this RIS file
    """
    TY  - JOUR
    ER  - 
    """
  When I parse the file
  Then I will find a reference where 'reprint' is set to 'NOT IN FILE'
