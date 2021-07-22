# 2. Implement a fault-tolerant parser

Date: 2021-09-01

## Status

Accepted

## Context

I haven't been able to find a single authoritative RIS specification.

This [Wikipedia article][RIS Format] links to different resources from different authors. Some are now missing and others available only from the Internet Archive.

Some tags (e.g. `JO`) exist in one specification but not in another or have different meanings. RIS isn't versioned either (or doesn't appear to be) so it's difficult to tell to which specification a RIS provider adheres to.

## Decision

### RIS Format

The parser will enforce the "RIS format" i.e.,

```
[A-Z][A-Z0-9]  - content
```

1. Starts with **two capital letters**. (The second character _can_ be a number.)
2. Followed by exactly **two spaces**.
3. Followed by a **single dash**.
4. Followed by a **single space**.
5. Followed by some content.

The `ER` tag ("End of Reference") is the only one allowed to skip the single space after the dash character.

### Special Rules

Some tags have special rules (e.g. `DA` or `RP`). The parser will support them but not enforce them.

### Multi Tags

Some tags (e.g `KW` or `UR`) can appear multiple times in a reference. The parser will extract all tags into arrays.

## Consequences

1.  The parser is simpler to write and maintain.
2.  The parser can deal with most RIS providers.
3.  Simpler data model for RIS agents as all tags are stored into arrays.

[RIS Format]: https://en.wikipedia.org/wiki/RIS_(file_format)