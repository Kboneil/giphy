var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'gif'
};

var pool = new pg.Pool(config);

//gets all the content from favorites table
router.get('/', function (req, res) {
  console.log('in get function');
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error querying to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT * FROM favorites',
            function (err, result) {
              if (err) {
                console.log('Error querying DB', err);
                res.sendStatus(500);
                return;
              }

              res.send(result.rows);
            });
    } finally {
      done();
    }
  });
});

//inserts the favorited GIF into the database
router.post('/', function (req, res) {
  console.log('in post function req', req.body);
  pool.connect(function (err, client, done) {
    console.log('req: ', req.body);
    try {
      if (err) {
        console.log('Error querying to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO favorites (comment, image) VALUES ($1, $2) RETURNING *;',
        [req.body.comment, req.body.image],
        function (err, result) {
          if (err) {
            console.log('Error querying DB', err);
            res.sendStatus(500);
            return;
          }

          res.send(result.rows);
        });
    } finally {
      done();
    }
  });
});

//deletes row with corresponding id
router.delete('/:id', function (req, res) {
  var id = req.params.id;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('DELETE FROM favorites WHERE id=$1', [id], function (err) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }

        res.sendStatus(204);
      });

    }finally {
      done();
    }
  });

});

//updates row with corresponding id
router.put('/:id', function (req, res) {
  var id = req.params.id;
  var comment = req.body.comment;
  var image = req.body.image;

  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error querying to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE favorites SET comment=$1, image=$2 WHERE id=$3 RETURNING *;',
      [comment, image, id],
      function (err, result) {
        if (err) {
          console.log('Error querying database', err);
          res.sendStatus(500);

        } else {
          console.log('result.rows', result.rows);
          res.send(result.rows);
        }
      });
    } finally {
      done();
    }
  });

});

module.exports = router;
