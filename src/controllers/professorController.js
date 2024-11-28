const Availability = require('../models/Availability');

exports.setAvailability = async (req, res) => {
    try {
        const { slots } = req.body;
        const professorId = req.user.id; // Retrieved from JWT
        const availability = await Availability.create({ professorId, slots });
        res.status(201).json(availability);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAvailability = async (req, res) => {
    try {
        const { professorId } = req.params;
        const availability = await Availability.findOne({ professorId });
        res.status(200).json(availability);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};