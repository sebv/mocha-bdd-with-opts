var Mocha;
if(module.parent){
  Mocha = module.parent.require('mocha');
}else{
  Mocha = window.Mocha;
}

/**
 * Module dependencies.
 */
var Suite = Mocha.Suite
  , Test = Mocha.Test
  , utils = Mocha.utils
  , Args = require('vargs').Constructor;

/**
 * BDD-style interface:
 *
 *      describe('Array', function() {
 *        describe('#indexOf()', function() {
 *          it('should return -1 when not present', function() {
 *            // ...
 *          });
 *
 *          it('should return the index when present', function() {
 *            // ...
 *          });
 *        });
 *      });
 *
 * @param {Suite} suite Root suite.
 */
module.exports = function(suite) {
  var suites = [suite];

  suite.on('pre-require', function(context, file, mocha) {
    var common = require('./common')(suites, context, mocha);

    context.before = common.before;
    context.after = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.run = mocha.options.delay && common.runWithSuite(suite);
    /**
     * Describe a "suite" with the given `title`
     * and callback `fn` containing nested suites
     * and/or tests.
     */

    context.describe = context.context = function() {
      var args = new Args(arguments);
      var title = args.all[0];
      var opts = args.all[1] || {};
      var fn = args.callback;
      suite = common.suite.create({
        title: title,
        file: file,
        pending: opts.pending ? true : false,
        fn: fn
      });
      return suite
    };

    /**
     * Pending describe.
     */

    context.xdescribe = context.xcontext = context.describe.skip = function() {
      var args = new Args(arguments);
      var title = args.all[0];
      var fn = args.callback;
      return common.suite.skip({
        title: title,
        file: file,
        fn: fn
      });
    };

    /**
     * Exclusive suite.
     */

    context.describe.only = function(title, fn) {
      var args = new Args(arguments);
      var title = args.all[0];
      var opts = args.all[1] || {};
      var fn = args.callback;
      suite = common.suite.only({
        title: title,
        file: file,
        fn: fn
      });
      return suite
    };

    /**
     * Describe a specification or test-case
     * with the given `title` and callback `fn`
     * acting as a thunk.
     */

    context.it = context.specify = function(title, fn) {
      var args = new Args(arguments);
      var title = args.all[0];
      var opts = args.all[1] || {};
      var fn = args.callback;
      var suite = suites[0];
      if (suite.isPending() || opts.pending) {
        fn = null;
      }
      var test = new Test(title, fn);
      test.file = file;
      suite.addTest(test);
      return test;
    };

    /**
     * Exclusive test-case.
     */

    context.it.only = function(title, fn) {
      var args = new Args(arguments);
      var title = args.all[0];
      var opts = args.all[1] || {};
      var fn = args.callback;
      suite = common.test.only(mocha, context.it(title, fn));
      suite.pending = opts.pending ? true : false;
      return suite
    };

    /**
     * Pending test case.
     */

    context.xit = context.xspecify = context.it.skip = function(title) {
      context.it(title);
    };

    /**
     * Number of attempts to retry.
     */
    context.it.retries = function(n) {
      context.retries(n);
    };
  });
};
Mocha.interfaces['bdd-with-opts'] = module.exports;
