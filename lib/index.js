
/**
 * Dependencies
 */

var debug = require('debug')('upstart');
var write = require('co-fs').writeFile;
var read = require('co-fs').readFile;
var exec = require('co-exec');

/**
 * Export `write`
 */

exports.write = write;

/**
 * Export `exec`
 */

exports.exec = exec;

/**
 * Export `jobs`
 */

exports.jobs = '/etc/init';

/**
 * Export `bins`
 */

var bins = exports.bins = {
  restart: '/sbin/restart',
  reload: '/sbin/reload',
  start: '/sbin/start',
  stop: '/sbin/stop'
};

/**
 * Start `name`.
 *
 * @param {String} name
 * @api public
 */

exports.start = function*(name){
  var cmd = [bins.start, name].join(' ');
  yield exports.exec(cmd);
  debug('started %s', name);
};

/**
 * Stop `name`.
 *
 * @param {String} name
 * @api public
 */

exports.stop = function*(name){
  var cmd = [bins.stop, name].join(' ');
  yield exports.exec(cmd);
  debug('stopped %s', name);
};

/**
 * Restart `name`.
 *
 * @param {String} name
 * @api public
 */

exports.restart = function*(name){
  var cmd = [bins.restart, name].join(' ');
  yield exports.exec(cmd);
  debug('restarted %s', name);
};

/**
 * Reload `name`.
 *
 * @param {String} name
 * @api public
 */

exports.reload = function*(name){
  var cmd = [bins.reload, name].join(' ');
  yield exports.exec(cmd);
  debug('reloaded %s', name);
};

/**
 * Enable `name`.
 *
 * @param {String} name
 * @api public
 */

exports.enable = function*(name){
  var path = exports.jobs + '/' + name + '.conf';
  var str = (yield read(path)).toString();
  yield exports.write(path, str.replace(/(\n*)#start on/, '$1start on'));
  debug('enabled %s', name);
};

/**
 * Disable `name`.
 *
 * @param {String} name
 * @api public
 */

exports.disable = function*(name){
  var path = exports.jobs + '/' + name + '.conf';
  var str = (yield read(path)).toString();
  yield exports.write(path, str.replace(/(\n*)start on/, '$1#start on'));
  debug('disabled %s', name);
};
