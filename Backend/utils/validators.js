import { body, validationResult } from 'express-validator';

export const validateBooking = [
    body('userId').isMongoId().withMessage('Invalid user ID'),
    body('serviceId').isMongoId().withMessage('Invalid service ID'),
    body('branchId').isMongoId().withMessage('Invalid branch ID'),
    body('employeeId').isMongoId().withMessage('Invalid employee ID'),
    body('bookingDate').isISO8601().withMessage('Invalid booking date'),
    body('bookingTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid booking time format'),
    body('phone').matches(/^[0-9]{10,11}$/).withMessage('Invalid phone number'),
    body('email').isEmail().withMessage('Invalid email format'),
];

export const validatePayment = [
    body('paymentDetails.method').isIn(['PayPal', 'MMO', 'Visa']).withMessage('Invalid payment method'),
    body('paymentDetails.amount').isNumeric().withMessage('Amount must be a number'),
    body('paymentDetails.currency').isString().withMessage('Currency must be a string'),
];

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};