@browser
Feature: Writing RIS entries

Rule: Input is validated

  Example: Skip input if not an array
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
      , {"TY": ["   "]}]
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

  Example: User-defined ER entries are ignored
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
