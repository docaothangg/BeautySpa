// routes/booking.js
import express from "express";
import authMiddleware from "../middleware/auth.js";
import { createBooking, updateBookingStatus, getBookings } from '../controllers/bookingController.js';

const bookingRouter = express.Router();
bookingRouter.post('/add', createBooking);
bookingRouter.patch('/:id/status', authMiddleware, updateBookingStatus);
bookingRouter.get('/my-bookings', authMiddleware, getBookings);


export default bookingRouter;