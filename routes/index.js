var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var History = mongoose.model('History');
var Bing = require('node-bing-api')({ accKey: process.env.API_KEY });

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/latest', function (req, res) {
    History.find({}).limit(10).sort({ when: -1 }).select({ term: 1, when: 1, _id: 0}).exec(callback);
    function callback(err, data) {
        if(err){ res.send(err); }
        res.send(data);
    };
});

router.get('/:query', function(req, res, next) {
    var history = { "term": req.params.query, "when": new Date().toLocaleString() }
    if (req.params.query !== 'favicon.ico' || req.params.query !== 'latest') {
        var obj = new History(history)
        obj.save(function(err, data){
            if (err) throw err;
            console.log('Saved ' + data);
        })
        var size = req.query.offset || 10;
        Bing.images(req.params.query, {top: size }, function(err, data, body){
            if (err) throw err;
            res.send(body.value.map(function(img){
                return { "url": img.webSearchUrl, "snippet": img.name, "thumbnail": img.thumbnailUrl, "context": img.contentUrl }
            }));
        })
    }
});

module.exports = router;
