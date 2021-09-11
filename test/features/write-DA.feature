Feature: Writing DA entries

Scenario: DA as strings
  When I convert this content
    """
    [{"TY": ["JOUR"], "DA": ["1969"]}]
    """
  Then I get this result
    """
    TY  - JOUR
    DA  - 1969
    ER  - 

    """

Scenario: DA as objects
  When I convert this content
    """
    [ {"TY": ["JOUR"], "DA": [{"year": "1969", "month": "07", "day": "20", "info": "Moon"}]}
    , {"TY": ["JOUR"], "DA": [{"year": "1969", "month": "07",              "info": "Moon"}]}
    , {"TY": ["JOUR"], "DA": [{"year": "1969",                             "info": "Moon"}]}
    , {"TY": ["JOUR"], "DA": [{"year": "1969"                                            }]}]
    """
  Then I get this result
    """
    TY  - JOUR
    DA  - 1969/07/20/Moon
    ER  - 

    TY  - JOUR
    DA  - 1969/07//Moon
    ER  - 

    TY  - JOUR
    DA  - 1969///Moon
    ER  - 

    TY  - JOUR
    DA  - 1969///
    ER  - 

    """

Scenario: Invalid DA inputs
  When I convert this content
    """
    [ {"TY": ["JOUR"], "DA": []}
    , {"TY": ["JOUR"], "DA": [42]}
    , {"TY": ["JOUR"], "DA": [""]}
    , {"TY": ["JOUR"], "DA": ["foo", "bar"]}]
    """
  Then I get this result
    """
    """