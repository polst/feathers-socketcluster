import Service from 'feathers-socket-commons/client';
import toArray from 'to-array';

const scSend = Service.prototype.send;

Service.prototype.send = function () {
  let args = toArray(arguments);
  let query = [args.shift()];
  let callback;
  if (typeof args[args.length - 1] === 'function') {
    callback = args.pop();
  }
  query.push(args);
  if (callback) {
    query.push(callback);
  }
  scSend.apply(this, query);
};

export default function (connection, options) {
  if (!connection) {
    throw new Error('SocketCluster connection needs to be provided');
  }

  const defaultService = function (name) {
    const settings = Object.assign({}, options, {
      name,
      connection,
      method: 'emit'
    });

    return new Service(settings);
  };

  const initialize = function () {
    if (typeof this.defaultService === 'function') {
      throw new Error('Only one default client provider can be configured');
    }

    this.io = connection;
    this.defaultService = defaultService;
  };

  initialize.Service = Service;
  initialize.service = defaultService;

  return initialize;
}
