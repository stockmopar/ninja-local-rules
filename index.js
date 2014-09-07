var util = require('util')
  , stream = require('stream')
  , configHandlers = require('./lib/config');

// Give our module a stream interface
util.inherits(localRules,stream);

/**
 * Called when our client starts up
 * @constructor
 *
 * @param  {Object} opts Saved/default module configuration
 * @param  {Object} app  The app event emitter
 * @param  {String} app.id The client serial number
 *
 * @property  {Function} save When called will save the contents of `opts`
 * @property  {Function} config Will be called when config data is received from the cloud
 *
 * @fires register - Emit this when you wish to register a device (see Device)
 * @fires config - Emit this when you wish to send config data back to the cloud
 */
 
function localRules(opts,app) {

  var self = this;
  this._app = app;
  this._opts = opts;
  this._opts.sockets = opts.sockets || [];

  console.log(app);
  
 };

// Export it
module.exports = localRules;

/**
 * Add a particular TCP to this configuration
 * @param {[String} host Host of the TCP to remember
 */
localRules.prototype.remember = function(host) {
  this._app.log.info("(TCP Lights) remember()");
  this._opts.sockets.push(host);
  this.save();
};

/**
 * Called when a user prompts a configuration
 * @param  {Object}   rpc     RPC Object
 * @param  {Function} cb      Callback with return data
 */
localRules.prototype.config = function(rpc,cb) {
  this._app.log.info("(TCP Lights) config()");
  var self = this;

  if (!rpc) {
    return configHandlers.probe.call(this,cb);
  }

  switch (rpc.method) {
    case 'configScan':               return configHandlers.configScan.call(this,rpc.params,cb); break;
    case 'manual_set_tcp':    return configHandlers.manual_set_tcp.call(this,rpc.params,cb); break;
    case 'manual_get_tcp':    return configHandlers.manual_get_tcp.call(this,rpc.params,cb); break;
    case 'manual_show_remove': return configHandlers.manual_show_remove.call(this,rpc.params,cb); break;
    case 'manual_remove_tcp': return configHandlers.manual_remove_tcp.call(this,rpc.params,cb); break;
    default:                   return cb(true);                                              break;
  }
};
