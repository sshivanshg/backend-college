const express = require('express');
const authRoutes = require('./auth');
const professorRoutes = require('./professor');
const appointmentRoutes = require('./appointments');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/professor', professorRoutes);
router.use('/appointments', appointmentRoutes);

module.exports = router;