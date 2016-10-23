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

router.delete('/:id', function(req, res){
  var id = req.params.id;
  pool.connect(function(err, client, done){
    try{
      if(err){
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('DELETE FROM favorites WHERE id=$1', [id], function(err){
        if(err){
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(204);
      });

    }finally{
      done();
    }
  });

});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var comment = req.body.comment;
  var image = req.body.image;

  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error querying to the DB', err);
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
          console.log("result.rows", result.rows);
          //sens the updated information back to client.js so it can be appended
          res.send(result.rows);
        }
      });
    } finally {
      done();
    }
  });

});

module.exports = router;
