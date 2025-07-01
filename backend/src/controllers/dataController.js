const { Reading } = require('../models/Reading');

exports.addReading = async (req, res) => {
  const { glucoseLevel, date, time } = req.body;
  const userId = req.user.id;

  try {
    const newReading = await Reading.create({
      userId,
      glucoseLevel,
      date,
      time
    });
    res.json(newReading);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getUserReadings = async (req, res) => {
  const userId = req.user.id;
  try {
    const readings = await Reading.findAll({ where: { userId }, order: [['date', 'DESC'], ['time', 'DESC']] });
    res.json(readings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Placeholder for insights logic
exports.getInsights = async (req, res) => {
  const userId = req.user.id;
  try {
    // In a real app, this would call insightsService.generateInsights(userId)
    const insights = {
      message: "Keep up the great work! Consider a balanced meal for your next snack.",
      recommendation: "High fiber snack."
    };
    res.json(insights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
