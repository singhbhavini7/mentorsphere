const express = require('express');
const router = express.Router();
const { getChannels, createChannel } = require('../controllers/channelController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getChannels)
  .post(protect, createChannel);

module.exports = router;