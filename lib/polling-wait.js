/*
 * polling-wait
 * https://github.com/bnouyrigat/polling-wait
 *
 * Copyright (c) 2015 Benoît Nouyrigat
 * Licensed under the MIT license.
 */

'use strict';

/* global -Promise */
var assert = require('assert');
var Promise = require('bluebird');
var JS = require('jstest');

/**
 *
 * @param params parameters of the form {timeoutAfter: ..., pollEvery: ...}. Time is in milliseconds.
 * @constructor
 */
var PollingWait = function (params) {
    // By default timeout after 5s
    this.timeoutAfter = (params && params.timeoutAfter) || 5000;
    // By default poll every 100ms
    this.pollEvery = (params && params.pollEvery) || 100;
    this.failures = [];
    this.retry = undefined;
    var self = this;

    this.until = function (assertfn) {

        var retry = function () {

            return Promise.resolve().then(function (actual) {
                try {
                    return assertfn(actual);
                } catch (e) {
                    if(JS.Test.Unit.isFailure(e)) {
                        self.failures.push(e);
                        self.retry = Promise.delay(self.pollEvery).then(function () { return retry(); }).cancellable();
                        return self.retry;
                    }
                    throw e;
                }
            });

        };

        return retry().timeout(self.timeoutAfter).catch(Promise.TimeoutError, function () {
            if(self.retry) self.retry.cancel();
            throw self.failures;
        });
    };

};

/**
 * Factory method for {PollingWait}.
 * @param params parameters for the polling/wait
 * @returns {PollingWait}
 */
function wait (params) {
    return new PollingWait(params);
}

exports.wait = wait;
exports.PollingWait = PollingWait;

