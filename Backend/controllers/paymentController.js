import PaymentService from '../services/paymentService.js';
import EmailService from '../services/emailService.js';
import BookingModel from '../models/bookingModel.js';
import OrderModel from '../models/orderModel.js'; // Assuming you have an Order model

export const processPayment = async (req, res) => {
    try {
        const { type, id, paymentDetails } = req.body; // `type` determines if it's a booking or an order

        let record;
        if (type === 'booking') {
            // Handle service booking payment
            record = await BookingModel.findById(id);
            if (!record) {
                return res.status(404).json({ message: 'Booking not found' });
            }
        } else if (type === 'order') {
            // Handle product order payment
            record = await OrderModel.findById(id);
            if (!record) {
                return res.status(404).json({ message: 'Order not found' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid payment type' });
        }

        // Process payment
        const paymentResult = await PaymentService.processPayment(paymentDetails);
        if (!paymentResult.success) {
            return res.status(500).json({ message: 'Payment processing failed' });
        }

        // Update status and save record
        if (type === 'booking') {
            record.status = 'Đã xác nhận'; // Update booking status to confirmed
        } else if (type === 'order') {
            record.status = 'Đã thanh toán'; // Update order status to paid
        }
        await record.save();

        // Send confirmation emails
        if (type === 'booking') {
            await EmailService.sendBookingConfirmation(record);
            await EmailService.sendPaymentInvoice(record, paymentResult.invoice);
        } else if (type === 'order') {
            await EmailService.sendOrderConfirmation(record);
            await EmailService.sendPaymentInvoice(record, paymentResult.invoice);
        }

        res.status(200).json({ message: 'Payment processed successfully', record });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};