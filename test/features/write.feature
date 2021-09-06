Feature: Can generate RIS content

@browser
Rule: Input is validated

  Example: Return null when input is not an array
    When I convert this content
      """
      42
      """
    Then I get this result
      """
      """

  Example: Skip elements that are not object
    When I convert this content
      """
      [ 42
      , 42
      , 42]
      """
    Then I get this result
      """
      """

  Example: Skip elements with missing or invalid TY
    When I convert this content
      """
      [ {}
      , {"TY": "not an array"}
      , {"TY": []}
      , {"TY": ["foo", "bar"]}
      , {"TY": ["   ", "   "]}]
      """
    Then I get this result
      """
      """

  Example: Skip elements with invalid property names
    When I convert this content
      """
      [ {"TY": ["JOUR"], "foobar": ["foobar"]}
      , {"TY": ["JOUR"], "aa": ["foobar"]}
      , {"TY": ["JOUR"], "1A": ["foobar"]}]
      """
    Then I get this result
      """
      """

  Example: Skip elements with invalid property values
    When I convert this content
      """
      [ {"TY": ["JOUR"], "Z1": 42}
      , {"TY": ["JOUR"], "Z2": []}
      , {"TY": ["JOUR"], "Z3": ["    "]}]
      """
    Then I get this result
      """
      """

Rule: Output is formatted

  Example: TY is first, ER is last
    When I convert this content
      """
      [{"TY": ["JOUR"], "TI": ["some title"]}]
      """
    Then I get this result
      """
      TY  - JOUR
      TI  - some title
      ER  - 

      """

  Example: User-define ER entries are ignored
    When I convert this content
      """
      [{"TY": ["JOUR"], "ER": ["foo"]}]
      """
    Then I get this result
      """
      TY  - JOUR
      ER  - 

      """

  Example: TI is second when available
    When I convert this content
      """
      [ {"TY": ["JOUR"], "TI": ["some title"], "AB": ["some abstract"]}
      , {"TY": ["BOOK"], "AB": ["some other abstract"]}]
      """
    Then I get this result
      """
      TY  - JOUR
      TI  - some title
      AB  - some abstract
      ER  - 

      TY  - BOOK
      AB  - some other abstract
      ER  - 

      """

  Example: Other entries within a reference are sorted by property names
    When I convert this content
      """
      [{"TY": ["JOUR"], "ZZ": ["Zombies"], "T2": ["Terminator 2"], "LS": ["Luke Skywalker"]}]
      """
    Then I get this result
      """
      TY  - JOUR
      LS  - Luke Skywalker
      T2  - Terminator 2
      ZZ  - Zombies
      ER  - 

      """

  Example: Multi-values properties generate multiple RIS entries
    When I convert this content
      """
      [{"TY": ["JOUR"], "Z1": ["AAA", "BBB", "CCC"], "Z2": ["DDD", "EEE", "FFF"]}]
      """
    Then I get this result
      """
      TY  - JOUR
      Z1  - AAA
      Z1  - BBB
      Z1  - CCC
      Z2  - DDD
      Z2  - EEE
      Z2  - FFF
      ER  - 

      """

  Example: AU, A1, A2, A3, A4 & TA
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

  Example: DA
    When I convert this content
      """
      [ {"TY": ["JOUR"], "DA": ["1969"]}
      , {"TY": ["JOUR"], "DA": [{"year": "1969", "month": "07", "day": "20", "info": "Moon"}]}
      , {"TY": ["JOUR"], "DA": [{"year": "1969", "month": "07",              "info": "Moon"}]}
      , {"TY": ["JOUR"], "DA": [{"year": "1969",                             "info": "Moon"}]}
      , {"TY": ["JOUR"], "DA": [{"year": "1969"                                            }]}]
      """
    Then I get this result
      """
      TY  - JOUR
      DA  - 1969
      ER  - 
      
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

  Example: RP
    When I convert this content
      """
      [ {"TY": ["JOUR"], "RP": ["IN FILE"]}
      , {"TY": ["JOUR"], "RP": [{"status": "IN FILE"}]}
      , {"TY": ["JOUR"], "RP": [{"status": "NOT IN FILE"}]}
      , {"TY": ["JOUR"], "RP": [{"status": "ON REQUEST", "year": "1969", "month": "07", "day": "20"}]}]
      """
    Then I get this result
      """
      TY  - JOUR
      RP  - IN FILE
      ER  - 
      
      TY  - JOUR
      RP  - IN FILE
      ER  - 

      TY  - JOUR
      RP  - NOT IN FILE
      ER  - 

      TY  - JOUR
      RP  - ON REQUEST (07/20/1969)
      ER  - 

      """