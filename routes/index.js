var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var model={
    title:"Azure Yugam",
    message:process.env.MESSAGE || "This is development"
  }
  res.render("index",model);
});

module.exports = router;
