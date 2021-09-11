Feature: Parsing of names

Scenario Outline: Authors
  When I parse this content
    """
    TY  - JOUR
    <tag>  - <content>
    ER  - 
    """
  Then I get this result
    """
    [{"TY": ["JOUR"], "<tag>": [<value>]}]
    """

  Examples:
    | tag | content                         | value                                                                                    |
    | AU  | Phillips, A.J.                  | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":""   } |
    | AU  | Phillips, A.J., Sr.             | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":"Sr."} |
    | AU  | Phillips, Albert John           | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":""   } |
    | AU  | Phillips, Albert John, Sr.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":"Sr."} |
    | AU  | Phillips, Albert John A.J.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":""   } |
    | AU  | Phillips, Albert John A.J., Sr. | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":"Sr."} |
    | A1  | Phillips, A.J.                  | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":""   } |
    | A1  | Phillips, A.J., Sr.             | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":"Sr."} |
    | A1  | Phillips, Albert John           | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":""   } |
    | A1  | Phillips, Albert John, Sr.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":"Sr."} |
    | A1  | Phillips, Albert John A.J.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":""   } |
    | A1  | Phillips, Albert John A.J., Sr. | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":"Sr."} |
    | A2  | Phillips, A.J.                  | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":""   } |
    | A2  | Phillips, A.J., Sr.             | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":"Sr."} |
    | A2  | Phillips, Albert John           | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":""   } |
    | A2  | Phillips, Albert John, Sr.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":"Sr."} |
    | A2  | Phillips, Albert John A.J.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":""   } |
    | A2  | Phillips, Albert John A.J., Sr. | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":"Sr."} |
    | A3  | Phillips, A.J.                  | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":""   } |
    | A3  | Phillips, A.J., Sr.             | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":"Sr."} |
    | A3  | Phillips, Albert John           | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":""   } |
    | A3  | Phillips, Albert John, Sr.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":"Sr."} |
    | A3  | Phillips, Albert John A.J.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":""   } |
    | A3  | Phillips, Albert John A.J., Sr. | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":"Sr."} |
    | A4  | Phillips, A.J.                  | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":""   } |
    | A4  | Phillips, A.J., Sr.             | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":"Sr."} |
    | A4  | Phillips, Albert John           | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":""   } |
    | A4  | Phillips, Albert John, Sr.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":"Sr."} |
    | A4  | Phillips, Albert John A.J.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":""   } |
    | A4  | Phillips, Albert John A.J., Sr. | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":"Sr."} |
    | TA  | Phillips, A.J.                  | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":""   } |
    | TA  | Phillips, A.J., Sr.             | {"last_name":"Phillips", "first_name":""           , "initials": "A.J.", "suffix":"Sr."} |
    | TA  | Phillips, Albert John           | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":""   } |
    | TA  | Phillips, Albert John, Sr.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": ""    , "suffix":"Sr."} |
    | TA  | Phillips, Albert John A.J.      | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":""   } |
    | TA  | Phillips, Albert John A.J., Sr. | {"last_name":"Phillips", "first_name":"Albert John", "initials": "A.J.", "suffix":"Sr."} |
