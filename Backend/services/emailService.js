import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to your email service provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

export const sendBookingConfirmation = async (bookingDetails) => {
    const { email, bookingDate, bookingTime, serviceName, branchName, employeeName, price } = bookingDetails;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Booking Confirmation',
        text: `Thank you for your booking!\n\nDetails:\n- Service: ${serviceName}\n- Branch: ${branchName}\n- Employee: ${employeeName}\n- Date: ${bookingDate}\n- Time: ${bookingTime}\n- Price: $${price}\n\nWe look forward to seeing you!`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
        throw new Error('Email sending failed');
    }
};

export const sendPaymentInvoice = async (paymentDetails) => {
    const { email, amount, transactionId } = paymentDetails;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Payment Invoice',
        text: `Thank you for your payment!\n\nInvoice Details:\n- Amount: $${amount}\n- Transaction ID: ${transactionId}\n\nIf you have any questions, feel free to reach out.`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending payment invoice email:', error);
        throw new Error('Email sending failed');
    }
};