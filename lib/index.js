
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
 * Start `name`.
 *
 * @param {String} name
 * @api public
 */

exports.start = function*(name){
  var cmd = ['start', name].join(' ');
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
  var cmd = ['stop', name].join(' ');
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
  var cmd = ['restart', name].join(' ');
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
  var cmd = ['reload', name].join(' ');
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
