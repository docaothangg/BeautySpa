import BookingModel from '../models/bookingModel.js';
import UserModel from '../models/userModel.js'; // Assuming you have a User model
import ServiceModel from '../models/serviceModel.js';
import BranchModel from '../models/branchModel.js';
import EmployeeModel from '../models/employeeModel.js';
import PaymentGateway from '../utils/paymentGateway.js';

export const createBooking = async (req, res) => {
    try {
        const { userId, serviceId, branchId, employeeId, bookingDate, bookingTime, phone, email } = req.body;

        // Validate user, service, branch, and employee
        const user = await UserModel.findById(userId);
        const service = await ServiceModel.findById(serviceId);
        const branch = await BranchModel.findById(branchId);
        const employee = await EmployeeModel.findById(employeeId);

        if (!user || !service || !branch || !employee) {
            return res.status(400).json({ message: 'Invalid user, service, branch, or employee ID' });
        }

        const newBooking = new BookingModel({
            userId,
            serviceId,
            branchId,
            employeeId,
            bookingDate,
            bookingTime,
            phone,
            email,
        });

        await newBooking.save();

        // Process payment (assuming payment details are included in the request)
        const paymentResult = await PaymentGateway.processPayment(req.body.paymentDetails);
        if (!paymentResult.success) {
            return res.status(500).json({ message: 'Payment processing failed' });
        }

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await BookingModel.find().populate('userId serviceId branchId employeeId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId, status } = req.body;
        const updatedBooking = await BookingModel.findByIdAndUpdate(bookingId, { status }, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};