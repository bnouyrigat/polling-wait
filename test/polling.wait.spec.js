/*
 * polling-wait
 * https://github.com/bnouyrigat/polling-wait
 *
 * Copyright (c) 2015 Benoît Nouyrigat
 * Licensed under the MIT license.
 */

/* jshint strict: false */

var JS = require('jstest');
var Console = require('jstest').Console;
/* global -Promise */
var Promise = require('bluebird');
var PollingWait = require('../lib/polling.wait').PollingWait;

/* jshint withstmt: true */
/* jshint undef: false, unused: true */
JS.Test.describe('PollingWait', function() { with(this) {

    it('should \'nominal\'', function(next) { with(this) {
        var state = {counter: 0};
        var testedFunction = function () {
            state.counter++;
            Console.puts('Attempt ...#'+ state.counter);
            return state.counter === 2;
        };

        Promise.resolve().then(function () {
            new PollingWait({timeoutAfter: 75, pollEvery: 25}).until(function () {
                var actual = testedFunction();
                assert(actual, 'actual is false!');
            }).done(next);
        });
    }});

    it('should \'error\'', function(next) { with(this) {
        var state = {counter: 0};
        var testedFunction = function () {
            state.counter++;
            Console.puts('Attempt ...#' + state.counter);
            return state.counter === 6;
        };

        Promise.resolve().then(function () {
            new PollingWait({timeoutAfter: 30, pollEvery: 10}).until(function () {
                var actual = testedFunction();
                assert(actual, 'actual is false!');
            }).catch(function () { next(); });
        });
    }});


}});