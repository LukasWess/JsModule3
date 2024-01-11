var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  let data = fs.readFileSync(
    path.resolve(__dirname, "../data/introductionArray.json")
  );
  let array = JSON.parse(data);

  let rawdata = fs.readFileSync(
    path.resolve(__dirname, "../data/recommendations.json")
  );
  let recommendations = JSON.parse(rawdata);

  res.render("index", {
    title: "Express",
    array: array,
    recommendations: recommendations,
  });
});

module.exports = router;
