  sort_by(.TY) as $r

| map( to_entries[]
     | .key
     | select(. != "TY"))
| unique

| map( . as $f
     | $r
     | ["\"\($f)\""] + map("\"\(.[$f] // "N/A")\"")
     | join(","))

| ["\"Field\"," + ($r | map("\"\(.TY)\"") | join(","))] + .

| join("\n")
