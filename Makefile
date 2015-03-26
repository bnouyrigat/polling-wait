PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

spec_js := $(shell find test -type f -name '*.spec.js')

clean:
	@ rm -rf node_modules/
	@ rm -rf dist/

test:
	FORMAT=$(FORMAT) jstest $(spec_js)

install:
	npm install $(ARGS)

jshint:
	@ jshint --reporter node_modules/jshint-stylish/stylish.js \
	lib/ test/

.PHONY: test
