var TEMPLATE_PATH = __dirname + '/template/screenshot_list.ejs',
    dataFormat = require('dateformat'),
    uuid = require('node-uuid'),
    LogReporter = require('./lib/log_reporter'),
    logReporter = {};

/**
 * Router is used to handle the requests from the clients.
 *
 * @class Router
 */
function Router() {
  logReporter = new LogReporter(TEMPLATE_PATH);
}

Router.prototype = {
  /**
   * Build HTML files contain screenshot images and
   * save they in the server.
   *
   * @param {Object} data a JSON format object
   *                      contains creenshot images and info.
   * @param {String} path save the file in specificed path.
   * @param {String} [_filename] specificed filename to save.
   * @return {String} specificed filename to save.
   */
  screenshot: function(data, path, _filename) {
    var filename;

    if (!_filename) {
      // If there is no filename assigned,
      // the datetime and uuid will be the filename.
      // For example, 1983-09-08-13-07-11-{uuid}.
      filename =
        dataFormat(new Date(), 'yyyy-mm-dd-HH-MM-ss-') +
        uuid.v1() + '.html';
    } else {
      filename = _filename;
    }

    logReporter.save(data, path, filename);
    return filename;
  }
};

module.exports = new Router();
