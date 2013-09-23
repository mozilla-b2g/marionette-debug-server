suite('LogReporter', function() {
  var fs = require('fs'),
      LogReporter = require('../lib/log_reporter'),
      subject = {};

  setup(function() {
    subject = new LogReporter('../template/screenshot_list.ejs');
  });

  suite('#save', function() {
    var data = {},
        path = '',
        filename = '';

    setup(function() {
      sinon.stub(subject, '_saveHtmlWithTemplate');
    });

    test('should save as a HTML file', function() {
      data = {};
      path = 'path';
      filename = 'filename.html';
      subject.save(data, path, filename);

      assert.deepEqual(1, subject._saveHtmlWithTemplate.callCount);
      assert.ok(subject._saveHtmlWithTemplate.calledWith(subject._template,
                                                         data,
                                                         path,
                                                         filename));
    });

    teardown(function() {
      subject._saveHtmlWithTemplate.restore();
    });
  });

  suite('#_saveHtmlWithTemplate', function() {
    var template = '',
        data = {},
        path = '',
        filename = '',
        exceptedFilePath = '',
        exceptedHtml = '';

    setup(function() {
      template = '<%= message %>',
      data = { message: 'Hello world!' },
      path = 'path',
      filename = 'filename.html';
      exceptedFilePath = path + '/' + filename,
      exceptedHtml = 'Hello world!';

      sinon.stub(fs, 'writeFile');
    });

    test('when the path is existed', function() {
      sinon.stub(fs, 'exists', function(path, callback) {
        callback(true);
      });
      sinon.stub(fs, 'mkdir');

      subject._saveHtmlWithTemplate(template,
                                    data,
                                    path,
                                    filename);
      assert.deepEqual(0, fs.mkdir.callCount);
      assert.ok(fs.writeFile.calledWith(exceptedFilePath, exceptedHtml));
    });

    test('when the path is not existed', function() {
      sinon.stub(fs, 'exists', function(path, callback) {
        callback(false);
      });
      sinon.stub(fs, 'mkdir', function(path, callback) {
        callback();
        assert.ok(fs.writeFile.calledWith(exceptedFilePath, exceptedHtml));
      });

      subject._saveHtmlWithTemplate(template,
                                    data,
                                    path,
                                    filename);
      assert.deepEqual(1, fs.mkdir.callCount);
    });

    teardown(function() {
      fs.exists.restore();
      fs.mkdir.restore();
      fs.writeFile.restore();
    });
  });
});
