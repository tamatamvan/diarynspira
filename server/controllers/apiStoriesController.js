'use strict'
const Stories = require('../models/Stories');
const slug = require('slug');

let getAllStories = (req, res, next) => {
  Stories.find({}, (err, storie) => {
    if (err) {
      console.log(err);
    } else {
      res.send(storie);
    }
  })
}

let getStoryBySlug = (req, res, next) => {
  Stories.findOne({
    slug: req.params.slug
  }, (err, story) => {
    res.send(story)
  })
}

let postNewStory = (req, res, next) => {
  Stories.create({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    authorAva: req.body.authorAva,
    slug: slug(req.body.title).toLowerCase()
  }, (err, story) => {
    if (err) {
      console.log(err);
    } else {
      res.send(story)
    }
  })
}

let updateStory = (req, res, next) => {
  Stories.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  }, (err, story) => {
    if (err) {
      console.log(err);
    } else {
      res.send(story)
    }
  })
}

let deleteStory = (req, res, next) => {
  Stories.remove({
    _id: req.params.id
  }, (err, deleted) => {
    if (err) {
      console.log(err);
    } else {
      res.json(deleted);
    }
  })
}

module.exports = {
  getAllStories,
  getStoryBySlug,
  postNewStory,
  updateStory,
  deleteStory
}
