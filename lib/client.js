'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (connection, options) {
  if (!connection) {
    throw new Error('SocketCluster connection needs to be provided');
  }

  var defaultService = function defaultService(name) {
    var settings = _extends({}, options, {
      name: name,
      connection: connection,
      method: 'emit'
    });

    return new _client2.default(settings);
  };

  var initialize = function initialize() {
    if (typeof this.defaultService === 'function') {
      throw new Error('Only one default client provider can be configured');
    }

    this.io = connection;
    this.defaultService = defaultService;
  };

  initialize.Service = _client2.default;
  initialize.service = defaultService;

  return initialize;
};

var _client = require('feathers-socket-commons/client');

var _client2 = _interopRequireDefault(_client);

var _toArray = require('to-array');

var _toArray2 = _interopRequireDefault(_toArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scSend = _client2.default.prototype.send;

_client2.default.prototype.send = function () {
  var args = (0, _toArray2.default)(arguments);
  var query = [args.shift()];
  var callback = void 0;
  if (typeof args[args.length - 1] === 'function') {
    callback = args.pop();
  }
  query.push(args);
  if (callback) {
    query.push(callback);
  }
  scSend.apply(this, query);
};

module.exports = exports['default'];