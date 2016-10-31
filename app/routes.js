const express = require('express');
const models = require('../models');
const router = express.Router();
const youtubeStream = require('youtube-audio-stream');




router.get('/', (req, res, next) => {
  res.render('index', { title: 'Firefeed' });
});



router.get('/youtube', (req, res, next) => {
	console.log('just hit youtube');
	var requestUrl = 'http://youtube.com/watch?v=' + req.params.videoId;

	try {
		youtubeStream(requestUrl).pipe(res);
	} catch (exception) {
		res.status(500).send(exception);
	}

});


router.get('/curators/:name', (req, res) => {
  models.Curator.findOne({where: {title: req.params.name}})
    .then(curator => {
      res.json(curator);
    });
});

router.get('/curators/:name/tracks', (req, res) => {
  models.Curator.findOne({where: {title: req.params.name}})
    .then(curator => {
      curator.getTracks().
        then(tracks => {
          res.json(tracks);
        });
    });
});

router.get('/feed', (req, res) => {

  let lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  models.Track.findAll({
    limit: 10,
    order: 'playback_count DESC',
    where: {
      created_at_external: {
        $gt: lastWeek
      },
      track_type: 'song'
    }
  })
  .then(tracks => res.json(tracks));






});

router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/users', (req, res) => {
  models.User.create({
    email: req.body.email
  })
  .then(user => {
    res.json(user);
  });
});


module.exports = router;
