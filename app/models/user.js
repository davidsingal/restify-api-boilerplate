var mongoose = require('mongoose');
var validate = require('mongoose-validate');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

/**
 * User schema definition
 * @type {Schema}
 */
var userSchema = new Schema({
  password: { type: String },
  email: {
    type: String,
    required: true,
    index: { unique: true },
    validate: [validate.email, 'Invalid email address.']
  },
  currency: { type: String, default: 'EUR' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Password length validation
userSchema.path('password').validate(function(password) {
  'use strict';
  return password && password.length >= 8;
}, 'Password must be 8 characters');


/**
 * Before save encrypt user password
 */
userSchema.pre('save', function(next) {
  'use strict';

  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

/**
 * A method to compared encrypt password and string, useful to login
 */
userSchema.methods.comparePassword = function(candidatePassword, next) {
  'use strict';
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return next(err);
    }
    next(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
