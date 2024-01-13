var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/recommendations.json"));
  res.render('recommendations', { data: JSON.parse(data)
 });
});

router.post('/', jsonParser, function(req, res, next) {
  const expectedAttributed = ["url", "name", "alt", "category", "header", "description"]
    Object.keys(req.body).forEach(param => {
        if (!(expectedAttributed.includes(param))) {
            res.status(400).end("Specify only the expected attributes");
        }
        else{
          if(req.body[param] == ''){
            res.status(400).end(param + " must have a value");
          }
        }
    });
    if (req.body.url == null || req.body.name == null) {
      res.status(400).end("Url/name not provided");
    }
    if (req.body.category != null) {
      if (!(["wedding", "christmas", "birthday", "anniversary"].includes(req.body.category))) {
         res.status(400).end("Wrong category provided");
      }
    }

  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/portfolio.json"));
  let portfoliosArray = JSON.parse(rawdata);
  if(portfoliosArray.filter(x => x.name === req.body.name).length == 0) {
    download(req.body.url, req.body.name, function(){
      console.log('done');
    });
    const newArray = portfoliosArray.concat([req.body])
    fs.writeFileSync(path.resolve(__dirname, "../data/portfolio.json"), JSON.stringify(newArray));
  }
  res.end();
});

router.delete("/", jsonParser, function (req, res, next) {
  let rawdata = fs.readFileSync(
    path.resolve(__dirname, "../data/recommendations.json")
  );
  let recommendationsArray = JSON.parse(rawdata);
  const newArray = recommendationsArray.filter((x) => x.name !== req.body.name);
  if (newArray.length !== recommendationsArray.length) {
    fs.writeFileSync(
      path.resolve(__dirname, "../data/recommendations.json"),
      JSON.stringify(newArray)
    );
  }
  res.end();
});

module.exports = router;
