
var read = require('fs').readFileSync;
var job = read(__dirname + '/fixtures/job.conf').toString();
var disabled = read(__dirname + '/fixtures/job.disabled.conf').toString();
var exec = require('co-exec');
var upstart = require('..');
var co = require('co');

describe('upstart', function(){
  var command = '';
  var wrote = '';

  beforeEach(function(){
    upstart.jobs = __dirname + '/fixtures';
    command = '';
    wrote = '';
  })

  beforeEach(function(){
    upstart.write = function(path, str){
      return function(done){
        wrote = str;
        done();
      };
    };
  })

  beforeEach(function(){
    upstart.exec = function(cmd){
      return function(done){
        command = cmd;
        done();
      };
    };
  })

  describe('#start', function(){
    it('should call start service', function(done){
      co(function*(){
        yield upstart.start('service');
        command.should.eql('/sbin/start service');
        done();
      })();
    })
  })

  describe('#stop', function(){
    it('should stop the service', function(done){
      co(function*(){
        yield upstart.stop('service');
        command.should.eql('/sbin/stop service');
        done();
      })();
    })
  })

  describe('#restart', function(){
    it('should restart the service', function(done){
      co(function*(){
        yield upstart.restart('service');
        command.should.eql('/sbin/restart service');
        done();
      })();
    })
  })

  describe('#reload', function(){
    it('should reload the service', function(done){
      co(function*(){
        yield upstart.reload('service');
        command.should.eql('/sbin/reload service');
        done();
      })();
    })
  })

  describe('#disable', function(){
    it('should disable by commenting "start on"', function(done){
      co(function*(){
        yield upstart.disable('job');
        wrote.should.eql(disabled);
        done();
      })();
    })
  })

  describe('#enable', function(){
    it('should enable by uncommenting "start on"', function(done){
      co(function*(){
        yield upstart.enable('job.disabled');
        wrote.should.eql(job);
        done();
      })();
    })
  })
})
