const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

router.post("/", async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.status(201).json(newReview);
});

module.exports = router;
