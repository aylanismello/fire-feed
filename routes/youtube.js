const express = require('express');
const router = express.Router();
const youtubeStream = require('youtube-audio-stream');

router.get('/', (req, res) => {
	console.log('just hit youtube');
	var requestUrl = 'http://youtube.com/watch?v=' + req.params.videoId;
	try {
		youtubeStream(requestUrl).pipe(res);
	} catch (exception) {
		res.status(500).send(exception);
	}

});

module.exports = router;
