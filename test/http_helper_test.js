suite('HttpHelper', function() {
  var http = require('http'),
      HttpHelper = require('../lib/http_helper'),
      MockRequest = require('./mocks/mock_request'),
      MockResponse = require('./mocks/mock_response'),
      request = {},
      response = {},
      subject = {};

  setup(function() {
    request = new MockRequest();
    response = new MockResponse();
    subject = new HttpHelper(request, response);
  });

  suite('#postHandler', function() {
    test('when the request is successful', function() {
      var callback = sinon.spy();

      subject.postHandler(callback);
      request.triggerRequestOnData('{}');
      request.triggerRequestOnEnd();

      assert.ok(callback.calledWith(undefined, {}));
    });

    test('when the request is failed', function() {
      var exceptedError = 'error',
          callback = sinon.spy();

      subject.postHandler(callback);
      request.triggerRequestOnError(exceptedError);

      assert.ok(callback.calledWith(exceptedError));
    });
  });

  suite('#responseMessage', function() {
    test('call with result and message params', function() {
      var data = {
        result: 'success',
        message: 'It is OK'
      },
      exceptedResult = JSON.stringify(data, null, 2);

      subject.responseMessage(data.result, data.message);

      assert.deepEqual(exceptedResult, response.data);
    });

    test('call only with result param', function() {
      var data = {
        result: 'success'
      },
      exceptedResult = JSON.stringify(data, null, 2);

      subject.responseMessage(data.result, data.message);

      assert.deepEqual(exceptedResult, response.data);
    });
  });
});
