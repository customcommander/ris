@browser
Feature: Reading RIS

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

Rule: Return null when content does not follow the RIS format

  Example: No ER tag
    When I parse this content
      """
      TY  - JOUR
      TI  - Some title
      """
    Then I get this result
      """
      null
      """

  Example: Incorrect RIS tags
    When I parse this content
      """
      TY  - JOUR
      11  - RIS tags cannot start with a number
      aa  - RIS tags must be uppercase
      foobar  - RIS tags must not exceed two characters
      ER  - 
      """
    Then I get this result
      """
      null
      """

  Example: Incorrect format (tag not followed by two spaces)
    When I parse this content
      """
      TY - JOUR
      TI - Some title
      ER - 
      """

  Example: Incorrect format (no space after separator)
    When I parse this content
      """
      TY  -JOUR
      TI  -Some title
      ER  -
      """
