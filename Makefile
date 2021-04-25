src_files=$(shell find src -type f)
dist_files=$(patsubst src/%,dist/%,$(src_files)) dist/browser.min.js

test: /tmp/ris.test

sample: src/grammar.js resources/dev.ris
	cat resources/dev.ris | yarn -s nearley-test -q src/grammar.js | tee out.txt

parse: src/grammar.js
	node -p -e 'const fs = require("fs"); const parse = require("./index.js"); console.log(parse(fs.readFileSync("./resources/dev.ris","utf-8")));'

src/grammar.js: src/grammar.ne src/lexer.js
	yarn -s nearleyc $< > $@

resources/all.ris: resources/all.jq resources/all.json
	jq -M -S -r -f $^ > $@

resources/fields-map.csv: resources/fields-map.jq src/fields-map.json
	jq -M -S -r -f $^ > $@

resources/fields.csv: resources/fields.jq resources/fields.json
	jq -M -r -f $^ > $@

resources/full.ris: resources/full.jq  src/fields-map.json
	jq -M -r -f $^ > $@

resources/types.csv: resources/types.jq src/type-map.json
	jq -M -r -f $^ > $@

/tmp/ris.test: dist $(shell find test -type f)
	yarn cucumber-js --require 'test/*.js' --world-parameters '{"browser": false}' test/features
	yarn cucumber-js --require 'test/*.js' --world-parameters '{"browser": true}' test/features
	touch $@

dist: $(dist_files) dist/browser.min.js

dist/browser.min.js: $(src_files)
	mkdir -p $(@D)
	yarn -s browserify --standalone RIS src/index.js >$@

dist/%: src/%
	mkdir -p $(@D)
	cp $< $@

clean:; rm -rfv dist
