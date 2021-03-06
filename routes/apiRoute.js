const axios = require('axios');
const db = require('../models');
const cheerio = require('cheerio');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.json(ArticleSchema);
  });

  // A GET route for scraping the yahoo website
  app.get('/scrape', function (req, res) {
    // First, we grab the body of the html with axios
    axios.get('http://www.yahoo.com/').then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);
      let results = {};

      $('li.stream-item').each((i, element) => {
        const link = $(element).find('a').attr('href');
        const title = $(element).find('span').text().trim();
        const summary = $(element).find('p').text();
        // Save these results in an object that we'll push into the results array we defined earlier
        results = {
          title: title,
          link: link,
          summary: summary,
        };

        console.log(results);

        // Create a new Article using the `result` object built from scraping
        db.Article.create(results)
          .then((dbArticle) => {
            // View the added result in the console
            console.log(dbArticle);
            res.json(dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
    });
  });

  // Route for getting all Articles from the db
  app.get('/articles', (req, res) => {
    db.Article.find()
      .sort({ dateCreated: -1 })
      .limit(5)
      .then((dbArticle) => res.json(dbArticle))
      .catch((err) => res.json(err));
  });

  //Route for saving article
  app.put('/saved/:id', (req, res) => {
    db.Article.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { isSaved: true } }
    )
      .then((dbArticle) => res.json(dbArticle))
      .catch((err) => res.json(err));
  });

  //Route for getting saved articles
  app.get('/saved', (req, res) => {
    db.Article.find({ isSaved: true })
      .then((dbArticle) => res.json(dbArticle))
      .catch((err) => res.json(err));
  });

  //Rout for deleting saved articles
  app.put('/delete/:id', (req, res) => {
    db.Article.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { isSaved: false } }
    )
      .then((dbArticle) => res.json(dbArticle))
      .catch((err) => res.json(err));
  });

  //clear save article
  app.get('/clearSaved', (req, res) => {
    db.Article.find({ isSaved: true })
      .remove()
      .then((dbArticle) => res.json(dbArticle))
      .catch((err) => res.json(err));
  });

  //clear article
  app.get('/clearArticle', (req, res) => {
    db.Article.find({})
      .remove()
      .then((dbArticle) => res.json(dbArticle))
      .catch((err) => res.json(err));
  });

  //Route for saving an Article's associated Note
  app.get('/articles/:id', (req, res) => {
    db.Article.findOne({ _id: req.params.id })
      .populate('note')
      .then((dbArticle) => res.json(dbArticle))
      .catch((err) => res.json(err));
  });

  //route for creating note
  app.post('/articles/:id', (req, res) => {
    db.Note.create(req.body)
      .then((dbNote) => {
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { note: dbNote._id },
          { new: true }
        );
      })
      .then((dbArticle) => res.json(dbArticle))
      .catch((err) => res.json(err));
  });

  //Rout for deleting saved article notes
  app.get('/deleteNote/:id', (req, res) => {
    db.Note.findOneAndRemove({ _id: req.params.id })
      .then(function (deleteNote) {
        console.log('note deleted');
        console.log(deleteNote);
      })
      .catch((err) => console.log(err));
  });

  //export div
};
