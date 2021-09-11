Feature: RIS Parser

Rule: References may or may not be grouped together

  Example: References are grouped together
    When I parse this content
      """
      TY  - JOUR
      TI  - ref1
      ER  - 
      TY  - JOUR
      TI  - ref2
      ER  - 
      """
    Then I get this result
      """
      [ {"TY": ["JOUR"], "TI": ["ref1"]}
      , {"TY": ["JOUR"], "TI": ["ref2"]}]
      """

  Example: References are not grouped together
    When I parse this content
      """
      TY  - JOUR
      TI  - ref3
      ER  - 

      TY  - JOUR
      TI  - ref4
      ER  - 
      """
    Then I get this result
      """
      [ {"TY": ["JOUR"], "TI": ["ref3"]}
      , {"TY": ["JOUR"], "TI": ["ref4"]}]
      """

Rule: The "End of reference" tag doesn't need to be correctly formatted

  # `ER  - ` (trailing space)
  Example: End of reference tag correctly formatted
    When I parse this content
      """
      TY  - JOUR
      TI  - ref1
      ER  - 
      TY  - JOUR
      TI  - ref2
      ER  - 
      """
    Then I get this result
      """
      [ {"TY": ["JOUR"], "TI": ["ref1"]}
      , {"TY": ["JOUR"], "TI": ["ref2"]}]
      """

  # `ER  -` (no trailing space)
  Example: End of reference tag not correctly formatted
    When I parse this content
      """
      TY  - JOUR
      TI  - ref4
      ER  -
      TY  - JOUR
      TI  - ref5
      ER  -
      """
    Then I get this result
      """
      [ {"TY": ["JOUR"], "TI": ["ref4"]}
      , {"TY": ["JOUR"], "TI": ["ref5"]}]
      """

Rule: Accept any tags as long as they are correctly formatted

  Example: Accept known tags
    When I parse this content
      """
      TY  - JOUR
      TI  - ref1
      KW  - key1
      ER  - 
      """
    Then I get this result
      """
      [{"TY": ["JOUR"], "TI": ["ref1"], "KW": ["key1"]}]
      """

  Example: Accept unknown tags
    When I parse this content
      """
      TY  - WHATEVER
      XX  - whatever1
      ZZ  - whatever2
      ER  - 
      """
    Then I get this result
      """
      [{"TY": ["WHATEVER"], "XX": ["whatever1"], "ZZ": ["whatever2"]}]
      """

Rule: Extra processing rules for some tags

  Example: UR — support URL delimited by ;
    When I parse this content
      """
      TY  - JOUR
      UR  - url1
      ER  - 
      TY  - JOUR
      UR  - url2; url3
      ER  - 
      TY  - JOUR
      UR  - url4;
      url5;
      url6;
      ER  - 
      """
    Then I get this result
      """
      [ {"TY": ["JOUR"], "UR": ["url1"]}
      , {"TY": ["JOUR"], "UR": ["url2", "url3"]}
      , {"TY": ["JOUR"], "UR": ["url4", "url5", "url6"]}]
      """

  Scenario Outline: DA
    When I parse this content
      """
      TY  - JOUR
      DA  - <date>
      ER  - 
      """
    Then I get this result
      """
      [{"TY": ["JOUR"], "DA": [<value>]}]
      """

    Examples:
      | date          | value                                                        |
      | 2020/06/25/   | {"year": "2020", "month": "06", "day": "25", "info": ""}     |
      | ///           | {"year": ""    , "month": ""  , "day": ""  , "info": ""}     |
      | /06//         | {"year": ""    , "month": "06", "day": ""  , "info": ""}     |
      | 2020//25/Conf | {"year": "2020", "month": ""  , "day": "25", "info": "Conf"} |

  Example: DA — unexpected format
    When I parse this content
      """
      TY  - JOUR
      DA  - foo
      ER  - 
      """
    Then I get this result
      """
      [{"TY": ["JOUR"], "DA": ["foo"]}]
      """

  Scenario Outline: RP
    When I parse this content
      """
      TY  - JOUR
      RP  - <rp>
      ER  - 
      """
    Then I get this result
      """
      [{"TY": ["JOUR"], "RP": [<value>]}]
      """

    Examples:
      | rp                       | value                                                                  |
      | IN FILE                  | {"status":"IN FILE"}                                                   |
      | NOT IN FILE              | {"status":"NOT IN FILE"}                                               |
      | ON REQUEST (06/26/2020)  | {"status":"ON REQUEST","date":{"year":"2020","month":"06","day":"26"}} |
      | foobar                   | "foobar"                                                               |
