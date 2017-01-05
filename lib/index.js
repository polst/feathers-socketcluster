'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options, config) {
  return function () {
    var app = this;
    app.configure((0, _feathersSocketCommons2.default)('sc'));
    _uberproto2.default.mixin({
      setup: function setup(server) {
        var sc = this.sc;
        if (!sc) {
          sc = this.sc = options.socketServer;
          sc.addMiddleware(options.socketServer.MIDDLEWARE_EMIT, function (req, next) {
            req.socket.feathers = { provider: 'sc' };
            next();
          });
        }

        if (typeof config === 'function') {
          debug('Calling SocketIO configuration function');
          config.call(this, sc);
        }

        this._socketInfo = {
          method: 'emit',
          connection: function connection() {
            return sc;
          },
          clients: function clients() {
            return sc.clients;
          },
          params: function params(socket) {
            return socket.feathers;
          }
        };

        // In Feathers it is easy to hit the standard Node warning limit
        // of event listeners (e.g. by registering 10 services).
        // So we set it to a higher number. 64 should be enough for everyone.
        this._socketInfo.connection().setMaxListeners(64);

        return this._super.apply(this, arguments);
      }
    }, app);
  };
};

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _uberproto = require('uberproto');

var _uberproto2 = _interopRequireDefault(_uberproto);

var _feathersSocketCommons = require('feathers-socket-commons');

var _feathersSocketCommons2 = _interopRequireDefault(_feathersSocketCommons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-socketcluster');

module.exports = exports['default'];