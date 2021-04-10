to_entries | "TY,Description\n" + (map("\(.key),\(.value)") | join("\n"))
