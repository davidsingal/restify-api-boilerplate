var expect = require('chai').expect;
var ValidationError = require('mongoose').Error.ValidationError;
var UserModel = require(process.cwd() + '/app/models/user');
var helpers = require(process.cwd() + '/test/helpers');

describe('@UserModel', function() {

  'use strict';

  before(function(done) {
    helpers.connectdb(function() {
      helpers.cleardb(done);
    });
  });

  beforeEach(function() {
    this.user = new UserModel({
      email: 'user@example.com',
      password: 'password'
    });
  });

  describe('#Instance', function() {

    it('user should instance UserModel', function() {
      expect(this.user).to.be.instanceOf(UserModel);
    });

    it('user should attributes', function() {
      expect(this.user.get('email')).to.be.equal('user@example.com');
      expect(this.user.get('currency')).to.be.equal('EUR');
      expect(helpers.isDate(this.user.get('createdAt'))).to.be.equal(true);
      expect(helpers.isDate(this.user.get('updatedAt'))).to.be.equal(true);
      expect(this.user.get('password').length).to.be.above(7);
    });

  });

  describe('#Save', function() {

    it('save user', function(done) {
      this.user.save(done);
    });

    it('save should fail, if email is not valid', function(done) {
      this.user.email = 'user_at_example.com';
      this.user.save(function(err) {
          expect(err).to.be.instanceOf(ValidationError);
          done();
      });
    });

  });

  describe('#Find', function() {

    it('password should match', function(done) {
      UserModel
        .findOne({ email: 'user@example.com' }, function(err, user) {
          if (err) {
            throw err;
          }

          user.comparePassword('password', function(err, isMatch) {
            if (err) {
              throw err;
            }
            expect(isMatch).to.be.equal(true);
          });

          done();
        });
    });

    it('password should match', function(done) {
      UserModel
        .findOne({ email: 'user@example.com' }, function(err, user) {
          if (err) {
            throw err;
          }

          user.comparePassword('other_password', function(err, isMatch) {
            if (err) {
              throw err;
            }
            expect(isMatch).to.be.equal(false);
          });

          done();
        });
    });

  });

  after(function(done) {
    helpers.cleardb(function() {
      helpers.disconnectdb(done);
    });
  });

});
