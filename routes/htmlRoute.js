const path = require('path');

module.exports = function (app) {
  // home page
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  // saved Article page
  app.get('/savedArticle', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'savedArticle.html'));
  });
};
