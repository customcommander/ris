src_files=$(shell find src -type f)
dist_files=$(patsubst src/%,dist/%,$(src_files)) dist/browser.min.js

test: /tmp/ris.test

sample: src/grammar.js resources/dev.ris
	cat resources/dev.ris | yarn -s nearley-test -q src/grammar.js | tee out.txt

parse: src/grammar.js
	node -p -e 'const fs = require("fs"); const read = require("./src/index").read; console.log(JSON.stringify(read(fs.readFileSync("./resources/dev.ris","utf-8")), null, 2));'

src/grammar.js: src/grammar.ne src/lexer.js
	yarn -s nearleyc $< > $@

/tmp/ris.test: dist $(shell find test -type f)
	yarn cucumber-js --require 'test/*.js' --world-parameters '{"browser": false}' test/features
	yarn cucumber-js --require 'test/*.js' --tags '@browser' --world-parameters '{"browser": true}' test/features
	touch $@

dist: $(dist_files) dist/browser.min.js

dist/browser.min.js: $(src_files)
	mkdir -p $(@D)
	yarn -s browserify --standalone RIS src/index.js >$@

dist/%: src/%
	mkdir -p $(@D)
	cp $< $@

static_site: static_site/uat/index.html
static_site/uat/index.html: uat/index.html
	mkdir -p $(@D)
	cp -f $< $@

clean:; rm -rfv dist static_site
