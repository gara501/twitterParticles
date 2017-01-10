var express = require('express');
var cors = require('cors');
var httpRequest = require('request');
var fs = require('fs');
var router = express.Router();
var twitter = require('twitter');

var corsOptions = {
  origin: 'http://pbs.twimg.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var client = new twitter({
  consumer_key: 'oxqyNoKPwyIHUTycra0cbDVG5',
  consumer_secret: 'NcF8NNMSlBWgrakcKnoODO82gHijK73KEG5Ck4pkvTlpHDtcov',
  access_token_key: '716342946-nIwIRizyJ8wWgeJv2wDCWAZJXf3RRnAhlCKPayPw',
  access_token_secret: 'YGCkMIrsNEZERE7rRJSR02SFDY27P39ZNxo9YZRu6V1Nx'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:username', cors(corsOptions), function(req, res, next) {
  // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
  // client.get('statuses/user_timeline', { screen_name: req.params.username, count: 50 }, function(error, info, response) {
  //   if (!error) {
  //     console.log(tweets);
  //     res.status(200).render('index', { title: 'Twitter Particles', info: info });
  //   }
  //   else {
  //     res.status(500).json({ error: error });
  //   }
  // });

  client.get('statuses/user_timeline', { screen_name: req.params.username, count: 50 }, function(error, tweets, response) {
    if (!error) {
      var url = tweets[0].user.profile_image_url;
      console.log(tweets[0].user);
      httpRequest.get({url: url, encoding: 'binary'}, function (err, httpResponse, body) {
        fs.writeFile('public/images/'+ tweets[0].user.id + '.jpg', body, 'binary', function(err) {
          if(err) { 
            console.log('Error: '+err);
          } else {  
            res.status(200).render('index', { title: 'Twitter Particles', tweets: tweets, avatar: 'images/' + tweets[0].user.id + '.jpg' });
            console.log('Saved image');
          }
        });
      });
    }
    else {
      res.status(500).json({ error: error });
    }
  });
});

module.exports = router;
