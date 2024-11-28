const express = require('express');
const { bookAppointment } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book', authMiddleware, bookAppointment);
router.put('/cancel/:id', authMiddleware, bookAppointment);

module.exports = router;