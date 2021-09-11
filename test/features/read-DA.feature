Feature: DA — Date of Access

Scenario Outline: Content is formatted correctly
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

Scenario: Content is not formatted correctly
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
