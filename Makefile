CC=java -jar /devtools/closure-compiler/compiler.jar

test: /tmp/ris.test

sample: src/grammar.js resources/dev.ris
	cat resources/dev.ris | yarn -s nearley-test -q src/grammar.js | tee out.txt

parse: src/grammar.js
	node -p -e 'const fs = require("fs"); const parse = require("./index.js"); console.log(parse(fs.readFileSync("./resources/dev.ris","utf-8")));'

src/grammar.js: src/grammar.ne src/lexer.js
	yarn -s nearleyc $< > $@

resources/fields-map.csv: resources/fields-map.jq src/fields-map.json
	jq -M -S -r -f $^ > $@

resources/fields.csv: resources/fields.jq resources/fields.json
	jq -M -r -f $^ > $@

resources/full.ris: resources/full.jq  src/fields-map.json
	jq -M -r -f $^ > $@

resources/types.csv: resources/types.jq src/type-map.json
	jq -M -r -f $^ > $@

/tmp/ris.test: dist/index.js $(shell find test -type f)
	yarn cucumber-js --require test/steps.js test/**/*.feature
	touch $@

dist/browser.min.js: $(shell find src -type f) package.json
	mkdir -p $(@D)
	$(CC) \
		--isolation_mode IIFE \
		--assume_function_wrapper \
		--compilation_level SIMPLE \
		--module_resolution NODE \
		--process_common_js_modules \
		--externs src/externs.js \
		--js src/index.js \
		--js src/parser.js \
		--js src/grammar.js \
		--js src/lexer.js \
		--js src/type-map.json \
		--js src/fields-map.json \
		--language_in ECMASCRIPT_NEXT \
		--language_out ECMASCRIPT5_STRICT \
		--js node_modules/moo/package.json \
		--js node_modules/moo/moo.js \
		--js node_modules/nearley/package.json \
		--js node_modules/nearley/lib/nearley.js \
		--js_output_file $@

dist/index.js: dist/browser.min.js
	sed 's/window.RIS/module.exports/' $< > $@
