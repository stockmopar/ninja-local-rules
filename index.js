var util = require('util')
  , stream = require('stream');

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