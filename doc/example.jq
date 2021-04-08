def type: split(".")[0];                # e.g. "VIDEO.A2" -> "VIDEO"
def field: split(".")[1];               # e.g. "VIDEO.A2" -> "A2"

def type_record: "TY  - \(.key | type)";
def field_record:
  (.key | field) as $f
  | if $f == "A2" or $f == "A3" or $f == "A4" or $f == "AU" then
      "\($f)  - \(.key)_Doe, John"
    elif $f == "PY" then
      "\($f)  - 1666"
    elif $f == "DA" then
      "\($f)  - 1969/07/20"
    elif $f == "RP" then
      "\($f)  - IN FILE"
    else
      "\($f)  - \(.key)_\(.value)"
    end;

  to_entries
| group_by(.key | type)
| map( .[0] as $first_entry
     | map(field_record)
     | "\($first_entry | type_record)\n\(. | join("\n"))\nER  - "
     )
| join("\n\n")