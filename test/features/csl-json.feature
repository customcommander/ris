Feature: CSL-JSON Support

Rule: toCSLJSON returns null

  Example: RIS content cannot be parsed
    When I convert this content to CSL-JSON
      """
      42
      """
    Then I get this result
      """
      null
      """
