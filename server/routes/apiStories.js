const express = require('express');
const router = express.Router();
const apistories = require('../controllers/apiStoriesController');

/* GET home page. */
router.get('/', apistories.getAllStories);
router.get('/:slug', apistories.getStoryBySlug);
router.post('/', apistories.postNewStory);
router.put('/:id', apistories.updateStory);
router.delete('/:id', apistories.deleteStory);

module.exports = router;
