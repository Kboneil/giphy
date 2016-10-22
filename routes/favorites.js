var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'gif'
};

var pool = new pg.Pool(config);

router.get('/', function (req, res) {
  console.log('in get function');
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        res.sendStatus(500);
        return;
      }
      //finds all the information from the list table
      client.query('SELECT * FROM favorites',
            function (err, result) {
              if (err) {
                res.sendStatus(500);
                return;
              }
              //and sends it back to the client.js
              console.log('results.rows', result.rows);
              res.send(result.rows);
            });
    } finally {
      done();
    }
  });
});

router.post('/', function (req, res) {
  console.log('in post function req', req.body);
  pool.connect(function (err, client, done) {
    console.log('req: ', req.body);
    try {
      if (err) {
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO favorites (comment, image) VALUES ($1, $2) RETURNING *;',
        [req.body.comment, req.body.image],
        function (err, result) {
          if (err) {
            console.log('Issue Querying the DB', err);
            res.sendStatus(500);
            return;
          }

          res.send(result.rows);
        })
    } finally {
      done();
    }
  });
});

module.exports = router;
