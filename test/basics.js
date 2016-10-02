"use strict";
var assert = require('assert');

/* global describe, it */
describe('bdd-with-opts - basics', function(){
  var testCount = 0;
  describe('should be skipped', {pending: true}, function(){
      it('should be skiped', {pending: true}, function(){
        testCount ++;
        assert(false);
      });
  });

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
