Feature: Writing names entries

Scenario: Names as objects
  When I convert this content
    """
    [ {"TY": ["JOUR"], "AU": ["John", { "last_name": "Doe"
                                      , "first_name": "John"
                                      , "initials": "J.J."
                                      , "suffix": "Sr"}]}

    , {"TY": ["JOUR"], "A1": ["John", { "last_name": "Doe"
                                      , "initials": "J.J."
                                      , "suffix": "Sr"}]}

    , {"TY": ["JOUR"], "A2": ["John", { "last_name": "Doe"
                                      , "first_name": "John"
                                      , "suffix": "Sr"}]}

    , {"TY": ["JOUR"], "A3": ["John", { "last_name": "Doe"
                                      , "first_name": "John"}]}

    , {"TY": ["JOUR"], "A4": ["John", { "last_name": "Doe"
                                      , "suffix": "Sr"}]}

    , {"TY": ["JOUR"], "TA": ["John", {"last_name": "Doe"}]}]
    """
  Then I get this result
    """
    TY  - JOUR
    AU  - John
    AU  - Doe, John J.J., Sr
    ER  - 

    TY  - JOUR
    A1  - John
    A1  - Doe, J.J., Sr
    ER  - 

    TY  - JOUR
    A2  - John
    A2  - Doe, John, Sr
    ER  - 

    TY  - JOUR
    A3  - John
    A3  - Doe, John
    ER  - 

    TY  - JOUR
    A4  - John
    A4  - Doe, Sr
    ER  - 

    TY  - JOUR
    TA  - John
    TA  - Doe
    ER  - 

    """
