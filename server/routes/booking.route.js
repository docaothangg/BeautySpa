import express from "express";
import { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } from "../controllers/booking.Controller.js";
const bookingRouter = express.Router();

bookingRouter.get("/", getAllBookings);
bookingRouter.get("/:id", getBookingById);
bookingRouter.post("/add", createBooking);
bookingRouter.put("/update/:id", updateBooking);
bookingRouter.delete("/delete/:id", deleteBooking);

export default bookingRouter;
