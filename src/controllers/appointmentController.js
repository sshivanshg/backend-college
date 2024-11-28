const Availability = require('../models/Availability');
const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
    try {
        const { professorId, time } = req.body;
        const studentId = req.user.id;

        const availability = await Availability.findOne({ professorId, 'slots.time': time });
        if (!availability) return res.status(404).json({ message: 'Slot not available' });


        const appointment = await Appointment.create({ studentId, professorId, time });
        await Availability.updateOne(
            { professorId, 'slots.time': time },
            { $set: { 'slots.$.isBooked': true } }
        );

        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




// const Appointment = require('../models/Appointment'); 
// const Availability = require('../models/Availability');

// exports.updateAppointment = async (req, res) => {
//     try {
//         const { appointmentId, newTime } = req.body;
//         const studentId = req.user.id;

//         // Find the appointment by ID
//         const appointment = await Appointment.findOne({ _id: appointmentId, studentId });
//         if (!appointment) {
//             return res.status(404).json({ message: 'Appointment not found' });
//         }

//         // Check if the new time slot is available
//         const availability = await Availability.findOne({ 
//             professorId: appointment.professorId, 
//             'slots.time': newTime, 
//             'slots.isBooked': false 
//         });
//         if (!availability) {
//             return res.status(404).json({ message: 'New time slot not available' });
//         }

//         // Free up the current slot
//         await Availability.updateOne(
//             { professorId: appointment.professorId, 'slots.time': appointment.time },
//             { $set: { 'slots.$.isBooked': false } }
//         );

//         // Mark the new time slot as booked
//         await Availability.updateOne(
//             { professorId: appointment.professorId, 'slots.time': newTime },
//             { $set: { 'slots.$.isBooked': true } }
//         );

//         // Update the appointment time
//         appointment.time = newTime;
//         await appointment.save();

//         res.status(200).json({ message: 'Appointment updated successfully', appointment });
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: error.message });
//     }
// };


// exports.cancelAppointmentByProfessor = async (req, res) => {
//     try {
//         const { id } = req.params; // Appointment ID from the request parameter
//         const professorId = req.user.id; // Professor ID from the authenticated user (via middleware)

//         // Find the appointment by ID
//         const appointment = await Appointment.findById(id);
//         if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

//         // Check if the professor has authority over this appointment
//         if (appointment.professorId.toString() !== professorId) {
//             return res.status(403).json({ message: 'Unauthorized: You are not the professor of this appointment' });
//         }

//         // Update the status of the appointment to "canceled"

//         appointment.status = 'canceled';
//         await appointment.save();

//         // Update the Availability slot to set `isBooked` to false
//         await Availability.updateOne(
//             { professorId, 'slots.time': appointment.time },
//             { $set: { 'slots.$.isBooked': false } }
//         );

//         res.status(200).json({ message: 'Appointment successfully canceled', appointment });
//     } catch (error) {
//         res.status(500).json({ message: 'Error canceling appointment', error });
//     }
// };