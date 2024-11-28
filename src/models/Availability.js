const mongoose = require('mongoose');
const availabilitySchema = new mongoose.Schema({
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    slots: [{ time: { type: Date }, isBooked: { type: Boolean, default: false } }],
}, { timestamps: true });

module.exports = mongoose.model('Availability', availabilitySchema);
// const mongoose = require('mongoose');

// const availabilitySchema = new mongoose.Schema({
//     professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     slots: [{
//         time: { type: Date, required: true },
//         isBooked: { type: Boolean, default: false },
//     }],
// });

// module.exports = mongoose.model('Availability', availabilitySchema);