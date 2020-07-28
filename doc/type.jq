# INPUT
#   {"A": "1", "B": "2"}
# OUTPUT
#   "A,1"
#   "B,2"

to_entries | map("\(.key),\(.value)") | join("\n")
