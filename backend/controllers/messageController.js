const Message = require('../models/Message');

// Send Message
const sendMessage = async (req, res) => {
  try {
    const { channelId, content } = req.body;

    if (!channelId || !content) {
      return res.status(400).json({ message: 'Channel ID and content are required' });
    }

    let message = await Message.create({
      channelId,
      sender: req.user._id,
      content,
    });

    message = await message.populate('sender', 'name email role');

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Messages for a specific channel
const getMessages = async (req, res) => {
  try {
    const { channelId } = req.params;

    const messages = await Message.find({ channelId })
      .populate('sender', 'name email role')
      .sort({ createdAt: 1 }); // Oldest first

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};