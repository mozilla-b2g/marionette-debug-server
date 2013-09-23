suite('Router', function() {
  var subject;

  setup(function() {
    subject = require('../router');
  });

  suite('#screenshot', function() {
    var path = './logs',
        data = {
                 screenshots: [
                   {
                     description: 'the first one',
                     image: 'data:image/png;base64,'
                   },
                   {
                     description: 'the second one',
                     image: 'data:image/png;base64,'
                   }
                 ]
               };

    test('when no filename is assigned', function() {
      // For example, 1983-09-08-13-07-11-{uuid}
      var filenamePattern =
        /\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}/;
      var filename = subject.screenshot(data, path);
      assert.ok(filenamePattern.test(filename));
    });

    test('when filname is assigned', function() {
      var expectedFilname = 'logs.html';
      var filename = subject.screenshot(data, path, expectedFilname);
      assert.deepEqual(filename, expectedFilname);
    });
  });
});
