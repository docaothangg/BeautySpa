import PaymentGateway from '../utils/paymentGateway.js';

export const processPayment = async (paymentDetails) => {
    const { method, amount, currency } = paymentDetails;

    let paymentResult;

    switch (method) {
        case 'PayPal':
            paymentResult = await PaymentGateway.processPayPalPayment(amount, currency);
            break;
        case 'MMO':
            paymentResult = await PaymentGateway.processMMOPayment(amount, currency);
            break;

        default:
            throw new Error('Unsupported payment method');
    }

    return paymentResult;
};