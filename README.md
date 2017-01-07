# feathers-socketcluster

[![Build Status](https://travis-ci.org/feathersjs/feathers-socketio.png?branch=master)](https://travis-ci.org/feathersjs/feathers-socketio)
[![Code Climate](https://codeclimate.com/github/feathersjs/feathers-socketio/badges/gpa.svg)](https://codeclimate.com/github/feathersjs/feathers-socketio)
[![Test Coverage](https://codeclimate.com/github/feathersjs/feathers-socketio/badges/coverage.svg)](https://codeclimate.com/github/feathersjs/feathers-socketio/coverage)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-socketio.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-socketio)
[![Download Status](https://img.shields.io/npm/dm/feathers-socketio.svg?style=flat-square)](https://www.npmjs.com/package/feathers-socketio)
[![Slack Status](http://slack.feathersjs.com/badge.svg)](http://slack.feathersjs.com)

> The Feathers SocketCluster real-time API provider

## About

This provider exposes [Feathers](http://feathersjs.com) services through a [SocketCluster](http://socketcluster.io/) real-time API. It is compatible with Feathers 2.x (1.x not tested).

Tests not working.

~~__Note:__ For the full API documentation go to [http://docs.feathersjs.com/real-time/socket-io.html](http://docs.feathersjs.com/real-time/socket-io.html).~~

## Quick example on SC worker controller

```js
import feathers from 'feathers';
import feathersSocket from 'feathers-socketcluster';
let scServer = worker.scServer;
const app = feathers()
  .configure(feathersSocket({socketServer: scServer}, function(io) {
    
  }));

app.use('/todos', {
  get: function(id, params) {
    console.log(params.data); // -> 'Hello world'

    return Promise.resolve({
      id,
      description: `You have to do ${name}!`
    });
  }
});
```

## Client use

```js
import socketCluster from 'socketcluster-client';
import feathers from 'feathers/client';
import feathersSC from 'feathers-socketcluster/client';

const socket = socketCluster.connect({ port: 8000 });
const app = feathers()
  .configure(feathersSC(socket));
```

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
