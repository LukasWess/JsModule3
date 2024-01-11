var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var express = require("express");
var router = express.Router();
const fs = require("fs");
const { data } = require("jquery");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  let data = fs.readFileSync(
    path.resolve(__dirname, "../data/introductionArray.json")
  );
  let array = JSON.parse(data);
  res.render("home", { array: JSON.parse(data) });
  console.log(array);
});

router.post("/", jsonParser, function (req, res, next) {
  let rawdata = fs.readFileSync(
    path.resolve(__dirname, "../data/introductionArray.json")
  );
  let array = JSON.parse(rawdata);
  const newArray = array.concat([req.body.newText]);
  fs.writeFileSync(
    path.resolve(__dirname, "../data/introductionArray.json"),
    JSON.stringify(newArray)
  );
  res.end();
});

router.delete("/", jsonParser, function (req, res, next) {
  try {
    let rawdata = fs.readFileSync(
      path.resolve(__dirname, "../data/introductionArray.json")
    );
    let array = JSON.parse(rawdata);

    // Get the text to delete from the request body
    let textToDelete = req.body.deletedText;

    let indexToDelete = array.indexOf(textToDelete);

    if (indexToDelete !== -1) {
      array.splice(indexToDelete, 1);

      fs.writeFileSync(
        path.resolve(__dirname, "../data/introductionArray.json"),
        JSON.stringify(array)
      );
      res.status(200).send("Text deleted successfully.");
    } else {
      res.status(404).send("Text not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting the text.");
  }
});

module.exports = router;
