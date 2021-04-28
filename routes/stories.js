const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Story = require("../models/Story");

// @desc Show public stories
// @route GET /stories

router.get("/", ensureAuth, (req, res) => {
  res.render("/stories");
});

// @desc Show the add page
// @route GET /stories/add

router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

// @desc Process add form
// @route POST /stories

router.post("/", ensureAuth, async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
    next();
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

module.exports = router;
