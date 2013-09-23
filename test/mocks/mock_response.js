var MockResponse = function() {};

MockResponse.prototype = {
  writeHead: function() {},
  end: function(data) {
    this.data = data;
  }
};

module.exports = MockResponse;
