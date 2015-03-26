# polling-wait [![Build Status](https://secure.travis-ci.org/bnouyrigat/polling-wait.png?branch=master)](http://travis-ci.org/bnouyrigat/polling-wait)

A PollingWait function or promise to ease asynchronous testing.

## Getting Started
Install the module with: `npm install polling-wait`

```javascript
var wait = require('polling-wait').wait;
wait({timeoutAfter: 1000, pollEvery: 100}).until(function () {
    var actual = client.receiveNextMessage();
    assert(actual, 'No message received!');
});
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Benoît Nouyrigat  
Licensed under the MIT license.
