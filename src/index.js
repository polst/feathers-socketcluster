import makeDebug from 'debug';
import Proto from 'uberproto';
import socket from 'feathers-socket-commons';

const debug = makeDebug('feathers-socketcluster');

export default function (options, config) {
  return function () {
    const app = this;
    app.configure(socket('sc'));
    Proto.mixin({
      setup (server) {
        let sc = this.sc;
        if (!sc) {
          sc = this.sc = options.socketServer;
        }

        if (typeof config === 'function') {
          debug('Calling SocketIO configuration function');
          config.call(this, sc);
        }

        this._socketInfo = {
          method: 'emit',
          connection () {
            return sc;
          },
          clients () {
            return sc.clients;
          },
          params () {
            return { provider: 'sc' };
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
}
