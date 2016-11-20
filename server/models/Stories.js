'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let storiesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorAva: {
    type: String,
  },
  slug: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

let stories = mongoose.model('stories', storiesSchema)

module.exports = stories;
