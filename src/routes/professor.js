const express = require('express');
const { setAvailability, getAvailability } = require('../controllers/professorController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/availability', authMiddleware, setAvailability);
router.get('/availability/:professorId', getAvailability);

module.exports = router;