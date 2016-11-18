'use strict';

const exec = require('child_process').exec;
const expect = require('chai').expect;

describe('Config', () => {
  it('should write output to stdout by default', function(done) {
    exec(`echo "
      const mockyeah = new require('./server')({ port: 0 }, function() { process.exit() });
      " | node`, function(err, stdout, stderr) {
      expect(stdout).to.include('mockyeah');
      done();
    });
  });

  it('should write output to stdout when enabled', function(done) {
    exec(`echo "
      const mockyeah = new require('./server')({ port: 0, output: true }, function() { process.exit() });
      " | node`, function(err, stdout, stderr) {
      expect(stdout).to.include('mockyeah');
      done();
    });
  });

  it('should not write to stdout when disabled', function(done) {
    exec(`echo "
      const mockyeah = new require('./server')({ port: 0, output: false }, function() { process.exit() });
      " | node`, function(err, stdout, stderr) {
      expect(stdout).to.not.include('mockyeah');
      done();
    });
  });
});
