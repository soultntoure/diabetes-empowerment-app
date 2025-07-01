const express = require('express');
const { addReading, getUserReadings, getInsights } = require('../controllers/dataController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All private routes
router.use(authMiddleware);

router.post('/readings', addReading);
router.get('/readings', getUserReadings);
router.get('/insights', getInsights);

module.exports = router;
