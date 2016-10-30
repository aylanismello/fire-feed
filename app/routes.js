const express = require('express');
const models = require('../models');
const router = express.Router();
const youtubeStream = require('youtube-audio-stream');




router.get('/', (req, res, next) => {


  res.render('index', { title: 'Express' });
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
