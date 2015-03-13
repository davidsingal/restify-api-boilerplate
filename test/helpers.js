var mongoose = require('mongoose');
var db = 'mongodb://localhost/pockets_test';

/**
 * To connect DB before test models
 * @param  {Function} done
 */
exports.connectdb = function(done) {
  'use strict';
  mongoose.connect(db, done);
};

/**
 * To disconnect DB after test models
 * @param  {Function} done
 */
exports.disconnectdb = function(done) {
  'use strict';
  mongoose.disconnect(done);
};

/**
 * Remove DB after test models
 * @param  {Function} done
 */
exports.cleardb = function(done) {
  'use strict';
  var collections = mongoose.connection.collections;
  for (var key in collections) {
    if (collections.hasOwnProperty(key)) {
      collections[key].remove(function() {});
    }
  }
  return done();
};

/**
 * Check if a date is valid
 * @param  {Date}  d
 * @return {Boolean}
 */
exports.isDate = function(d) {
  'use strict';
  if (Object.prototype.toString.call(d) !== '[object Date]') {
    return false;
  }
  return !isNaN(d.getTime());
};
