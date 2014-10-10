# mocha-bdd-with-opts

Alternate BDD for Mocha with options in the parameter list. For the moment
it only supports the pending option, used to skip tests.

[![NPM version](http://img.shields.io/npm/v/bdd-with-opts.svg)](https://npmjs.org/package/bdd-with-opts) 
[![Downloads](http://img.shields.io/npm/dm/bdd-with-opts.svg)](https://npmjs.org/package/bdd-with-opts)
[![Dependency Status](https://david-dm.org/sebv/bdd-with-opts.svg)](https://david-dm.org/sebv/bdd-with-opts)
[![devDependency Status](https://david-dm.org/sebv/bdd-with-opts/dev-status.svg)](https://david-dm.org/sebv/bdd-with-opts#info=devDependencies)

## Usage

Basics:

```js

"use strict";
var assert = require('assert');

/* global describe, it */
describe('bdd-with-opts', function(){
  var testCount = 0;

  it('should be skiped', {pending: true}, function(){
    testCount ++;
    assert(false);
  });

  it('should not be skiped', function(){
    testCount ++;
    assert(true);
  });

  it('should have run 1 test' ,function(){
    assert(testCount === 1);
  });

});

```

With a skip function:

```js
"use strict";
/* global describe, it */

var assert = require('assert');

var ENV = {
    BROWSER: 'firefox'
};

function skipIfBrowserIs(browserToSkip) {
    var ret = {
        pending: ENV.BROWSER === browserToSkip
    };
    console.log('ret -->', ret);
    return ret;
}

describe('bdd-with-opts', function(){
  var testCount = 0; 

  it('should be skiped', skipIfBrowserIs('firefox'), function(){
    testCount ++;
    assert(false);
  });

  it('should not be skiped', skipIfBrowserIs('chrome') ,function(){
    testCount ++;
    assert(true);
  });

  it('should have run 1 test' ,function(){
    assert(testCount === 1);
  });

});

```

