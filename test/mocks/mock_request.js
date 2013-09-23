var events = require('events');

var MockRequest = function() {};

MockRequest.prototype = new events.EventEmitter();

MockRequest.prototype.triggerRequestOnData = function(data) {
  this.emit('data', data);
};

MockRequest.prototype.triggerRequestOnEnd = function(data) {
  this.emit('end');
};

MockRequest.prototype.triggerRequestOnError = function(error) {
  this.emit('error', error);
};

module.exports = MockRequest;
