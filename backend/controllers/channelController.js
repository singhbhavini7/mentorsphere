const Channel = require('../models/Channel');

// Get all channels
const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate('createdBy', 'name email role');
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new channel
const createChannel = async (req, res) => {
  try {
    const { name, description, category, isPrivate } = req.body;

    const channelExists = await Channel.findOne({ name });
    if (channelExists) {
      return res.status(400).json({ message: 'Channel name already exists' });
    }

    const channel = await Channel.create({
      name,
      description: description || '',
      category: category || 'General',
      isPrivate: isPrivate || false,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChannels,
  createChannel,
};